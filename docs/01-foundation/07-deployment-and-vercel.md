# GeoWeb Solutions — Deployment & Vercel

## Hosting

Production hosting:

```text
Vercel
```

Project:

```text
geoweb-solutions-v2
```

Framework:

```text
Next.js
```

Node.js:

```text
24.x
```

## Repository

```text
Georgeondigo/GeoWebSolutions-V2
```

Development branch:

```text
develop
```

## Deployment Flow

```text
Git → GitHub → Vercel → Build → Production
```

## Deployment Failure

A Vercel deployment initially failed with:

```text
Module not found: Can't resolve '@/generated/prisma/client'
```

The local environment had the generated client, while the clean Vercel environment did not.

## Resolution

The project now generates Prisma Client through:

```text
postinstall: prisma generate
build: prisma generate && next build
```

## Verification

After the fix:

```bash
pnpm lint
pnpm build
```

passed, and the subsequent Vercel production deployment was `Ready`.

## Operational Rule

Production verification is part of development. Local success alone is not enough.
