# Story 05: Build Project Filters Panel

## Value Statement

As an engineering reviewer, I want transmission filters organized in a focused panel so that I can narrow results without the current dense dropdown layout.

## Details For Developers

Implement the filter experience from the mockup while preserving production filter fields: start, end, sender, seal/state, transaction id, customer, status, number of components, type, sequence number, and modified components.

## Acceptance Criteria

- All production Project filter fields are represented.
- Date inputs use accessible labels and predictable formatting.
- Multi-value fields such as seal/state and status preserve existing search semantics.
- Clear resets all filters to production-equivalent defaults.
- Apply closes the panel and updates the result set.
- Filter state is visible enough that users know when results are filtered.
- Filter controls are usable on mobile without horizontal overflow.
