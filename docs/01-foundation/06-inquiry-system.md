# GeoWeb Solutions — Inquiry System

## Purpose

The inquiry system captures potential client leads from the GeoWeb website.

## Flow

```text
Visitor
 ↓
Inquiry form
 ↓
POST /api/inquiries
 ↓
Validation
 ↓
Prisma/PostgreSQL
 ↓
Email notification
 ↓
Admin management
```

## Public API

```text
POST /api/inquiries
```

Implementation:

```text
src/app/api/inquiries/route.ts
```

## Validation

Invalid requests return:

```text
HTTP 400 Bad Request
```

The production API was tested with invalid data and correctly rejected it.

## Persistence

Valid inquiries use:

```text
prisma.inquiry.create()
```

Inquiry updates use Prisma update operations.

## Email

Email integration is under:

```text
src/lib/email/
```

Variables:

```text
RESEND_API_KEY
INQUIRY_NOTIFICATION_EMAIL
EMAIL_FROM
```

## Admin

Inquiries are managed through:

```text
/admin/inquiries
/admin/inquiries/[id]
```

## Production Verification

A valid production test returned:

```text
HTTP/1.1 201 Created
```

with a successful response and inquiry ID.

This verified the production inquiry endpoint's successful processing path.
