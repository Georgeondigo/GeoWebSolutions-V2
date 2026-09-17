# Authentication

## Library

NextAuth `4.24.15`.

## Admin Credentials

The current authentication implementation reads administrator configuration from environment variables.

Known variables:
- `GEOWEB_ADMIN_EMAIL`
- `GEOWEB_ADMIN_PASSWORD_HASH_B64`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## Protected Resources

Admin inquiry routes use server-side session verification.

Authentication secrets must never be committed to Git.
