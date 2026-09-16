# GeoWeb Solutions V2

> The official website and digital foundation for GeoWeb Solutions.

GeoWeb Solutions V2 is the next-generation website for **GeoWeb Solutions**, built as the foundation for the company's transition from a traditional web-development brand into a technology company focused on solving real business problems through digital products, systems, and services.

This repository contains the production website, inquiry system, administration interface, supporting infrastructure, and the documentation/journey system used to develop and maintain the project.

---

## 1. Project Overview

GeoWeb Solutions is being developed around a simple idea:

> **Don't just build websites. Build solutions.**

The website is therefore more than a marketing page.

It serves as:

- The public-facing identity of GeoWeb Solutions
- A portfolio and case-study platform
- A service discovery platform
- A lead/inquiry generation system
- An internal inquiry management system
- A foundation for future GeoWeb products
- A living engineering project used to document the company's development journey

The V2 project is intentionally being built with a production-oriented engineering workflow rather than treating the website as a one-off design project.

---

# 2. Vision

GeoWeb Solutions aims to become a technology company that identifies real-world business problems and builds practical digital solutions around them.

The long-term direction includes:

- Business websites
- Custom web applications
- Internal business systems
- SaaS products
- Digital transformation
- Automation
- Product development
- Technology consulting
- Ongoing software subscriptions and support

The website is the first major public representation of this direction.

---

# 3. Current Project Purpose

The immediate purpose of V2 is to establish a clean and reliable digital foundation for GeoWeb Solutions.

The project should provide:

1. A professional public website
2. Clear positioning
3. Services presentation
4. Work/case studies
5. Insights/content
6. Contact and inquiry capture
7. Administrative inquiry management
8. Production deployment
9. Proper engineering documentation
10. A repeatable development process

---

# 4. Technology Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Backend

- Next.js App Router
- Next.js Route Handlers
- Node.js

## Database

- PostgreSQL
- Prisma ORM 7

## Authentication

- NextAuth.js

## Email

- Resend

## Validation

- Zod

## Deployment

- Vercel

## Domain / DNS

- Cloudflare DNS
- GeoWeb Solutions domain: `geowebsolutions.co.ke`

## Package Manager

- pnpm 12

---

# 5. Architecture

The project uses the Next.js App Router.

High-level structure:

```text
GeoWeb Solutions V2
│
├── Public Website
│   ├── Home
│   ├── About
│   ├── Services
│   ├── Work
│   ├── Insights
│   └── Contact
│
├── Admin System
│   ├── Login
│   ├── Dashboard
│   └── Inquiry Management
│
├── API
│   ├── Public Inquiry API
│   ├── Admin Inquiry API
│   └── Authentication API
│
├── Database
│   └── PostgreSQL + Prisma
│
├── Email
│   └── Resend
│
└── Documentation
    ├── Foundation
    └── Development Journey
```

---

# 6. Application Routes

Current application routes:

```text
/
├── /about
├── /services
├── /work
│   └── /work/[slug]
├── /insights
│   └── /insights/[slug]
├── /contact
└── /admin
    ├── /admin/login
    ├── /admin/inquiries
    └── /admin/inquiries/[id]
```

API routes:

```text
/api/inquiries
/api/admin/inquiries
/api/admin/inquiries/[id]
/api/auth/[...nextauth]
```

---

# 7. Public Website

## Home

The homepage acts as the primary entry point into the GeoWeb Solutions brand.

Its responsibilities include:

- Communicating the company positioning
- Explaining the value proposition
- Introducing services
- Highlighting selected work
- Introducing the broader GeoWeb direction
- Driving visitors toward inquiries

## About

The About section communicates:

- Who GeoWeb Solutions is
- What the company believes
- How the company approaches technology
- The direction of the company

## Services

The Services section presents the capabilities offered by GeoWeb Solutions.

The long-term service model is expected to evolve as the company develops its product and systems direction.

## Work

The Work section functions as a case-study system.

Current case studies include:

- Evolve Payroll Platform
- S.O. Odingo Advocates
- Watama Law Advocates

The objective is not simply to display screenshots.

