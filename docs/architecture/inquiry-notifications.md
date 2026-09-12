# GeoWeb Inquiry Notifications

## 1. Purpose

The inquiry notification system informs GeoWeb when a new inquiry has been
successfully submitted.

Notification delivery is a secondary side effect of inquiry creation.

The Inquiry remains the source of truth for the submitted business inquiry.

---

## 2. Separation of Concerns

Inquiry lifecycle and notification lifecycle represent different concepts.

### Inquiry lifecycle

The inquiry lifecycle describes the business opportunity:

NEW
→ REVIEWED
→ CONTACTED
→ QUALIFIED
→ PROPOSAL
→ WON

Alternative outcome:

QUALIFIED
→ LOST

Administrative:

ANY STATE
→ ARCHIVED

### Notification lifecycle

The notification lifecycle describes the delivery of the internal
notification:

PENDING
→ SENT

or:

PENDING
→ FAILED

A notification failure does not mean that the inquiry itself has failed.

---

## 3. Notification Status

### PENDING

The inquiry has been created but notification delivery has not yet reached a
final state.

### SENT

The notification was successfully accepted by the email provider.

### FAILED

Notification delivery was attempted but was not successfully completed.

---

## 4. Notification Data

The initial implementation will track notification state directly on the
Inquiry entity.

Fields:

| Field | Purpose |
|---|---|
| notificationStatus | Current notification delivery state |
| notificationSentAt | Time the notification was successfully sent |
| notificationError | Sanitized description of the most recent notification failure |

Historical inquiries created before notification tracking was introduced may
have a null `notificationStatus`.

---

## 5. Creation Flow

A new inquiry follows this sequence:

Contact Form
↓
API validation
↓
Honeypot check
↓
Create Inquiry with notification status `PENDING`
↓
Attempt notification
↓
Success → `SENT`
↓
Failure → `FAILED`

The inquiry must remain persisted even when notification delivery fails.

---

## 6. Failure Handling

Database persistence is the primary operation.

Notification delivery is a secondary operation.

If database persistence succeeds but notification delivery fails:

- The inquiry remains stored.
- The inquiry's business status remains unchanged.
- The notification status becomes `FAILED`.
- The latest notification error may be recorded.
- The API should still return successful inquiry creation because the inquiry
  itself was successfully persisted.

---

## 7. Future Evolution

The initial implementation intentionally keeps notification state on the
Inquiry entity.

If GeoWeb later supports multiple notification types, notification history,
automated retries or asynchronous processing, notification records may be
promoted into a separate `InquiryNotification` entity.

Possible future direction:

Inquiry
↓
InquiryNotification[]

This should only be introduced when actual system requirements justify the
additional complexity.

---

## 8. Engineering Principle

Business state and technical delivery state should not be conflated.

An inquiry can be a valid and active business opportunity even when an
internal notification fails.