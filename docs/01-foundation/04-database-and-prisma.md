# GeoWeb Solutions — Database & Prisma

## Stack

```text
PostgreSQL
  ↓
Prisma 7.10.0
  ↓
@prisma/adapter-pg
  ↓
Next.js server-side application
```

## Configuration

Schema:

```text
prisma/schema.prisma
```

Prisma configuration:

```text
prisma7.config.ts
```

Database connection:

```text
DATABASE_URL
```

## Generated Client

Generated location:

```text
src/generated/prisma
```

This directory is intentionally ignored by Git:

```text
/src/generated/prisma
```

Generate manually:

```bash
pnpm exec prisma generate
```

## Migrations

Tracked migrations:

```text
20260911072211_create_inquiry
20260912201147_formalize_inquiry_status
20260912215154_add_inquiry_notification_status
```

## Application Usage

The application imports the generated client through:

```text
@/generated/prisma/client
```

and performs inquiry creation/update operations through Prisma.

## Production Lesson

Generated artifacts must be reproducible. The clean Vercel build exposed this requirement and led to explicit Prisma generation during build.