Each case study should increasingly demonstrate:

```text
Problem
↓
Context
↓
Approach
↓
Solution
↓
Technology
↓
Outcome
↓
Lessons
```

## Insights

The Insights section is intended to demonstrate thinking rather than simply publish generic blog content.

Current articles include:

- Why Businesses Need More Than a Website
- What Makes a Good Business Website
- From Business Problem to Digital Product

The Insights system uses dynamic routes with static generation for known content.

## Contact

The Contact page provides the primary lead-generation mechanism.

Visitors can submit an inquiry containing information such as:

- Name
- Business
- Email
- Project type
- Budget
- Timeline
- Message
- Optional website information

---

# 8. Inquiry System

The inquiry system is one of the project's first real backend features.

The flow is:

```text
Visitor
   │
   ▼
Contact Form
   │
   ▼
POST /api/inquiries
   │
   ├── Validate input
   ├── Reject invalid/spam submissions
   ├── Create database record
   └── Send notification email
```

The system stores inquiries in PostgreSQL.

The public API returns appropriate HTTP responses for:

- Successful submissions
- Invalid input
- Failed processing

---

# 9. Admin System

The project contains a protected administration area.

Current functionality focuses on inquiry management.

Admin routes:

```text
/admin
/admin/login
/admin/inquiries
/admin/inquiries/[id]
```

Authentication is handled using NextAuth.js.

Administrative API routes verify the authenticated session before allowing protected operations.

---

# 10. Database

The application uses PostgreSQL with Prisma.

Prisma schema:

```text
prisma/schema.prisma
```

Migrations are stored in:

```text
prisma/migrations/
```

The Prisma client is generated into:

```text
src/generated/prisma/
```

The generated Prisma client is intentionally excluded from Git and is generated during installation/build.

---

# 11. Prisma Generation

The project contains the following build lifecycle:

```json
"postinstall": "prisma generate"
```

The production build also explicitly runs Prisma generation:

```text
prisma generate && next build
```

This is important because the generated client lives in:

```text
src/generated/prisma
```

and is not committed to Git.

The production environment therefore generates the client from the Prisma schema before Next.js builds the application.

---

# 12. Environment Variables

The application uses environment variables for secrets and external services.

Current variables include:

```text
DATABASE_URL

RESEND_API_KEY

INQUIRY_NOTIFICATION_EMAIL

EMAIL_FROM

GEOWEB_ADMIN_EMAIL

GEOWEB_ADMIN_PASSWORD_HASH_B64

NEXTAUTH_SECRET
```

Environment files should never be committed to Git.

Expected local files:

```text
.env
.env.local
```

Production secrets must be configured through the deployment platform.

---

# 13. Security Principles

The project follows several important security principles.

### Secrets

Never commit:

```text
.env
.env.local
API keys
passwords
database credentials
authentication secrets
```

### Authentication

Administrative endpoints must verify an authenticated session.

### Validation

Incoming inquiry data is validated before being written to the database.

### Database

Database access is performed server-side.

### Generated Files

Generated Prisma client files are not manually maintained.

---

# 14. Git Workflow

The repository uses separate branches for stable and active development.

Current branches:

```text
main
develop
```

General workflow:

```text
develop
   │
   ├── Development
   ├── Testing
   ├── Verification
   │
   ▼
main
   │
   ▼
Production
```

The `develop` branch is the active development branch.

Changes should be committed with meaningful messages.

Example:

```bash
git add .
git commit -m "Describe the change"
git push origin develop
```

---

# 15. Current Git State

Recent commits include:

```text
964051c Ensure Prisma client generation during build
e4c5b16 Fix admin Link import
e461dfb Improve inquiry email error reporting
```

The repository should always be checked before beginning new work:

```bash
git status
git log -5 --oneline --decorate
```

---

# 16. Local Development

## Requirements

Recommended environment:

- Node.js 24.x
- pnpm 12.x
- PostgreSQL
- Git

The Vercel project currently uses Node.js 24.x.

## Install

Clone the repository:

```bash
git clone https://github.com/Georgeondigo/GeoWebSolutions-V2.git
```

