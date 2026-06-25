# Story 09: Refresh User Create And Edit Form

## Value Statement

As a StatusUI administrator, I want a clearer user form for identity, role, and group membership so that I can create or update accounts with fewer mistakes.

## Details For Developers

Refresh the production user create/edit form. Preserve fields and behavior for username, email, SuperRole, admin groups, member groups, search/filter group assignment, save, back to list, and password reset where applicable.

## Acceptance Criteria

- Create and edit modes are visually distinct.
- Required fields are labeled and validated.
- SuperRole options match production values.
- Admin group and member group assignment behavior prevents duplicate or conflicting membership.
- Save submits through existing production behavior.
- Back/cancel returns to the Users list without unintended changes.
- Password reset entry point remains disabled or hidden when not applicable.
