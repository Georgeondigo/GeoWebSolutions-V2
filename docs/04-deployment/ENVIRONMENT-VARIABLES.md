# Environment Variables

## Required Server Configuration

```text
DATABASE_URL
RESEND_API_KEY
INQUIRY_NOTIFICATION_EMAIL
EMAIL_FROM
GEOWEB_ADMIN_EMAIL
GEOWEB_ADMIN_PASSWORD_HASH_B64
NEXTAUTH_SECRET
NEXTAUTH_URL
```

## Rules

- Never commit `.env` or `.env.local`.
- Never place secrets in client components.
- Configure production values in Vercel.
- Keep local and production values appropriately separated.
- Verify required variables after deployment when a feature depends on external services.

## Note

The names above are derived from the project's source references. Their actual secret values are intentionally not documented here.