Enter the project:

```bash
cd geowebsolutions-v2
```

Install dependencies:

```bash
pnpm install
```

Prisma Client will be generated automatically.

## Run Development Server

```bash
pnpm dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

# 17. Validation Before Commit

Before pushing changes, run:

```bash
pnpm lint
```

Then:

```bash
pnpm build
```

Then:

```bash
git diff --check
```

Finally:

```bash
git status
```

A clean working tree should be maintained before moving to the next development phase.

---

# 18. Production Deployment

The project is deployed through Vercel.

Current production project:

```text
geoweb-solutions-v2
```

Production domain:

```text
https://geowebsolutions.co.ke
```

WWW domain:

```text
https://www.geowebsolutions.co.ke
```

The domains are attached to the V2 Vercel project.

DNS remains managed through Cloudflare.

---

# 19. Domain Architecture

Current setup:

```text
Domain Registrar
       │
       ▼
Cloudflare Nameservers
       │
       ├── DNS
       │
       ▼
Vercel
       │
       ▼
GeoWeb Solutions V2
```

Current Cloudflare nameservers:

```text
dee.ns.cloudflare.com
rocky.ns.cloudflare.com
```

Vercel recognizes the domain but does not manage its nameservers because Cloudflare remains authoritative for DNS.

This is intentional.

---

# 20. Production Verification

Production has been tested directly.

Homepage:

```text
GET /
→ 200 OK
```

Contact page:

```text
GET /contact
→ 200 OK
```

WWW domain:

```text
GET https://www.geowebsolutions.co.ke
→ 200 OK
```

Inquiry endpoint validation was tested.

Invalid email:

```text
→ 400 Bad Request
```

Valid inquiry:

```text
→ 201 Created
```

A successful production inquiry returned:

```json
{
  "success": true,
  "message": "Inquiry received successfully."
}
```

This confirmed that the public inquiry endpoint is functioning in production.

---

# 21. Documentation System

Documentation is a core part of this project.

The project should not rely only on code.

Documentation exists to preserve:

- Decisions
- Architecture
- Development reasoning
- Lessons
- Problems
- Solutions
- Business direction
- Engineering practices
- Project history

Documentation is organized under:

```text
docs/
```

Current structure:

```text
docs/
├── 01-foundation/
└── journey/
```

---

# 22. Foundation Documentation

The Foundation documentation describes the project's intended baseline.

It should answer questions such as:

- What is GeoWeb Solutions?
- Why does the project exist?
- What problem is being solved?
- What are the project's goals?
- What is the technical architecture?
- What standards are being followed?
- What is the development workflow?
- What is the current phase?
- What decisions have already been made?

Foundation documents should change relatively slowly.

---

# 23. Development Journey

The Journey documentation records how the project was actually built.

This is different from traditional documentation.

The purpose is to preserve the journey:

```text
Idea
↓
Planning
↓
Research
↓
Decision
↓
Implementation
↓
Problem
↓
Debugging
↓
Solution
↓
Testing
↓
Deployment
↓
Lesson
```

The journey should document important engineering experiences rather than simply listing completed tasks.

---

# 24. Why the Journey Matters

GeoWeb Solutions is also being used as a learning environment.

The objective is not simply:

> "Build the website."

The objective is:

> "Build the website while becoming better at engineering, product development, business thinking, and technical decision-making."

The journey therefore becomes a long-term technical record.

It can eventually demonstrate:

- Engineering growth
- Architecture decisions
- Debugging ability
- Product thinking
- Deployment experience
- Business understanding
- Lessons learned

---

# 25. Engineering Philosophy

The project follows these principles.

## Build with intention

Do not add technology simply because it is popular.

Every important technology should have a reason.

## Understand before abstracting

Avoid unnecessary abstraction.

Understand the underlying system before creating layers around it.

## Document decisions

When an important architectural or product decision is made, document:

```text
Decision
Context
Options considered
Chosen approach
Reason
Consequences
```

## Prefer simple systems

A simple system that can be understood and maintained is preferable to unnecessary complexity.

## Production mindset

The project should be treated as a real production system.

That means considering:

- Security
- Reliability
- Deployment
- Monitoring
- Error handling
- Maintainability
- Performance
- Documentation

---

# 26. Development Method

Major work should generally follow this sequence:

```text
1. Understand
2. Define
3. Plan
4. Document
5. Implement
6. Test
7. Verify
8. Commit
9. Deploy
10. Record the lesson
```

Do not jump directly into implementation when the problem has not been properly defined.

---

# 27. Project Phases

The GeoWeb V2 development process is divided into phases.

A typical progression is:

```text
PHASE 01
Foundation
       ↓
