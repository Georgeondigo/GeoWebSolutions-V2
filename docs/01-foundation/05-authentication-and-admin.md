# GeoWeb Solutions — Authentication & Admin

## Authentication

GeoWeb uses:

```text
NextAuth 4.24.15
```

Configuration:

```text
src/lib/auth.ts
```

Auth route:

```text
src/app/api/auth/[...nextauth]/route.ts
```

## Admin Routes

```text
/admin
/admin/inquiries
/admin/inquiries/[id]
/admin/login
```

## Protected APIs

```text
GET /api/admin/inquiries
GET /api/admin/inquiries/[id]
PATCH /api/admin/inquiries/[id]
```

The admin inquiry APIs use server-side NextAuth session checks.

## Admin Environment Variables

```text
GEOWEB_ADMIN_EMAIL
GEOWEB_ADMIN_PASSWORD_HASH_B64
```

These are environment configuration and must remain secret.

## Security Principles

- Authenticate server-side.
- Authorize before protected operations.
- Validate incoming data.
- Never expose secrets to the client.
- Do not trust client-side role information.
- Return safe errors.

## Verification

Changes affecting authentication, authorization, sessions, credentials, or admin access require build checks and functional verification.
