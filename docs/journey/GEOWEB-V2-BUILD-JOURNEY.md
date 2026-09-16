# GeoWeb Solutions V2 — Build Journey

**Document type:** Personal Engineering Journey / Build Journal  
**Project:** GeoWeb Solutions V2  
**Repository:** `Georgeondigo/GeoWebSolutions-V2`  
**Current branch:** `develop`  
**Journey status:** Living document  
**Current phase:** Foundation / Production Baseline completed

---

## 1. Why This Document Exists

This document records **how I built GeoWeb Solutions V2**, not just what the final system looks like.

The purpose is to preserve:

- what I was trying to achieve;
- the decisions I made;
- the technologies and architecture I used;
- problems I encountered;
- how I investigated and fixed them;
- what I learned;
- mistakes and rejected approaches;
- important production discoveries;
- and how the project evolved over time.

The goal is that I can return to this document months or years later and understand not only the code, but **my engineering growth while building it**.

This is intentionally different from the technical foundation documentation.

> **Foundation documentation explains the system.**  
> **The Journey explains how I became the person who built the system.**

---

# 2. The Beginning

GeoWeb Solutions is the primary project I am building and growing.

The V2 rebuild is part of a larger direction for GeoWeb: moving beyond simply making websites and developing a more deliberate system for delivering digital solutions and eventually products.

The rebuild therefore has two purposes:

1. Build a real, production-quality GeoWeb website.
2. Use the project as an engineering laboratory where I learn by actually building, debugging, documenting and deploying.

The intention is not to rush to a finished UI.

The intention is to establish a **clean engineering baseline first**, then progressively build the company and product systems around it.

---

# 3. The Engineering Philosophy

A major principle of this project is:

> **Build deliberately. Document deliberately. Learn deliberately.**

That means I should not treat AI as a replacement for understanding.

When AI helps produce code, I still need to understand:

- what the code does;
- why it is structured that way;
- what dependencies it creates;
- what can fail;
- how it behaves in production;
- and how to debug it when it does fail.

The project is therefore both a business asset and a learning environment.

---

# 4. Project Setup

## 4.1 Repository

The V2 project is maintained in GitHub:

`Georgeondigo/GeoWebSolutions-V2`

The project uses Git for version control.

The active development branch is:

```text
develop
```

The project also has a `main` branch.

The development workflow is intended to keep active work isolated from the production-oriented branch.

---

# 5. Core Technology Stack

The V2 application currently uses:

### Frontend / Application

- Next.js `16.3.4`
- React `19.2.8`
- TypeScript
- Tailwind CSS 4

### Backend / Server

- Next.js App Router
- Route Handlers
- NextAuth `4.24.15`

### Database

- PostgreSQL
- Prisma `7.10.0`
- `@prisma/client` `7.10.0`
- `@prisma/adapter-pg`

### Validation / Security

- Zod
- bcryptjs
- NextAuth

### Email

- Resend

### Deployment

- Vercel

### DNS

- Cloudflare

### Package manager

- pnpm `12.3.4`

This stack is not simply a list of technologies. Each technology became part of the learning process.

---

# 6. Application Structure I Reached

The application currently contains public pages, administration, APIs and dynamic content.

The verified route structure includes:

```text
/
 /about
 /contact
 /insights
 /insights/[slug]
 /services
 /work
 /work/[slug]

 /admin
 /admin/login
 /admin/inquiries
 /admin/inquiries/[id]

 /api/inquiries
 /api/admin/inquiries
 /api/admin/inquiries/[id]
 /api/auth/[...nextauth]
```

The project therefore moved beyond a static marketing website into a full-stack application with:

- public content;
- authentication;
- protected administration;
- database-backed inquiries;
- email notification infrastructure;
- and production APIs.

---

# 7. Building the Inquiry System

One of the important transitions was moving from a simple contact experience to a proper inquiry system.

The inquiry API uses:

- request validation;
- Zod;
- PostgreSQL;
- Prisma;
- server-side processing;
- email notification;
- inquiry status tracking;
- admin access.