PHASE 02
Architecture
       ↓
PHASE 03
Core Website
       ↓
PHASE 04
Backend Systems
       ↓
PHASE 05
Production Infrastructure
       ↓
PHASE 06
Business System
       ↓
PHASE 07
Product Development
       ↓
PHASE 08
Optimization & Growth
```

The exact phase state should be maintained in the project's foundation/project-state documentation rather than assumed from this README.

---

# 28. Current Infrastructure State

At the current stage:

- Git repository is configured
- `develop` branch is active
- GitHub is connected
- Next.js application is operational
- Prisma is operational
- PostgreSQL integration is implemented
- Inquiry system is implemented
- Admin authentication is implemented
- Admin inquiry management is implemented
- Email integration is implemented
- Production deployment is working
- Production domain is connected
- WWW domain is connected
- Production inquiry endpoint has been verified
- Foundation documentation is being established
- Development journey documentation is being established

---

# 29. Known Development Considerations

## Node Version

Local development has reported Node.js 26.x in the developer environment, while Vercel is configured for Node.js 24.x.

The project should preferably use the same major Node version locally and in production to minimize environment differences.

## pnpm

The project declares:

```text
pnpm@12.3.4
```

Do not casually upgrade package-manager versions without documenting the reason and verifying the lockfile/build.

## Prisma Generated Client

Do not manually commit:

```text
src/generated/prisma/
```

It is generated from the Prisma schema.

---

# 30. Common Commands

### Start development

```bash
pnpm dev
```

### Lint

```bash
pnpm lint
```

### Build

```bash
pnpm build
```

### Generate Prisma Client

```bash
pnpm prisma generate
```

### Check Git state

```bash
git status
```

### View recent commits

```bash
git log -5 --oneline --decorate
```

### Check differences

```bash
git diff
```

### Check whitespace errors

```bash
git diff --check
```

---

# 31. Vercel CLI

The Vercel CLI is currently being used through `npx`.

Example:

```bash
npx vercel ls geoweb-solutions-v2
```

List domains:

```bash
npx vercel domains ls
```

Inspect a domain:

```bash
npx vercel domains inspect geowebsolutions.co.ke
```

Inspect the project:

```bash
npx vercel project inspect geoweb-solutions-v2
```

Deployments should be inspected when debugging production issues.

---

# 32. Troubleshooting Principle

When something breaks:

Do not immediately change multiple things.

Instead:

```text
Observe
↓
Reproduce
↓
Collect evidence
↓
Identify the failure layer
↓
Change one thing
↓
Test
↓
Document
```

Example layers:

```text
Browser
↓
Next.js
↓
API
↓
Authentication
↓
Prisma
↓
PostgreSQL
↓
External Service
```

This prevents random debugging.

---

# 33. Deployment Debugging

When a Vercel deployment fails:

First inspect:

```bash
npx vercel ls geoweb-solutions-v2
```

Then identify the failing deployment.

The important distinction is:

```text
Build failure
≠
Runtime failure
≠
DNS failure
≠
Environment-variable failure
≠
Database failure
```

Each requires a different debugging approach.

---

# 34. Business Direction

GeoWeb Solutions is intended to evolve beyond project-based website development.

The long-term model is expected to increasingly include:

```text
Services
   +
Systems
   +
Products
   +
Recurring Revenue
```

The company should progressively develop reusable solutions instead of rebuilding every system from scratch.

---

# 35. Product Direction

One example of this direction is **ZOAR**, a product being developed within the broader GeoWeb direction.

The product-development philosophy is:

```text
Real Business Problem
        ↓
