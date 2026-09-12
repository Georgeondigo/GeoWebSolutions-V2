# GeoWeb Inquiry Domain Model

## 1. Purpose

An Inquiry represents a potential business opportunity submitted through the
GeoWeb Solutions website.

It captures the initial information GeoWeb needs to understand a potential
client, their business, their project requirements, budget expectations and
timeline.

An Inquiry is not yet a Client or a Project.

---

## 2. Inquiry Lifecycle

An inquiry follows a defined business lifecycle:

NEW
↓
REVIEWED
↓
CONTACTED
↓
QUALIFIED
↓
PROPOSAL
↓
WON

An inquiry may leave the active sales process through:

QUALIFIED → LOST

An inquiry may also be archived for administrative purposes:

ANY STATE → ARCHIVED

---

## 3. Status Definitions

### NEW

The inquiry has been successfully submitted but has not yet been reviewed.

### REVIEWED

GeoWeb has reviewed the submitted information and assessed the initial
opportunity.

### CONTACTED

GeoWeb has contacted the potential client.

### QUALIFIED

The opportunity has been assessed as suitable for further engagement and
there is enough information to proceed.

### PROPOSAL

GeoWeb is preparing or has presented a proposal for the potential project.

### WON

The potential client has agreed to proceed with GeoWeb.

### LOST

The opportunity will not proceed.

### ARCHIVED

The inquiry is no longer part of the active workflow but is retained for
record-keeping.

---

## 4. Domain Entity

The primary entity is:

Inquiry

An Inquiry represents an initial expression of interest from a potential
client.

---

## 5. Inquiry Attributes

| Attribute   | Purpose                                              |
| ----------- | ---------------------------------------------------- |
| id          | Unique identifier                                    |
| name        | Name of the person submitting the inquiry            |
| business    | Business or organization associated with the inquiry |
| email       | Contact email address                                |
| projectType | Type of digital solution requested                   |
| budget      | Approximate project budget                           |
| timeline    | Expected project timeline                            |
| message     | Description of the client's needs                    |
| status      | Current position in the inquiry lifecycle            |
| createdAt   | Time the inquiry was created                         |
| updatedAt   | Time the inquiry was last updated                    |

---

## 6. Business Rules

1. Every valid inquiry starts with the status `NEW`.
2. An inquiry must pass server-side validation before persistence.
3. Honeypot submissions must be rejected and must not be persisted.
4. The honeypot field is a security/control field and is not part of the
   persistent Inquiry domain model.
5. Email notification is a secondary side effect of inquiry creation.
6. Failure to send an email notification must not remove or invalidate a
   successfully persisted inquiry.
7. Inquiry status represents the business opportunity lifecycle.
8. An Inquiry does not represent a Client or Project.
9. Future relationships between inquiries, clients and projects should be
   introduced only when the business workflow requires them.

---

## 7. Current System Flow

Visitor
↓
Contact Form
↓
POST /api/inquiries
↓
JSON Parsing
↓
Zod Validation
↓
Honeypot Check
↓
PostgreSQL Persistence
↓
Email Notification

The database is the source of truth for successfully submitted inquiries.

---

## 8. Future Domain Direction

The current Inquiry entity is intentionally kept focused.

As GeoWeb's internal platform evolves, the broader business domain may
eventually include:

Inquiry
↓
Opportunity
↓
Client
↓
Project

These entities should not be introduced prematurely.

The system should evolve from actual business requirements rather than
technical complexity for its own sake.

---

## 9. Engineering Principle

GeoWeb models business concepts before implementing database structures.

The database should represent the business domain rather than defining the
business domain by itself.
