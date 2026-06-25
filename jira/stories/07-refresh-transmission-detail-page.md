# Story 07: Refresh Transmission Detail Page

## Value Statement

As an engineering reviewer, I want a clearer transmission detail page so that I can verify all important submission data and understand where the transmission is in the review workflow.

## Details For Developers

Refresh the production transmission detail page using the accepted mockup direction. Preserve production fields: transaction id, project name, customer, seals, type/repair, received date, number of components, sent by, status, and sequence number.

## Acceptance Criteria

- Detail page is reachable from each Projects row.
- All production detail fields are displayed.
- Workflow status visualization is displayed without replacing required text fields.
- Back navigation returns users to the previous Projects result context when feasible.
- Long sequence ranges and project names wrap cleanly.
- Page is usable on mobile without clipped critical information.
