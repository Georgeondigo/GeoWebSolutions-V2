# GeoWeb Solutions V2 — Case Study

## Project

GeoWeb Solutions V2 is the current public web platform for GeoWeb Solutions.

## Challenge

The project needed to move beyond a purely presentational website and provide a reliable inquiry workflow with administrative handling.

## Solution

The V2 platform combines:
- modern Next.js application architecture
- public content pages
- project work/case studies
- insights
- inquiry submission
- PostgreSQL persistence
- Prisma data access
- admin authentication
- protected inquiry management
- transactional email workflow
- Vercel deployment

## Engineering Lesson

A major production lesson came from the Prisma deployment failure.

The generated Prisma client existed locally but was ignored by Git. A clean deployment therefore failed to resolve the import.

The project was changed so Prisma Client is generated automatically during installation/build.

## Outcome

The production application became deployable and the inquiry system was verified through the real production domain.

## Further Case Study Work

This document should later be expanded with:
- screenshots
- final metrics
- business outcomes
- design evolution
- before/after comparisons
- client/business context where appropriate
