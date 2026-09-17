# Database

## Stack

- PostgreSQL
- Prisma 7.10.0
- `@prisma/adapter-pg`

## Configuration

The database connection is read from:

```text
DATABASE_URL
```

`src/lib/prisma.ts` fails early when the database URL is not configured.

## Migrations

Database migrations are stored under:

```text
prisma/migrations/
```

## Generated Client

The generated Prisma client is intentionally not tracked by Git.

It is generated during installation/build.

This became a critical deployment issue when Vercel attempted to build without the generated client present.
