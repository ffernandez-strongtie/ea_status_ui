# Story 06: Add Transmission Status Visualization

## Value Statement

As an engineering reviewer, I want transmission review status shown as a workflow stage so that I can understand progress faster than reading status text alone.

## Details For Developers

Implement status badges/lights and workflow visualization for known review states, including current production states such as `1st Review`, `2nd Review`, and `Ready for Pickup`. Confirm the full ordered status list with product before finalizing.

## Acceptance Criteria

- Known statuses map to consistent visual tones.
- Status text is always visible or available to assistive technology.
- Unknown statuses fall back to a neutral state without breaking layout.
- Workflow progress is shown on transmission detail pages.
- List/table status display remains compact enough for scanning.
