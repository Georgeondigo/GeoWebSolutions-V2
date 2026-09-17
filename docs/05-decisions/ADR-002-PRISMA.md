# ADR-002 — Prisma

## Status

Accepted

## Decision

Use Prisma 7.10.0 as the database client/data-access layer.

## Context

The application requires structured database access for inquiries and administrative workflows.

## Consequence

Prisma Client must be generated before the application build.

The generated client is ignored by Git and therefore must be recreated in deployment environments.
