# Deployment

## Platform

Vercel.

## Project

```text
geoweb-solutions-v2
```

## Production Branch

`develop`. Every push to it is deployed to Production by Vercel.

The release procedure is in [RELEASE.md](RELEASE.md).

## Deployment Requirement

The project must successfully:
1. install dependencies
2. generate Prisma Client
3. compile Next.js
4. complete TypeScript checks
5. generate pages
6. deploy successfully

## Current Status

The latest documented production deployment was Ready after the Prisma generation fix.
