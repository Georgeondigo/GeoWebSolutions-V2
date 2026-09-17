# ADR-003 — PostgreSQL

## Status

Accepted

## Decision

Use PostgreSQL as the primary relational database.

## Context

The inquiry domain benefits from relational persistence, migrations, structured status fields, and predictable server-side queries.

## Consequence

Production requires a valid `DATABASE_URL` and a reachable PostgreSQL instance.
