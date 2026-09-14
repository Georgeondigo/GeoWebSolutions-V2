# GeoWeb Authentication

## 1. Purpose

Authentication protects the internal GeoWeb management interface from
unauthorized access.

The public GeoWeb website remains accessible without authentication.

The internal administration area requires an authenticated GeoWeb Admin
session.

---

## 2. Access Boundaries

### Public

The following areas are publicly accessible:

- Homepage
- About
- Services
- Work
- Insights
- Contact
- Public inquiry submission API

### Internal

The following areas require authentication:

- Admin dashboard
- Inquiry management
- Future internal GeoWeb operational tools

---

## 3. Initial User Model

The initial implementation supports one internal role:

GeoWeb Admin

The first version does not require:

- User registration
- Multiple roles
- Team accounts
- Granular permissions
- Client accounts
- Multi-tenant access

Additional roles may be introduced when actual business requirements
justify them.

---

## 4. Authentication Requirements

The system must:

- Require authentication for internal administration.
- Provide a secure login flow.
- Provide logout functionality.
- Maintain an authenticated session.
- Protect internal server-side data access.
- Prevent unauthenticated users from accessing inquiry records.
- Keep authentication credentials separate from inquiry data.

---

## 5. Authorization

Authentication determines whether a user is signed in.

Authorization determines whether the signed-in user is permitted to perform
an operation.

The initial system has one authorized administrative role:

GeoWeb Admin

All inquiry-management operations must verify authorization on the server.

Client-side UI restrictions are not considered a security boundary.

---

## 6. Session Security

Authentication sessions should be managed using established security
patterns provided by the selected authentication solution.

The application should not implement custom password hashing, session
tokens or authentication cryptography unless there is a specific requirement
that justifies it.

Authentication secrets must be stored in environment variables and must
never be committed to Git.

---

## 7. Protected Resources

The following resources require authentication:

- `/admin`
- `/admin/inquiries`
- Individual inquiry management operations
- Future internal APIs

The public endpoint:

`POST /api/inquiries`

remains unauthenticated because it receives submissions from website
visitors.

---

## 8. Security Boundary

The security boundary exists on the server.

The application must verify authentication before:

- Returning inquiry records.
- Returning sensitive internal information.
- Updating inquiry status.
- Archiving inquiries.
- Performing future administrative actions.

A user must not be able to bypass authorization by directly calling an API
endpoint.

---

## 9. Initial Authentication Flow

The initial flow is:

Admin
↓
Login
↓
Authentication provider
↓
Authenticated session
↓
Admin interface
↓
Protected server operations

Unauthenticated access:

User
↓
Protected resource
↓
Authentication check
↓
Login required

---

## 10. Credentials

Authentication credentials must not be stored in the Inquiry model.

The inquiry domain remains focused on business inquiries.

Authentication data belongs to the authentication subsystem.

---

## 11. What We Will Not Build Yet

The first version will not include:

- User registration
- Social login
- Password reset
- Email verification
- Multiple administrative roles
- Team management
- Client authentication
- Client portals
- Multi-tenancy
- Advanced permission management

These may be introduced later when GeoWeb's operational requirements
justify them.

---

## 12. Future Evolution

If GeoWeb grows to require multiple internal users, the authentication
system can evolve toward:

User
↓
Role
↓
Permission
↓
Resource

Possible future roles may include:

- Owner
- Admin
- Sales
- Project Manager
- Developer

These should only be introduced when the business workflow requires them.

---

## 13. Engineering Principle

Authentication is security-critical infrastructure.

GeoWeb should understand how authentication works without unnecessarily
implementing security-sensitive primitives from scratch.

Prefer established, well-maintained authentication mechanisms and keep the
application's authorization rules explicit and understandable.

Security should be enforced server-side.

Complexity should be introduced only when actual requirements justify it.