Understand Problem
        ↓
Build Solution
        ↓
Validate With Real User
        ↓
Improve
        ↓
Package
        ↓
Productize
        ↓
Recurring Revenue
```

The GeoWeb website should eventually communicate this product-oriented direction clearly.

---

# 36. Case Study Philosophy

GeoWeb case studies should increasingly move away from:

```text
"We built this website."
```

toward:

```text
"The client had this problem.
We understood the problem.
We designed this solution.
We implemented it this way.
Here is what changed."
```

This supports the broader positioning of GeoWeb as a solutions company.

---

# 37. Future System Direction

Potential future systems may include:

- Product management
- Client management
- Project management
- CRM
- Billing
- Subscriptions
- Support
- Analytics
- Internal operations
- Product administration

These should be introduced deliberately rather than prematurely.

---

# 38. Documentation Rules

When adding documentation:

### Use Markdown

Prefer `.md` for technical and project documentation.

### Name files clearly

Use descriptive names such as:

```text
project-overview.md
architecture.md
development-workflow.md
decision-log.md
```

### Avoid vague names

Avoid:

```text
notes.md
stuff.md
new.md
final.md
final-final.md
```

### Keep historical records

Do not rewrite history simply because an earlier approach changed.

Instead document:

```text
Original approach
↓
Problem discovered
↓
Decision changed
↓
New approach
```

This is particularly important for the Journey documentation.

---

# 39. What Should Be Committed?

Commit:

```text
src/
app/
components/
prisma/schema.prisma
prisma/migrations/
docs/
README.md
configuration files
package.json
pnpm-lock.yaml
```

Do not commit:

```text
.env
.env.local
node_modules/
.next/
src/generated/prisma/
secrets
credentials
```

---

# 40. Project Completion Definition

The project should not be considered complete merely because:

```text
pnpm build
```

passes.

A production-ready milestone should consider:

```text
Code
+
Database
+
Authentication
+
Security
+
Email
+
Deployment
+
Domain
+
Testing
+
Documentation
+
Business purpose
```

---

# 41. Definition of Done

For a meaningful feature:

```text
[ ] Requirement understood
[ ] Scope defined
[ ] Architecture considered
[ ] Implementation completed
[ ] Validation implemented
[ ] Error handling considered
[ ] Local testing completed
[ ] Production build passes
[ ] Git changes reviewed
[ ] Commit created
[ ] Changes pushed
[ ] Production verified where applicable
[ ] Documentation updated
[ ] Journey recorded
```

---

# 42. Repository Structure

The high-level repository structure is intended to remain organized around responsibility.

```text
.
├── docs/
│   ├── 01-foundation/
│   └── journey/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── insights/
│   │   ├── services/
│   │   └── work/
│   │
│   ├── generated/
│   │   └── prisma/
│   │
│   └── lib/
│       ├── auth.ts
│       ├── email/
│       └── prisma.ts
│
├── .gitignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── prisma7.config.ts
├── README.md
└── tsconfig.json
```

The exact structure may evolve as the system grows.

---

# 43. Project Identity

**Company**

GeoWeb Solutions

**Website**

https://geowebsolutions.co.ke

**Repository**

GeoWebSolutions-V2

**Primary development branch**

`develop`

**Production platform**

Vercel

**Database**

PostgreSQL

**ORM**

Prisma

---

# 44. Long-Term Objective

The ultimate goal of this project is not simply to create a good website.

The goal is to establish the foundation for:

> **GeoWeb Solutions as a technology company capable of repeatedly identifying business problems, designing solutions, building software, launching products, and creating sustainable recurring value.**

The website is the first visible layer of that system.

The engineering practices, documentation, business processes, and products built around it are the larger objective.

---

# 45. Project Principle

> **Build the solution, understand the system, document the journey, and keep improving.**

---

## Status

**Project:** GeoWeb Solutions V2  
**Status:** Active Development  
**Primary Branch:** `develop`  
**Production:** Live  
**Documentation:** Being established  
**Next Direction:** Continue building the documented GeoWeb foundation and development system.
