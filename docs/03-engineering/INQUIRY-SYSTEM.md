# Inquiry System

## Purpose

The inquiry system converts contact-form submissions into persisted project inquiries that can be reviewed by GeoWeb administrators.

## Flow

```text
Contact Form
    ↓
POST /api/inquiries
    ↓
Validation (Zod) and honeypot check
    ↓
Database create (notificationStatus = PENDING)
    ↓
Notification limit check
    ├─ within limit → send email via Resend → SENT or FAILED
    └─ over limit   → no email → suppressed (FAILED + suppression reason)
    ↓
201 success response
```

The inquiry is saved before any notification work starts. Every outcome after
the database create returns `201`, including failed and suppressed
notifications. Only a failure of the create itself returns `500`.

## Notification Workflow

Implementation: `src/app/api/inquiries/route.ts`, `src/lib/email/index.ts`.

### Notification statuses

The database enum has three values: `PENDING`, `SENT` and `FAILED`.
`SUPPRESSED` is not a database value. The admin UI shows it for `FAILED` rows
whose `notificationError` is the suppression reason
(`NOTIFICATION_SUPPRESSED_ERROR` in `src/lib/email/index.ts`).

| Admin UI shows | Stored as | Meaning |
|---|---|---|
| `PENDING` | `PENDING` | Saved; notification not finished. A row that stays `PENDING` means a status update failed (see Failure handling). |
| `SENT` | `SENT`, `notificationSentAt` set | Resend accepted the request. This does not confirm mailbox delivery. |
| `FAILED` (red) | `FAILED`, `notificationError` = `Notification delivery failed.` | The notification attempt failed: Resend returned an error, configuration was missing, or another error occurred (see Failure handling). |
| `SUPPRESSED` (amber) | `FAILED`, `notificationError` = suppression reason | The hourly limit was reached, so no email was sent. The inquiry is saved normally and must be followed up from the dashboard. |
| `—` / `Not tracked` | `null` | Older inquiries created before notification tracking existed. |

### Hourly notification limit

`NOTIFICATION_HOURLY_CAP = 20` in `src/app/api/inquiries/route.ts`. This value
is **provisional**: the Resend plan quota and real peak inquiry volume have not
been verified.

After saving the inquiry, the route counts inquiries created in the last 60
minutes (rolling window, by `createdAt`) that are **not** suppressed. If the
count, which includes the new inquiry, exceeds 20, the inquiry is marked
suppressed and Resend is not called. Otherwise the email is sent.

Counted towards the limit:

- `SENT` inquiries.
- `FAILED` inquiries with a genuine failure, because failed Resend calls can
  still use quota.
- `PENDING` inquiries, which are in flight or stuck after a failed update.

Not counted: suppressed inquiries. Suppressed inquiries never use a slot.

The count must keep rows with a `null` `notificationError`. A plain "not equal"
filter would silently drop them, because SQL comparisons with `NULL` are never
true.

The limit is a global safeguard for the inbox and the Resend quota. It is not
a substitute for per-IP rate limiting; that belongs in the Vercel Firewall.

### Concurrency behaviour

Each request saves its row **before** counting, and each count is a separate
statement that sees every row committed before it started. The request that
counts last before sending therefore sees every other sender's row. As a
result, concurrent requests on any number of instances cannot cause more than
20 notification attempts among inquiries created in a rolling 60-minute
window. No lock is used.

Limits of this guarantee:

- **Early suppression under bursts.** Rows that have not yet made their own
  decision are also counted. During a simultaneous burst, requests can be
  suppressed while slots remain. In local tests, 40 concurrent requests used 3
  of 4 free slots, and 5 concurrent requests contending for the last slot used
  0. A later request then used it. This errs towards fewer emails, never more.
- **Window edges depend on clocks.** `createdAt` is set by the instance that
  saved the row, and the window start by the instance that counts. Clock
  differences between instances blur the edge, normally by milliseconds.
