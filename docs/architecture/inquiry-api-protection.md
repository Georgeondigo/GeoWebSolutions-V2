# GeoWeb Inquiry API Protection

## 1. Purpose

The public inquiry API accepts unauthenticated requests from visitors who want
to contact GeoWeb Solutions.

Because the endpoint creates database records and triggers notification
processing, it must be protected against automated spam and excessive request
activity.

---

## 2. Current Protection

The inquiry API currently uses:

### Server-side validation

Zod validates the request structure and allowed values before persistence.

### Honeypot protection

A hidden `website` field is included in the public form.

Legitimate users leave this field empty.

Requests containing a value in the honeypot field are rejected and are not
persisted.

---

## 3. Rate Limiting Objective

Rate limiting will reduce excessive requests to the public inquiry endpoint.

The goal is to prevent abusive request bursts without making legitimate project
submissions difficult.

Rate limiting is not intended to replace infrastructure-level DDoS
protection.

---

## 4. Threats

The endpoint should account for:

- Automated form submissions
- Repeated valid submissions
- Request bursts
- Attempts to generate large numbers of database records
- Attempts to generate excessive notification requests

---

## 5. Protection Layers

The intended protection model is:

Internet
↓
Cloudflare / Edge Protection
↓
Next.js API
↓
Rate Limiting
↓
Request Validation
↓
Honeypot Check
↓
PostgreSQL
↓
Email Notification

Each layer addresses a different class of risk.

---

## 6. Architecture Principle

GeoWeb should use the simplest rate-limiting architecture that provides
appropriate protection for its current scale.

Additional infrastructure such as a distributed Redis-compatible store should
only be introduced when the application's requirements justify the added
complexity.

---

## 7. Future Considerations

As GeoWeb grows, API protection may evolve to include:

- Distributed rate limiting
- Edge-based request controls
- Abuse monitoring
- Request logging
- Notification monitoring
- Authentication for internal APIs
- More advanced security controls

## 8. Current Cloudflare Configuration

The GeoWeb inquiry endpoint is protected at the Cloudflare edge.

### Protected endpoint

POST /api/inquiries

### Rate limit

3 requests per 10 seconds per IP.

### Action

Block requests exceeding the configured threshold.

### Mitigation

10 seconds.

### Purpose

The rule is designed to prevent rapid repeated submissions from reaching the
Next.js application, database and notification system.

The Cloudflare rule provides an edge-level protection layer while application
level validation and honeypot protection remain responsible for validating and
filtering requests that reach the application.
