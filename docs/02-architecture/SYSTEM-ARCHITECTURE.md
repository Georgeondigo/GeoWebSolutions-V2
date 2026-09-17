# System Architecture

## Request Flow

```text
Browser
  |
  v
Vercel
  |
  v
Next.js
  |
  +--> Static/SSG page
  |
  +--> Server-rendered admin page
  |
  +--> API route
          |
          +--> Validation
          +--> Authentication where required
          +--> Prisma
          +--> Email service where required
```

## Production

The V2 project is deployed as:

`geoweb-solutions-v2`

Production custom domains:
- `geowebsolutions.co.ke`
- `www.geowebsolutions.co.ke`

DNS remains managed through Cloudflare while the application is hosted on Vercel.
