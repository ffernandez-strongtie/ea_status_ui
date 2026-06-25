# Story 04: Refresh Projects And Transmission List

## Value Statement

As an engineering reviewer, I want the Projects page to show transmissions in a cleaner, easier-to-scan layout so that I can quickly identify status, sender, customer, seal, and workload.

## Details For Developers

Refresh the production Projects page using the accepted `Transmitted Components` mockup direction while preserving the production transmission data and primary workflow.

Production currently renders a flat transmission table at `/statusui/Projects`. The refreshed screen should improve readability and action clarity without removing required production information.

Required production row fields:

- Details/Open action
- Transaction Id
- Name / Project Name
- Customer
- Seals / State
- Received
- # Sent / Num Components, depending on the production field naming available in this view
- Modified
- Sent By
- Status

Target UI behavior:

- Use the mockup's clearer page header and toolbar treatment.
- Rename the page consistently with the accepted mockup direction, for example `Transmitted Components`, if product approves the label.
- Keep the date range/context text visible near the page title, using production values.
- Replace plain text action links with clear action controls that still navigate to the production detail route, such as `/statusui/Projects/Details?transactionId={id}` or the approved refreshed equivalent.
- Render status with the refreshed status badge/light treatment while preserving readable status text.
- Improve scanability of long project names, customer names, and sender names through wrapping/truncation rules that do not hide critical information.
- Preserve result count and pagination/page size behavior, or replace it only with an approved equivalent.
- Use responsive behavior that avoids the current production issue where the table becomes difficult to use on narrow mobile screens.

Project grouping decision:

- The mockup shows a project list beside selected transmissions.
- If product approves this grouped layout, define the production grouping key before implementation, such as project/name or another authoritative field.
- If grouping is not approved, keep the production flat list and apply the refreshed table/action/status styling only.
- In either case, users must still be able to scan and open all returned transmissions from the active search/filter result set.

## Acceptance Criteria

- Projects page renders production transmission records with Details/Open action, transaction id, name/project name, customer, seals/state, received date, sent/components count, modified count, sent by, and status.
- Each row provides a clear Details/Open action that reaches the correct production transaction detail.
- Status is visually distinguishable and readable as text.
- Received dates, counts, and transaction ids remain aligned and readable.
- Long project names, customer names, and sender names wrap or truncate consistently without breaking row height in an unbounded way.
- Search/filter result context and date range remain visible near the top of the page.
- Existing production result count and pagination/page size behavior are preserved or replaced with an approved equivalent.
- If project grouping is implemented, the grouping key and behavior are documented in the story comments or implementation notes.
- If project grouping is implemented, selecting a project updates the visible transmissions without losing the user's active search/filter context.
- If project grouping is not implemented, the refreshed flat table still matches the accepted design language.
- Mobile/tablet views provide a usable scan-and-open experience without requiring users to understand clipped columns.
- The page uses Strong-Tie Design System UI/CSS patterns rather than Bootstrap visual styling for refreshed controls.
