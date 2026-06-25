# Story 08: Refresh Users List And Detail Views

## Value Statement

As a StatusUI administrator, I want user lists and details to be easier to scan so that I can find accounts and verify access without parsing dense text links.

## Details For Developers

Refresh the Users list and detail pages. Preserve production columns and actions unless product approves additional fields: id, email, username, password expiration, edit, details, and delete. If role/group/status fields from the mockup are added, confirm source data and display rules.

## Acceptance Criteria

- Users list supports production search behavior by username or email.
- User rows include edit, details, and delete actions with accessible labels.
- User detail page displays existing production fields.
- Pagination/page size behavior is preserved or replaced with an approved equivalent.
- Long emails and names do not break the layout.
- Mobile view remains usable without relying only on horizontal table scrolling.