- **Creation time, not send time.** The limit applies to when inquiries were
  created, not to when Resend calls happened.
- **Single database assumed.** The guarantee assumes the count reads from the
  same primary database the insert wrote to. This has not been verified for
  production.

An exact limit, with no early suppression, would need a transaction-scoped
reservation, for example a PostgreSQL advisory lock. This is not implemented.

### Failure handling

| Failure | Result | Inquiry saved |
|---|---|---|
| Resend returns an error or configuration is missing | `FAILED`, `Notification delivery failed.` | Yes, `201` |
| Notification count query fails | Caught by the same handler: `FAILED`, `Notification delivery failed.`, and **no** Resend call | Yes, `201` |
| Update to suppressed fails | Same handler marks it `FAILED` (`delivery failed`). If that also fails, it stays `PENDING`. No Resend call. | Yes, `201` |
| Email sent but the `SENT` update fails | Marked `FAILED` although the email was sent (existing behaviour) | Yes, `201` |
| `FAILED` update also fails | Error logged; row stays `PENDING` | Yes, `201` |

Rows mislabelled in these ways still count towards the limit, so the error
leans towards sending fewer emails. These database-failure paths come from
reading the code. **They have not been tested**, because testing them would
require breaking the database.

### Local mocked-provider testing

The Resend SDK reads `RESEND_BASE_URL`. Pointing it at a local mock exercises
the full route without contacting Resend or sending email.

1. Use a local database only, and confirm `DATABASE_URL` resolves to
   `localhost`.
2. Run a small HTTP server on `127.0.0.1` that answers `POST /emails` with
   `200 {"id": "..."}` for success, or a non-2xx JSON error such as
   `422 {"name": "validation_error", "statusCode": 422, "message": "..."}` to
   simulate a failure. Log each call so tests can check which inquiries
   reached the provider.
3. Start the dev server with process-level overrides. Do not edit `.env`
   files; process variables take precedence over `.env` in Next.js:

   ```bash
   RESEND_API_KEY=re_mock_not_a_real_key \
   RESEND_BASE_URL=http://127.0.0.1:4010 \
   INQUIRY_NOTIFICATION_EMAIL=notify@example.com \
   EMAIL_FROM=mock@example.com \
   NEXT_TELEMETRY_DISABLED=1 \
   pnpm dev
   ```

4. Submit synthetic inquiries (`test@example.com`, a recognisable name
   prefix plus a run ID) to `http://localhost:3000/api/inquiries`, then check
   rows by the returned IDs.

Test isolation notes:

- The limit window is shared across the whole table. Measure the baseline
  first using the route's filter, or wait 60 minutes after previous test
  submissions.
- `createdAt` and `notificationSentAt` are stored as UTC values without a
  timezone. When querying with `pg` or `now()` on a machine or database that
  is not set to UTC, compare in UTC (for example `now() AT TIME ZONE 'UTC'`,
  or read values with `to_char`). Otherwise timestamps shift by the local
  offset.
- Rows inserted directly with SQL defaults receive the database's local time,
  not UTC.

Verified locally:

- A successful send gives `SENT` with a correct `notificationSentAt`.
- A provider error gives `FAILED` (`Notification delivery failed.`).
- Suppressed inquiries never reach the provider and remain saved.
- No more than 20 attempts occur under concurrent and final-slot contention.
- The admin list and detail pages render `SUPPRESSED`, `FAILED` and `SENT`
  correctly. This was checked through server-rendered HTML with a local test
  admin, not in a real browser.

## Validation

Invalid input returns `400 Bad Request`.

A production test with an invalid email produced:

```json
{
  "success": false,
  "message": "Invalid inquiry data."
}
```

## Production Verification

A valid production test returned:

```text
HTTP/1.1 201 Created
```

with:

```text
success: true
```

and an inquiry ID.

This confirms the deployed endpoint can accept and persist a valid inquiry.
