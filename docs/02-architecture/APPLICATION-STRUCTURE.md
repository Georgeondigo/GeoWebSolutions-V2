# Application Structure

The project follows the Next.js App Router structure.

```text
src/
├── app/
│   ├── admin/
│   ├── api/
│   ├── about/
│   ├── contact/
│   ├── insights/
│   ├── services/
│   └── work/
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── email/
└── generated/
    └── prisma/
```

The generated Prisma client lives under `src/generated/prisma` and is created by `prisma generate`.