The database contains an `Inquiry` model and migrations documenting its evolution.

The API endpoints include:

```text
POST /api/inquiries
GET  /api/admin/inquiries
GET  /api/admin/inquiries/[id]
PATCH /api/admin/inquiries/[id]
```

This was an important learning point:

> A contact form is not just a frontend form.

It becomes a system involving validation, persistence, notifications, authentication, error handling and administration.

---

# 8. Authentication and Administration

The project includes a protected admin area.

The authentication layer uses NextAuth.

The admin system was designed around server-side authentication rather than relying only on frontend visibility.

Environment configuration includes values for:

```text
GEOWEB_ADMIN_EMAIL
GEOWEB_ADMIN_PASSWORD_HASH_B64
NEXTAUTH_SECRET
NEXTAUTH_URL
```

The admin system provides a foundation for managing inquiries.

---

# 9. The Prisma Production Problem

This was one of the most valuable debugging experiences in the V2 build.

## What happened

The project built successfully locally:

```text
pnpm build
```

The build completed successfully.

However, the Vercel production deployment failed.

The important error was:

```text
Module not found: Can't resolve '@/generated/prisma/client'
```

The failing import was:

```text
import { PrismaClient } from "@/generated/prisma/client";
```

## Investigation

The Prisma client was generated locally using:

```bash
pnpm prisma generate
```

This produced:

```text
src/generated/prisma/client.ts
```

However, the generated directory was ignored by Git:

```text
.gitignore:43:/src/generated/prisma
```

Git was not tracking the generated client.

That by itself was not necessarily a problem if the deployment environment reliably generated the client during installation.

The important discovery was that the production build was not guaranteed to have the generated client available before Next.js compiled the application.

## Verification

I tested the installation process.

After removing the generated directory:

```bash
rm -rf src/generated/prisma
```

I ran:

```bash
pnpm install
```

Initially, the client was not generated.

I then used:

```bash
pnpm install --force
```

The postinstall hook executed:

```text
.postinstall$ prisma generate
```

and successfully generated:

```text
src/generated/prisma
```

## Resolution

The build script was changed so Prisma generation happens as part of the build itself.

The effective build flow became:

```text
prisma generate && next build
```

This was committed as:

```text
964051c Ensure Prisma client generation during build
```

The previous admin import fix was:

```text
e4c5b16 Fix admin Link import
```

## Result

The next Vercel production deployment became:

```text
● Ready
```

This was a major production lesson.

### What I learned

> **A project can work perfectly on my machine and still fail in deployment because the deployment environment does not necessarily reproduce my local generated state.**

I learned to distinguish between:

- source-controlled code;
- generated artifacts;
- installation lifecycle;
- build lifecycle;
- and production environment behavior.

This is one of the most important lessons from the V2 build so far.

---

# 10. Local Verification

After the Prisma fix, I ran:

```bash
pnpm lint
```

Result:

```text
No lint errors
```

I then ran:

```bash
pnpm build
```

The build completed successfully.

The final output confirmed:

```text
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

The route table also generated successfully.

This established a clean local production build.

---

# 11. Git Verification

The project reached a clean Git state.

The latest verified commits were:

```text
964051c Ensure Prisma client generation during build
e4c5b16 Fix admin Link import
e461dfb Improve inquiry email error reporting
```

The final status was:

```text
On branch develop
Your branch is up to date with 'origin/develop'.

