# GeoWeb Inquiry Management

## 1. Purpose

The Inquiry Management system is the internal workflow for reviewing and
managing project inquiries submitted through the GeoWeb Solutions website.

The public inquiry API is responsible for receiving and persisting inquiries.

The Inquiry Management system is responsible for helping authorized GeoWeb
users review, qualify, progress and archive those inquiries.

The system is an internal GeoWeb business tool and is not publicly accessible.

---

## 2. Core Principle

An Inquiry represents a potential business opportunity.

An Inquiry is not automatically a Client or a Project.

The initial relationship is:

Inquiry
↓
Potential Opportunity

Future business entities may be introduced when the actual workflow requires
them:

Inquiry
↓
Opportunity
↓
Client
↓
Project

The system should not create these additional entities prematurely.

---

## 3. Access

The initial system will support one internal role:

### GeoWeb Admin

A GeoWeb Admin can:

- View inquiries
- Review inquiry details
- Update inquiry status
- Archive inquiries
- View notification status
- View inquiry timestamps
- Access the internal inquiry management interface

The first version will not introduce:

- Multiple staff roles
- Department-level permissions
- Granular permissions
- Multi-tenant access
- Client accounts

These capabilities may be introduced later if GeoWeb's actual business
requirements justify them.

---

## 4. Authentication

The Inquiry Management interface must require authentication.

Unauthenticated visitors must not be able to access internal inquiry data.

The public `/api/inquiries` endpoint remains unauthenticated because it is
the endpoint used by the public website contact form.

Therefore:

Public Website
↓
Public Inquiry API

while:

GeoWeb Admin
↓
Authentication
↓
Inquiry Management

These are separate access boundaries.

---

## 5. Authorization

Authentication answers:

"Who is accessing the system?"

Authorization answers:

"Is this user allowed to manage inquiries?"

The initial implementation has a single authorized role:

GeoWeb Admin

All inquiry-management operations must occur within an authenticated and
authorized context.

The public website must never receive unrestricted access to existing
inquiry records.

---

## 6. Inquiry Management Workflow

The inquiry business lifecycle is:

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

Alternative outcome:

QUALIFIED
↓
LOST

Administrative outcome:

ANY STATE
↓
ARCHIVED

The system should guide users through valid business transitions rather than
allow arbitrary status changes without consideration.

---

## 7. Status Definitions

### NEW

A newly submitted inquiry that has not yet been reviewed.

### REVIEWED

The inquiry has been reviewed by GeoWeb.

### CONTACTED

GeoWeb has contacted the potential client.

### QUALIFIED

The inquiry has been evaluated and represents a legitimate business
opportunity that GeoWeb may pursue.

### PROPOSAL

GeoWeb is preparing or has presented a proposal for the opportunity.

### WON

The opportunity has resulted in an accepted engagement.

### LOST

The opportunity will not proceed.

### ARCHIVED

The inquiry has been administratively archived and should no longer appear
in the active workflow.

---

## 8. Inquiry Information

The management interface should provide access to:

### Contact

- Name
- Business
- Email

### Project

- Project type
- Budget
- Timeline
- Message

### Business

- Inquiry status
- Created date
- Updated date

### Notification

- Notification status
- Notification sent timestamp
- Sanitized notification error when applicable

The system should present the information clearly without exposing secrets or
internal implementation details unnecessarily.

---

## 9. Initial Admin Views

The first version should provide two primary views.

### Inquiry List

The list should allow an administrator to quickly see:

- Inquiry name
- Business
- Project type
- Status
- Notification status
- Date received

The list should support basic filtering by inquiry status.

Additional search, sorting and pagination can be introduced when the volume
of inquiries justifies them.

### Inquiry Detail

The detail view should provide the complete inquiry information and allow
the administrator to:

- Review the inquiry
- Change its status
- Archive it
- Inspect notification state

---

## 10. Status Changes

The application should validate status transitions server-side.

The interface should not be trusted to enforce business rules by itself.

Valid transitions initially include:

NEW → REVIEWED

REVIEWED → CONTACTED

CONTACTED → QUALIFIED

QUALIFIED → PROPOSAL

QUALIFIED → LOST

PROPOSAL → WON

Any state → ARCHIVED

The exact transition rules may evolve as the GeoWeb sales workflow becomes
more mature.

---

## 11. Notification State

Inquiry business status and notification status represent different concepts.

### Business status

NEW → REVIEWED → CONTACTED → QUALIFIED → PROPOSAL → WON

### Notification status

PENDING → SENT

or:

PENDING → FAILED

A notification failure must not change the business status of an inquiry.

For example:

Inquiry:
NEW

Notification:
FAILED

is a valid system state.

---

## 12. Actions

The initial management system supports:

### Review

View the complete inquiry and assess its relevance.

### Change Status

Move the inquiry through the defined business lifecycle.

### Archive

Remove an inquiry from the active workflow without deleting its historical
record.

### Contact

The initial version may provide the inquiry email as a convenient contact
point.

The system does not initially attempt to manage complete email
communication history.

---

## 13. Data Integrity

The database remains the source of truth.

Status changes must be performed server-side.

Client-side UI controls must not be treated as a security boundary.

An inquiry should not be deleted simply because it is no longer active.

Archiving is preferred over destructive deletion for the initial workflow.

---

## 14. Security Requirements

The internal system must:

- Require authentication.
- Authorize administrative operations.
- Validate incoming status changes.
- Prevent unauthorized access to inquiry records.
- Avoid exposing database credentials or provider secrets.
- Avoid exposing unnecessary internal error details to users.
- Keep public inquiry submission separate from internal inquiry management.

---

## 15. What We Will Not Build Yet

The initial Inquiry Management system will not include:

- CRM functionality
- Opportunity entity
- Client entity
- Project entity
- Sales pipeline automation
- Email inbox integration
- Email conversation history
- Automated follow-up sequences
- Notifications to multiple staff members
- Role-based access control beyond the initial admin role
- Complex reporting
- Advanced analytics
- AI lead scoring
- Payment functionality

These features may become useful later, but they are not required to manage
the current GeoWeb inquiry workflow.

---

## 16. Future Evolution

As GeoWeb grows, the business model may evolve from:

Inquiry

to:

Inquiry
↓
Opportunity
↓
Client
↓
Project
↓
Delivery
↓
Support / Growth

At that stage, the current Inquiry Management system should become one part
of a broader GeoWeb operational platform.

The architecture should therefore remain modular without prematurely
implementing the future entities.

---

## 17. Engineering Principle

The internal system should reflect the real business workflow.

We should not build a generic CRM simply because CRM features are common.

We should first understand how GeoWeb actually handles inquiries, prospects,
clients and projects.

Then the software should model those processes.

Build the business model first.

Build the interface second.

Introduce complexity only when real requirements justify it.