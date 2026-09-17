# Journey 04 — Problems and Debugging

## Problem 1 — Vercel CLI

The `vercel` command was not installed globally.

### Resolution

Use:

```bash
npx vercel
```

This allowed the project and domain configuration to be inspected without a global installation.

## Problem 2 — Production Build Failure

Vercel reported:

```text
Module not found: Can't resolve '@/generated/prisma/client'
```

### Investigation

Local Prisma generation worked:

```bash
pnpm prisma generate
```

The generated file existed locally.

Git showed that:

```text
src/generated/prisma
```

was ignored.

Therefore the generated client was not present in the clean Vercel checkout.

### Resolution

The project already had a `postinstall` generation step, but the deployment behavior was made more explicit by ensuring the build itself runs Prisma generation.

The build then succeeded.

## Lesson

Generated build artifacts should not be assumed to exist merely because they exist on the developer's machine.

Deployment must be reproducible from a clean checkout.
