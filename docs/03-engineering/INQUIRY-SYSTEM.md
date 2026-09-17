# Inquiry System

## Purpose

The inquiry system converts contact-form submissions into persisted project inquiries that can be reviewed by GeoWeb administrators.

## Flow

```text
Contact Form
    ↓
POST /api/inquiries
    ↓
Validation
    ↓
Database create
    ↓
Notification workflow
    ↓
Success response
```

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
