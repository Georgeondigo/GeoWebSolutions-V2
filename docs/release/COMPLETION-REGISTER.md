# GeoWeb V2 — Completion Register

**Single source of truth for what is left before V2 is declared complete.**
Audited 16 November 2026 against `develop` at `f285988`.
The checklist in [v2-exit-criteria.md](v2-exit-criteria.md) defines "complete";
this register records the evidence and the remaining work. Update a row when its
status changes; do not track the same item anywhere else.

Status: COMPLETE, PARTIAL, MISSING, BROKEN, DEFERRED.
Priority: P0 launch blocker, P1 needed for normal business operation,
P2 important improvement, P3 future.
Effort is hands-on implementation time.

## How things were verified

- **Verified by running:** frozen-lockfile install, `pnpm lint`,
  `tsc --noEmit` and `pnpm build` all pass on a clean checkout of `f285988`
  with a dummy `DATABASE_URL` and no other environment variables.
- **Verified by reading code:** every row citing a file.
- **Verified from GitHub:** default branch, branch protection, deployment
  records, commit statuses.
- **Not verified (assumptions):** anything needing the live site, the Vercel
  dashboard, the database, Cloudflare, Resend, or a browser. No environment
  file was read and no database was contacted. Visual, responsive and
  accessibility behaviour was not checked in a browser.

## Critical path

1. Resolve the uncommitted package changes (E3), merge the release procedure, protect `develop` (E4).
2. Privacy notice (W8).
3. Admin sign-out, login throttling, security headers, inquiry rate limit (A2, A3, A5, I2).
4. SEO basics (W7).
5. Verify the migration procedure and backups (D2, D3).
6. Portfolio and contact details (W3, W6) — needs content from the owner.
7. Production smoke test, tick the exit criteria, declare V2 complete (R1).

Hosting-plan terms (O4) need a decision in parallel; it may affect the KES 0 budget.

## Register

### Public website

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| W1 | Home, Services, About, Insights, Contact pages | COMPLETE | All prerender in the build; content in `src/app/*/page.tsx`, `src/data/` | Owner content review | P2 | — | 1h |
| W2 | Insights system | COMPLETE | 3 articles in `src/data/insights.ts`, static params, per-article metadata, `notFound()` | Adding articles means a code change; acceptable for now | P3 | — | — |
| W3 | Work / portfolio | PARTIAL | 3 projects in `src/data/projects.ts`; each has only a one-line problem and solution, no image, no live URL, no results | Real case-study content, screenshots, links; confirm each client permits publication | P1 | Owner content, client consent | 3–4h |
| W4 | Navigation | COMPLETE | `Header.tsx`, `MobileMenu.tsx` (has `aria-expanded`, `aria-label`), `Footer.tsx` | Browser check | P2 | — | 0.5h |
| W5 | Responsive behaviour and accessibility | PARTIAL | Responsive Tailwind classes throughout; form fields have labels (8 `htmlFor`), error uses `role="alert"`. Not checked in a browser | Manual pass at phone, tablet and desktop widths; keyboard and contrast check | P1 | — | 2h |
| W6 | Contact details | PARTIAL | Only `hello@geowebsolutions.co.ke` on `/contact`; no phone or WhatsApp; footer has no contact details | Add phone/WhatsApp and location if the owner wants them public | P1 | Owner decision | 0.5h |
| W7 | Metadata and SEO | PARTIAL | Titles and descriptions exist per page. Missing: `sitemap`, `robots`, `metadataBase`, Open Graph image, canonical URLs; home page has no own title | Add `src/app/sitemap.ts`, `robots.ts`, `metadataBase` and OG defaults in `layout.tsx`; then submit to Google Search Console | P1 | — | 2h |
| W8 | Privacy notice | MISSING | No privacy page; the contact form collects name, email and message | Add a short privacy page linked from the form and footer. Kenya's Data Protection Act expects people to be told how their data is used at collection. Classed P0 as a judgement call; wording needs the owner's review | P0 | Owner review | 1–2h |
| W9 | Custom 404 and error pages | MISSING | No `not-found.tsx`, `error.tsx` or `global-error.tsx`; Next.js defaults are used | Branded 404 and error page | P2 | — | 1h |
| W10 | Admin pages show the public header and footer | PARTIAL | `src/app/layout.tsx` wraps every route, including `/admin`, in `Header` and `Footer` | Move public chrome into a route group so admin has only its own header | P2 | — | 1h |