nothing to commit, working tree clean
```

This became the Git baseline for the completed foundation phase.

---

# 12. Vercel Deployment

The V2 project is deployed as:

```text
geoweb-solutions-v2
```

The verified production deployment became:

```text
https://geoweb-solutions-v2-oe9gq3097-george-ondigos-projects.vercel.app
```

Its deployment status was:

```text
● Ready
```

The project uses Next.js and Node.js 24.x on Vercel.

The deployment process exposed the Prisma issue described earlier and provided a real production debugging experience.

---

# 13. Domain Migration / Reassignment

The GeoWeb domain:

```text
geowebsolutions.co.ke
```

was previously associated with the older Vercel project:

```text
geowebsolutions
```

The domain was removed from the old project and then assigned to:

```text
geoweb-solutions-v2
```

The `www` domain was also assigned:

```text
www.geowebsolutions.co.ke
```

The domain remained on Cloudflare DNS rather than switching nameservers to Vercel.

The Vercel inspection showed:

```text
Current Nameservers:
dee.ns.cloudflare.com
rocky.ns.cloudflare.com
```

while Vercel's intended nameservers were different.

This is expected when DNS remains managed through Cloudflare.

---

# 14. Production Domain Verification

The production domain was tested directly.

For:

```text
https://geowebsolutions.co.ke
```

the response was:

```text
HTTP/1.1 200 OK
Server: Vercel
```

The contact page was also tested:

```text
https://geowebsolutions.co.ke/contact
```

and returned:

```text
HTTP/1.1 200 OK
```

The `www` version was also tested:

```text
https://www.geowebsolutions.co.ke
```

and returned:

```text
HTTP/1.1 200 OK
```

This verified that the custom domain was serving the V2 application successfully.

---

# 15. Production Inquiry Testing

The inquiry API was tested directly against production.

## Honeypot / spam-style test

A request containing the website field was rejected:

```text
HTTP/1.1 400 Bad Request
```

with:

```json
{
  "success": false,
  "message": "Unable to process inquiry."
}
```

This verified that the protection logic was active.

## Validation test

A deliberately invalid email produced:

```text
HTTP/1.1 400 Bad Request
```

with validation feedback:

```json
{
  "success": false,
  "message": "Invalid inquiry data."
}
```

This confirmed server-side validation was working.

## Successful production test

A valid test inquiry produced:

```text
HTTP/1.1 201 Created
```

and:

```json
{
  "success": true,
  "message": "Inquiry received successfully.",
  "inquiryId": "cmu4nttiq000004le5tgx0wbs"
}
```

This was a major milestone.

It demonstrated that the complete production path was working:

```text
Browser / Client
      ↓
Production API
      ↓
Validation
      ↓
Database
      ↓
Inquiry creation
      ↓
Notification workflow
```

---

# 16. What Went Wrong During the Build

This section is intentionally preserved.

The goal is not to make the journey look perfect.

Important problems included:

### 16.1 Local vs production mismatch

The application built locally while the Vercel build failed.

**Lesson:** Always verify the actual production build environment.

### 16.2 Generated Prisma client

The generated Prisma client existed locally but was not guaranteed to exist in the deployment build.

**Lesson:** Generated dependencies must have an explicit and reliable generation strategy.

### 16.3 Vercel domain conflict

The custom domain was initially attached to the old project.

Attempting to assign it to V2 failed because the latest production deployment had failed.

**Lesson:** Infrastructure operations can depend on application deployment state.

### 16.4 CLI availability

The `vercel` command was not globally available:

```text
bash: vercel: command not found
```

Using:

```bash
npx vercel
```

allowed the Vercel CLI to run.

**Lesson:** A globally unavailable CLI does not necessarily mean the capability is unavailable; project-local execution through `npx` can be useful.

---

# 17. Commands That Became Important

These are some of the commands that were especially useful during this phase.

### Git

```bash
git status
git log -2 --oneline --decorate
git diff --stat
git diff --check
git grep
git add
git commit
git push
```

### Prisma

```bash
pnpm prisma generate
pnpm exec prisma generate
pnpm prisma --version
pnpm why prisma
pnpm why @prisma/client
```

### Build

```bash
pnpm lint
pnpm build
```

### Vercel

```bash
npx vercel ls geoweb-solutions-v2
npx vercel project inspect geoweb-solutions-v2
npx vercel project inspect geowebsolutions
npx vercel domains ls
npx vercel domains inspect geowebsolutions.co.ke
npx vercel domains add geowebsolutions.co.ke geoweb-solutions-v2
```

### Production verification

```bash
curl -I https://geowebsolutions.co.ke
curl -I https://www.geowebsolutions.co.ke
curl -I https://geowebsolutions.co.ke/contact
curl -i -X POST https://geowebsolutions.co.ke/api/inquiries ...
```

---

# 18. What I Understand Better Now

After this phase, I have gained practical exposure to:

- Git branching and commits;
- GitHub-based development;
- Next.js App Router;
- server-side route handlers;
- TypeScript;
- environment variables;
- Prisma;
- PostgreSQL;
- authentication;
- server-side validation;
- email APIs;
- production deployment;
- Vercel;
- Cloudflare DNS;
- custom domain configuration;
- production API testing;
- debugging deployment failures;
- generated build artifacts;
- and the difference between local and production environments.

More importantly, I experienced the engineering cycle:

```text
Build
  ↓
