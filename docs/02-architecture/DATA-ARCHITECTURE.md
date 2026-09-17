# Data Architecture

## Database

The application uses PostgreSQL.

Prisma is used as the database access layer.

## Current Domain

The documented application includes an `Inquiry` model.

The repository contains migrations for:
- initial inquiry creation
- formalized inquiry status
- inquiry notification status

## Client Generation

The Prisma client is generated into:

```text
src/generated/prisma
```

This directory is ignored by Git and therefore must be generated in every environment that builds the application.

The project uses:

```json
"postinstall": "prisma generate"
```

and the build script also explicitly runs Prisma generation before `next build`.
