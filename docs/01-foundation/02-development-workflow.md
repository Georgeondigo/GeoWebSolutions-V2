# GeoWeb Solutions — Development Workflow

## Purpose
Define a repeatable workflow that keeps GeoWeb stable while making development a deliberate learning process.

## Development Cycle

```text
Understand → Plan → Implement → Test → Review → Commit → Push → Deploy → Verify → Document
```

## Branches

Primary branches:

```text
main
develop
```

For larger changes:

```text
feature/<description>
fix/<description>
refactor/<description>
docs/<description>
```

Example:

```bash
git switch develop
git pull origin develop
git switch -c feature/inquiry-dashboard
```

## Before Coding

1. Understand the problem.
2. Identify affected files.
3. Identify integrations and dependencies.
4. Define acceptance criteria.
5. Decide how the result will be verified.

## Verification

At minimum:

```bash
pnpm lint
pnpm build
git diff --check
git status
```

For API/database work, perform a functional test.

## Commits

Use specific messages such as:

```text
Fix admin Link import
Ensure Prisma client generation during build
Improve inquiry email error reporting
Document project baseline
```

Avoid vague messages such as `updates`, `changes`, or `fix`.

## Definition of Done

A change is complete when implementation, checks, functional verification, Git synchronization, deployment verification where applicable, and required documentation are complete.

## Learning Principle

GeoWeb is also an engineering learning environment. For important changes, understand the reason, alternatives, trade-offs, failures, and production implications—not just the final code.
