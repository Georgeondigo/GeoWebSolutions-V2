# Error Handling

## Principles

- Validate input at the API boundary.
- Return appropriate HTTP status codes.
- Avoid exposing internal infrastructure details to visitors.
- Log useful server-side diagnostic information.
- Keep user-facing error messages controlled.

## Verified Examples

Invalid inquiry data:
- HTTP `400`
- controlled validation response

Successful inquiry:
- HTTP `201`
- controlled success response

Production deployment failure:
- Vercel build failed because the generated Prisma client was absent.

That failure was fixed by ensuring Prisma generation occurs during the build process.
