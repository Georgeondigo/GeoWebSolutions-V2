# Release Procedure

This is the single release procedure for GeoWeb Solutions V2. Other documents
link here instead of restating it.

## Facts (verified 16 November 2026)

- **Production branch: `develop`.** It is the GitHub default branch, and every
  recorded Vercel Production deployment was built from a `develop` commit.
- `main` exists only as a stale local branch. It is not on GitHub and nothing
  deploys from it.
- Vercel deploys on push through its GitHub integration: a push to `develop`
  goes to Production, a push to any other branch creates a Preview.
- **Preview and Production share one database.** A Preview deployment reads and
  writes real data.
- The build (`prisma generate && next build`) never applies migrations.
- `develop` has no branch protection.

## What CI does and does not do

`.github/workflows/ci.yml` runs on every pull request and on pushes to
`develop`: frozen-lockfile install, `pnpm lint`, `pnpm build` (which includes
the TypeScript check). It uses a dummy `DATABASE_URL` and no secrets.

**CI does not stop Vercel.** Vercel starts its own build the moment a commit
lands on `develop`, in parallel with CI. A direct push that fails CI still
deploys if Vercel's own build succeeds. CI only gates Production when changes
reach `develop` through a pull request that must pass CI first; see
"Branch protection" below.

## Releasing a change

1. Branch from `develop`: `git switch -c <type>/<short-name> develop`.
2. Make the change. Run `pnpm lint` and `pnpm build` locally.
3. Push the branch and open a pull request into `develop`.
   - This creates a Vercel Preview that uses the production database. Do not
     submit test inquiries or change inquiry statuses on a Preview unless the
     resulting records are acceptable in production data.
4. Wait for the `Lint and build` check to pass. Review the diff.
5. If the change includes a migration, complete "Database migrations" below
   before merging.
6. Merge the pull request. Vercel deploys `develop` to Production.
7. Smoke-test production: homepage, `/contact` submission (validation error and
   one valid inquiry), admin login, inquiry list, one status change.
8. Add a `docs/06-changelog/CHANGELOG.md` entry: date, change, reason,
   verification.

## Rollback

In the Vercel dashboard, open the last known-good Production deployment and
choose **Promote to Production** (instant, no rebuild). Then revert the commit
on `develop` through a pull request so the branch matches what is live.

A rollback does not undo a database migration.

## Database migrations

No production migration procedure has been verified yet. Until one is, treat
every schema change as a manual, explicitly approved step:

- Migrations must be additive and backward compatible, because the old
  deployment keeps serving traffic until the new one is live and a rollback
  runs old code against the new schema.
- Apply the migration to the database before merging the code that needs it.
- Known issue: the Prisma config file is named `prisma7.config.ts`, not the
  default `prisma.config.ts`, and it imports `dotenv`, which is not a declared
  dependency. `prisma migrate deploy` therefore needs verifying before it is
  relied on. Tracked in the completion register.

## Branch protection (proposed, not applied)

To make CI an actual gate, protect `develop` in GitHub repository settings:

- Require a pull request before merging.
- Require the `Lint and build` status check to pass.
- Do not allow bypassing for administrators.

The repository is public, so this is available on the free plan. With a single
maintainer, leave "required approvals" at 0; the value is the required check,
not the review. Applying this is a repository settings change and needs explicit
approval.