### Inquiry system

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| I1 | Form, validation, honeypot, persistence, notification, status lifecycle | COMPLETE | `api/inquiries/route.ts`, `lib/validation.ts`, `api/admin/inquiries/[id]/route.ts` (`allowedTransitions`) | — | — | — | — |
| I2 | Abuse protection on `POST /api/inquiries` | PARTIAL | Honeypot plus a 20-per-hour cap on notification emails. Nothing limits how many rows one sender can create | Per-IP rate limit. Zero-cost options: a Vercel Firewall rate-limit rule or a Cloudflare rule (depends on plan and whether DNS is proxied) before writing code | P1 | Check Vercel/Cloudflare settings | 1–2h |
| I3 | Failed or suppressed notifications | PARTIAL | Stored and shown in the admin list; no resend action | Add "resend notification" or accept checking the admin list daily | P2 | — | 1h |
| I4 | Confirmation email to the person inquiring | MISSING | Only the internal notification is sent | Auto-reply through Resend | P2 | Resend quota | 1h |
| I5 | Inquiry list scale | PARTIAL | `findMany` with no pagination or filter | Pagination and status filter once volume needs it | P3 | — | 2h |

### Authentication and admin

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| A1 | Admin pages and admin APIs protected server-side | COMPLETE | `getServerSession` check in all 3 admin pages and all 3 admin handlers; bcrypt password check in `lib/auth.ts` | — | — | — | — |
| A2 | Sign out | MISSING | No `signOut` anywhere in `src`; the session lasts the NextAuth default of 30 days | Sign-out button in `admin/layout.tsx` | P1 | — | 0.5h |
| A3 | Login brute-force protection | MISSING | `authorize` has no attempt limiting | Same mechanism as I2, applied to `/api/auth/callback/credentials` | P1 | I2 | 0.5h |
| A4 | Session configuration | PARTIAL | JWT strategy; no `maxAge` set; `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are read by NextAuth, not referenced in code. Production values not inspected | Confirm both are set in Vercel; consider a shorter `maxAge` | P1 | Vercel dashboard | 0.5h |
| A5 | Security headers | MISSING | `next.config.ts` is empty | Add `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security` via `headers()` | P1 | — | 1h |
| A6 | Dashboard | PARTIAL | Three static cards; no counts | Show new and open inquiry counts | P2 | — | 1h |
| A7 | Client and project management | DEFERRED | No models, pages or routes; the dashboard card says operations "will be added". Not in the V2 exit criteria | Recommendation: keep out of V2. Track won clients through the inquiry `WON` status plus a spreadsheet until client volume justifies building it | P3 | Owner decision | 2–4 days if built |

### Data and database

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| D1 | Schema and migration history | COMPLETE | One `Inquiry` model, two enums, three ordered migrations | — | — | — | — |
| D2 | Production migration procedure | BROKEN | Config is named `prisma7.config.ts` (Prisma looks for `prisma.config.ts`) and imports `dotenv`, which is not installed. `prisma migrate deploy` has not been run in this audit | Rename or pass `--config`, drop or add `dotenv`, then prove `prisma migrate status` against a throwaway database. Blocks every future schema change | P1 | Approval before touching a real database | 1–2h |
| D3 | Backup and recovery | MISSING | No backup procedure documented; database provider and plan not inspected | Record the provider's backup or point-in-time recovery; add a manual `pg_dump` step if there is none | P1 | Provider dashboard | 1h |
| D4 | Preview and Production share a database | PARTIAL | Stated by the owner; consistent with one `DATABASE_URL` in code | Previews require Vercel sign-in (verified on PR 1), so the public cannot reach the database through them. Either accept and follow the Preview rule in RELEASE.md, or point Preview at a second free database | P2 | Owner decision | 1h |
| D5 | Test data in production | PARTIAL | Docs record test inquiries submitted to production | Archive or delete test rows (deletion needs approval) | P2 | Approval | 0.5h |

### Engineering, CI and release

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| E1 | Lint, TypeScript, production build | COMPLETE | All pass on a clean checkout (see "How things were verified") | — | — | — | — |
| E2 | Automated pre-merge check | PARTIAL | GitHub Actions is unavailable: the job on PR 1 was not started because the account is locked for a billing issue, and the owner cannot clear it. The Vercel Preview build (TypeScript check and production build) runs on every pull request and passed on PR 1. Lint is not enforced anywhere | Decide whether to add lint to the build script so Vercel enforces it (changes the production build command; needs approval). Restore the Actions workflow from history if the lock is cleared | P1 | Owner decision | 10 min |
| E3 | Uncommitted changes to `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml` | BROKEN | Adds `@prisma/cli 8.0.0-rc.28` (a pre-release, about 3,300 new lockfile lines, used by no script or source file) and leaves `set this to true or false` placeholders for `esbuild` and `workerd` in `allowBuilds`. Files dated 29 Oct, the day after the last commit | Recommendation: discard all three (`git restore`). Must not be committed as they are. Left untouched pending the owner's decision | P0 | Owner decision | 5 min |
| E4 | Branch protection on `develop` | MISSING | GitHub API returns "Branch not protected" | Apply the settings in RELEASE.md, requiring the `Vercel` status. Not tested whether the billing lock blocks this setting | P0 | Approval | 10 min |
| E5 | Release procedure and production-branch documentation | COMPLETE | `docs/04-deployment/RELEASE.md`; README, DEPLOYMENT.md and DEVELOPMENT-WORKFLOW.md corrected to say `develop` is production | — | — | — | — |
| E6 | Clean working tree | PARTIAL | Besides E3, four untracked items: `CLAUDE.md`, two `docs/02-architecture/` files, `docs/09-engineering-hardening/` | Owner decides whether to commit them | P1 | Owner decision | 10 min |
| E7 | Automated tests | MISSING | No test runner; one Postman collection | Smallest useful set: unit tests for `inquirySchema` and `allowedTransitions` using Node's built-in test runner | P2 | — | 2h |
| E8 | Node version alignment | PARTIAL | Local machine runs Node 26; Vercel's setting not inspected; no `engines` field | Read the Vercel project's Node version and develop on the same major | P2 | Vercel dashboard | 10 min |
| E9 | GitHub account billing lock | BROKEN | GitHub annotation on PR 1: "your account is locked due to a billing issue" | Owner reports it cannot be cleared at present. Effects beyond Actions are unknown | P1 | Owner | — |

### Observability and operations

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| O1 | Error logging | PARTIAL | `console.error` in every handler; inquiry personal data is not logged | Know where Vercel runtime logs are and how long they are kept; write it in the troubleshooting doc | P2 | — | 0.5h |
| O2 | Uptime monitoring | MISSING | None configured | Free external monitor on `/` and `/contact` | P2 | — | 0.5h |
| O3 | Email sending domain | PARTIAL | Docs report a production notification was delivered; Resend domain status not inspected | Confirm the domain is verified in Resend with SPF and DKIM | P1 | Resend dashboard | 0.5h |
| O4 | Hosting plan terms | PARTIAL | Vercel plan not inspected | If the project is on Vercel's free Hobby plan, check its terms on commercial use; a business site may require a paid plan or a different free host. This could conflict with the KES 0 budget | P1 | Owner decision | — |

### Documentation

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| X1 | Architecture, ADRs, setup, deployment docs | COMPLETE | `docs/01`–`08`, README | — | — | — | — |
| X2 | Changelog | PARTIAL | Last entry September; commits `c488e92` and `f285988` are not recorded | Add the two missing entries | P2 | — | 0.5h |
| X3 | Duplicate document trees | PARTIAL | `docs/architecture` vs `docs/02-architecture`, `docs/journey` vs `docs/08-journey`, `docs/01-foundation` vs `docs/03`–`04` | Consolidate after V2; do not add more | P3 | — | 2h |
| X4 | Business operating plan and 90-day roadmap | MISSING | Not in the repository | Stages E and F of the sprint | P1 | Owner input on pricing and targets | — |

### Release

| ID | Requirement | Status | Evidence | Remaining work | Pri | Depends on | Effort |
|---|---|---|---|---|---|---|---|
| R1 | Production smoke test and exit-criteria sign-off | PARTIAL | Docs record a September verification; GitHub shows the latest Production deployment (`f285988`, 28 Oct) succeeded. Not re-tested in this audit | Run the smoke test in RELEASE.md after the P0 and P1 items, tick `v2-exit-criteria.md` | P0 | All P0 and P1 rows | 1h |

## Totals

P0: E3, E4, W8, R1 — about half a day.
P1: about two days of implementation plus owner decisions and dashboard checks.
