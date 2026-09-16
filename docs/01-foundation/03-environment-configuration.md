# GeoWeb Solutions — Environment Configuration

## Runtime

Local development was verified with Node.js 26.8.1.

Vercel uses Node.js 24.x.

Package manager:

```json
"packageManager": "pnpm@12.3.4"
```

## Build Lifecycle

The project explicitly generates Prisma Client:

```json
"build": "prisma generate && next build",
"postinstall": "prisma generate"
```

## Environment Variables

The application references:

```text
DATABASE_URL
RESEND_API_KEY
INQUIRY_NOTIFICATION_EMAIL
EMAIL_FROM
GEOWEB_ADMIN_EMAIL
GEOWEB_ADMIN_PASSWORD_HASH_B64
```

These must never be committed as secrets.

## Local Configuration

Local configuration may use:

```text
.env
.env.local
```

## Reproducibility

A clean environment should be able to run:

```bash
pnpm install
pnpm lint
pnpm build
```

without relying on generated files already existing on a developer machine.

## Important Lesson

The Vercel build initially failed because the generated Prisma client was ignored by Git and was not available in the clean build environment. Prisma generation is therefore explicitly part of installation/build.
