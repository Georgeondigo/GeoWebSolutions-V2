# API Architecture

## Public API

### `POST /api/inquiries`

Creates a new inquiry.

Responsibilities:
1. Parse request body.
2. Validate inquiry data.
3. Reject invalid data.
4. Persist valid inquiry.
5. Execute configured notification workflow.
6. Return a controlled response.

## Admin APIs

### `GET /api/admin/inquiries`

Returns inquiries for authenticated administrators.

### `GET /api/admin/inquiries/[id]`

Returns a specific inquiry.

### `PATCH /api/admin/inquiries/[id]`

Updates an inquiry.

Admin endpoints use NextAuth server sessions.

## Authentication

Protected routes use:

```text
getServerSession(authOptions)
```
