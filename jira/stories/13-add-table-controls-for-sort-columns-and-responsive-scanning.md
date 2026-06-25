# Story 13: Add Table Controls For Sorting, Columns, And Responsive Scanning

## Value Statement

As a frequent StatusUI user, I want table controls that help me scan and organize data so that large result sets are easier to work with.

## Details For Developers

Implement shared table behavior for sortable headers, sticky primary actions where appropriate, column visibility where approved, and responsive layouts. Confirm whether column order/visibility preferences should persist or reset per session.

## Acceptance Criteria

- Sortable columns expose semantic buttons or links with visible sort state.
- Sticky action/identifier behavior does not obscure data.
- Column visibility controls are keyboard accessible if included.
- Tables handle long values without layout breakage.
- Mobile behavior is intentionally designed and documented.
- Existing server-side sorting/pagination remains compatible.
