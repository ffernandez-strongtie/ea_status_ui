# Story 01: Audit Production UI Contracts Before Implementation

## Value Statement

As a StatusUI developer, I want the current production routes, fields, permissions, and workflows documented before implementation so that the UI refresh does not break existing admin or engineering operations.

## Details For Developers

Review production StatusUI and existing code paths for Projects, Users, Groups, Maintenance, Jobs, My Account, and detail pages. Document route shapes, required fields, sortable/filterable fields, action links, role visibility, and form submit behavior.

Use the accepted mockup as the design target, but treat production behavior as the compatibility baseline.

## Acceptance Criteria

- Production route inventory is documented for all refreshed pages.
- Production table columns and filter fields are documented for Projects, Users, Groups, Jobs, and Maintenance.
- Current create/edit/detail/delete workflows are documented for Users and Groups.
- Transmission detail fields are documented, including sequence and type/repair fields.
- Any mockup behavior that changes production semantics is flagged for PM approval.
