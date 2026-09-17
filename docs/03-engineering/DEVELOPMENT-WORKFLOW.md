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
Push develop
  ↓
Vercel deployment
  ↓
Production verification
  ↓
Document outcome
```

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
