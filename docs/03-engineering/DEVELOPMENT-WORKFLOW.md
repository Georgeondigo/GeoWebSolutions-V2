# Development Workflow

## Standard Flow

```text
Plan
  ↓
Implement
  ↓
Run local validation
  ↓
Review diff
  ↓
Commit
  ↓
Pull request into develop (CI must pass)
  ↓
Merge
  ↓
Vercel production deployment
  ↓
Production verification
  ↓
Document outcome
```

The step-by-step release procedure is in
[../04-deployment/RELEASE.md](../04-deployment/RELEASE.md).

## Useful Commands

```bash
git status
git diff
pnpm lint
pnpm build
git diff --check
git log -2 --oneline --decorate
```

## Principle

A green local build is necessary but not sufficient. Production behavior must be verified after deployment for infrastructure-sensitive changes.
