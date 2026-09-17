# Journey 05 — Deployment

## Deployment State Before Fix

Vercel deployments were failing during the build because Prisma Client could not be resolved.

## Fix

The package build process was updated so Prisma Client is generated before Next.js builds.

Commit:

```text
964051c Ensure Prisma client generation during build
```

## Result

The next Vercel production deployment became:

```text
Ready
```

## Domain Migration

The custom domain had previously been associated with the older Vercel project.

The domain was removed from the old project and assigned to:

```text
geoweb-solutions-v2
```

Both:
- `geowebsolutions.co.ke`
- `www.geowebsolutions.co.ke`

were added successfully.

## DNS

Cloudflare remained authoritative for DNS.

Vercel's nameserver mismatch warning was therefore expected and did not indicate that the application was inaccessible.

## Production Verification

The custom domain returned `200 OK`.

The contact page returned `200 OK`.

The inquiry API returned:
- `400` for invalid input
- `201` for a valid production inquiry

## Lesson

Deployment is not complete when Vercel says Ready. The real domain and critical workflows should also be tested.