Test
  ↓
Fail
  ↓
Investigate
  ↓
Understand
  ↓
Fix
  ↓
Verify
  ↓
Document
  ↓
Deploy again
```

That cycle is one of the most important things I want to internalize.

---

# 19. Things I Should Not Forget

## Lesson 1

**A successful local build is not the same thing as a successful production deployment.**

## Lesson 2

**Do not blindly trust generated state on a development machine.**

## Lesson 3

**When something fails, investigate before changing random things.**

## Lesson 4

**Keep the history of failures.**

The failure is part of the learning.

## Lesson 5

**Infrastructure is part of software engineering.**

DNS, domains, environment variables, deployment configuration and build systems are part of the product.

## Lesson 6

**Documentation should happen during the journey, not months later.**

---

# 20. Foundation Phase Milestone

The Foundation / Production Baseline phase is now considered complete.

Verified:

- [x] Git repository established
- [x] `develop` branch established
- [x] application builds locally
- [x] lint passes
- [x] Prisma generation works
- [x] Prisma generation is part of the build
- [x] production deployment succeeds
- [x] V2 project exists on Vercel
- [x] custom domain assigned
- [x] `www` domain assigned
- [x] root domain returns HTTP 200
- [x] `www` domain returns HTTP 200
- [x] contact page returns HTTP 200
- [x] inquiry validation verified
- [x] spam/honeypot behavior verified
- [x] successful production inquiry verified
- [x] Git working tree clean
- [x] changes pushed to GitHub

---

# 21. What Comes Next

The next major phase is not simply "build more pages."

The next phase is to establish the **GeoWeb Operating System**.

That system should define how GeoWeb itself operates:

```text
Company
   ↓
Projects
   ↓
Products
   ↓
Engineering
   ↓
Documentation
   ↓
Learning
   ↓
Delivery
   ↓
Continuous improvement
```

The V2 website becomes one implementation inside that larger system.

---

# 22. Future Journey Entry Template

Every significant future milestone should be added using this structure:

## [DATE] — [TITLE]

### What I was trying to do

...

### What I expected

...

### What actually happened

...

### Problem

...

### Investigation

...

### Decision

...

### Implementation

...

### Result

...

### What I learned

...

### What I would do differently

...

### Related commits / files

```text
...
```

---

# 23. Current State

**Project:** GeoWeb Solutions V2  
**Branch:** `develop`  
**Foundation status:** COMPLETE  
**Production status:** LIVE  
**Custom domain:** VERIFIED  
**Inquiry system:** VERIFIED  
**Local build:** GREEN  
**Production build:** GREEN  
**Git status:** CLEAN  

### Current milestone

> **GeoWeb V2 has moved from development into a verified production baseline.**

The next objective is to build the operating system and development standards that will govern future GeoWeb work.

---

# 24. Personal Note

This project is bigger than the website.

I am using GeoWeb to learn how to think like an engineer, not just how to write code.

The important outcome is therefore not only:

> "I built a website."

It is:

> **"I learned how to take a real system from idea, through implementation and failure, into production — and document what I learned."**

This journey should continue for as long as GeoWeb continues to evolve.

---

**Document status:** Living document  
**Last major milestone:** Foundation / Production Baseline  
**Next phase:** GeoWeb Operating System
