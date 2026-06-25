# Story 02: Establish Strong-Tie Design System UI Foundation

## Value Statement

As a StatusUI developer, I want the refreshed StatusUI screens to use the appropriate Strong-Tie Design System UI libraries, CSS, tokens, and component patterns so that the implementation matches the approved mockup and company design standards without requiring an application framework rewrite.

## Details For Developers

For the refreshed screens, replace Bootstrap-oriented UI styling and interaction patterns with the appropriate Strong-Tie Design System assets and conventions documented at `https://design.strongtie.io/llm-guide.md` and related `design.strongtie.io` pages.

This story is about the UI foundation only. It does not require migrating the production app to Vite, Next.js, React Router, or any other application framework unless that is separately approved. Keep the current production architecture and routing approach unless another story or technical decision explicitly changes it.

Use the design system guidance to identify the correct production-compatible choices for:

- Design tokens, spacing, typography, colors, border radius, focus states, and shadows.
- CSS utility approach and generated/approved CSS assets.
- Button, input, select, checkbox, date, badge/status, table, dialog/sheet, tooltip, pagination, and navigation patterns.
- Icon usage and accessible icon-button conventions.
- Loading, error, empty, and validation states.
- Form labels, validation messaging, and field grouping.
- Responsive behavior for tables, panels, navigation, filters, and admin forms.

Build or adopt shared components for:

- App shell, sidebar/topbar, account menu, and environment/version display.
- Page header and page-level action area.
- Toolbar and search/filter controls.
- Data table, sortable header, action cell, pagination, and responsive table/card treatment.
- Button variants, icon buttons, status badges/lights, priority pills, and workflow stepper.
- Dialog/sheet/drawer patterns for filters, confirmations, notes, and add/remove user flows.
- Form field wrappers, labels, validation messages, select controls, date controls, and empty/loading/error states.

Treat design-system primitives as shared building blocks, not page-specific components. Page-specific composition should live outside primitives.

## Acceptance Criteria

- Bootstrap-specific component patterns used by refreshed screens are inventoried and mapped to Strong-Tie Design System replacements.
- The refreshed screens use the appropriate Strong-Tie Design System CSS, tokens, component classes, and/or approved UI libraries from `design.strongtie.io`.
- Shared component contracts are documented for shell, navigation, page headers, buttons, tables, filters, badges, dialogs/sheets, forms, and pagination.
- Shared components fit the existing production app architecture and do not require a framework migration.
- Shared components include required loading, error, empty, disabled, and validation states where applicable.
- Accessibility requirements from the design guide are built into the components: labeled inputs, visible focus states, keyboard-accessible controls, icon button accessible names, meaningful image alt text, and non-color-only status indicators.
- The refreshed screens do not fall back to Bootstrap visual styling or Bootstrap interaction patterns where Strong-Tie Design System equivalents are available.
