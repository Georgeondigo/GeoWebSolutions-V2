# Journey 03 — Implementation

## Application

The V2 application was implemented with Next.js and the App Router.

Major areas include:
- public pages
- work and insights content
- contact form
- inquiry API
- admin login
- admin inquiry management

## Data Layer

PostgreSQL and Prisma were introduced for inquiry persistence.

## Authentication

NextAuth was used for protected administration.

## Email

Resend was integrated into the inquiry notification workflow.

## Engineering Practice

The implementation was progressively checked through:
- Git history
- source searches
- local Prisma generation
- linting
- production builds
- HTTP tests
