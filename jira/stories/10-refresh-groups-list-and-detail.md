# Story 10: Refresh Groups List And Group Management

## Value Statement

As a StatusUI administrator, I want group management to clearly show group identity and membership so that I can maintain access control efficiently.

## Details For Developers

Refresh Groups list and create/edit screens. Preserve production list fields: group name, group description, and number of users. Preserve group create/edit fields and membership behavior, including admin/member sections, add/remove user dialogs, and warning that group name changes log out group members.

## Acceptance Criteria

- Groups list displays production fields and edit/delete actions.
- Group create/edit displays name and description fields.
- Existing warning about group name changes is retained.
- Admin and member sections show counts and user rows.
- Add user and remove user flows remain confirmable and accessible.
- Group save and back-to-list behavior remains compatible with production.
