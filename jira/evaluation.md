# Backlog Evaluation

## Summary

The backlog is ready for refinement as a UI refresh implementation package. It intentionally avoids broad platform improvements from `statusui_improvements.md` and focuses on the accepted mockup direction plus production workflow compatibility.

## Highest-Risk Decisions

- Projects layout: the mockup changes the production flat table into a grouped project browser. This is the largest product decision.
- Notes: the mockup includes notes, but production review did not confirm an existing notes model.
- Table controls: sorting, sticky columns, visibility, and reordering need compatibility with server-side paging/sorting.
- UI foundation: production appears server-rendered Bootstrap/Razor, but the requested target is to use the appropriate Strong-Tie Design System UI libraries, CSS, tokens, and component conventions documented on `design.strongtie.io`. This should be planned as a UI-layer replacement for refreshed screens, not an assumed framework migration.

## Recommended Sequencing

1. Complete Story 01 and PM questions before coding.
2. Establish the Strong-Tie Design System UI foundation and map Bootstrap-style UI patterns to production-compatible design-system replacements.
3. Refresh Projects and filters, because this is the primary workflow.
4. Refresh Users and Groups, preserving production field compatibility.
5. Refresh Jobs, Maintenance, and detail pages.
6. Add notes only after product confirms scope and persistence rules.
7. Complete accessibility hardening and regression coverage before release.

## Suggested Release Slices

### Slice 1: Shell And Read-Only Views

- App shell/navigation.
- Projects list read-only refresh.
- Users/Groups/Jobs/Maintenance list refresh.
- Detail page refreshes.

### Slice 2: Filters And Table Ergonomics

- Project filters panel.
- Sorting, pagination compatibility, responsive table treatment.
- Column visibility if approved.

### Slice 3: Admin Forms

- User create/edit.
- Group create/edit and membership assignment.
- Delete/remove confirmations.

### Slice 4: Optional Collaboration

- Transmission notes only if approved.

## Test Emphasis

- Verify production-required fields remain visible.
- Verify current role/permission behavior remains unchanged.
- Verify form submissions still use existing validation and anti-forgery behavior.
- Verify mobile layout does not require unusable horizontal scrolling for primary workflows.
- Verify keyboard access for menus, filters, dialogs, and table actions.
