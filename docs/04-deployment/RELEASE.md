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

## The release gate

GitHub Actions is not available: on 16 November 2026 GitHub refused to start a
job because the account is locked for a billing issue. A workflow was written
and removed again (see commit history of `.github/workflows/ci.yml`); restore it
if the lock is ever cleared.

The gate is therefore Vercel's own build, which costs nothing:

- Every pull request gets a Preview build that runs
  `prisma generate && next build`, including the TypeScript check. Its result
  is reported on the pull request as the `Vercel` status.
- A failed build on `develop` is not promoted; the previous Production
  deployment keeps serving.
- **Lint is not part of the Vercel build.** `pnpm lint` must be run locally
  before pushing. Nothing enforces it.
- Preview deployments require Vercel sign-in, so they are not public.

A direct push to `develop` skips the Preview check and goes straight to a
Production build. See "Branch protection" below.

## Releasing a change

1. Branch from `develop`: `git switch -c <type>/<short-name> develop`.
2. Make the change. Run `pnpm lint` and `pnpm build` locally.
3. Push the branch and open a pull request into `develop`.
   - This creates a Vercel Preview that uses the production database. Do not
     submit test inquiries or change inquiry statuses on a Preview unless the
     resulting records are acceptable in production data.
4. Wait for the `Vercel` status to pass. Review the diff.
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

To make the Preview build an actual gate, protect `develop` in GitHub
repository settings:

- Require a pull request before merging.
- Require the `Vercel` status check to pass.
- Do not allow bypassing for administrators.

The repository is public, so this is normally available on the free plan;
whether the billing lock also blocks this setting has not been tested. With a
single maintainer, leave "required approvals" at 0; the value is the required
check, not the review. Applying this is a repository settings change and needs
explicit approval.
