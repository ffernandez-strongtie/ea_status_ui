# Epic: Modernize StatusUI Admin and Transmission Review Experience

## Value Statement

As an internal StatusUI administrator or engineering reviewer, I want a cleaner, task-focused interface for managing transmissions, users, groups, jobs, and account settings so that I can find records, understand review status, and take common actions with less scanning and fewer navigation interruptions.

## Background

The current production StatusUI application is a Bootstrap/Razor-style interface with top navigation, dense server-rendered tables, text action links, dropdown filter panels, and horizontal table overflow on smaller screens. The accepted mockup introduces a modern app shell, clearer navigation, card-based page structure, stronger transmission status visualization, improved filtering, table controls, and more ergonomic admin forms.

Production review confirmed that the implementation must preserve core existing workflows and data fields while modernizing the UI:

- Users, groups, maintenance, jobs, projects, account, and detail pages remain in scope.
- The Projects page currently shows a flat transmission table with date/status/customer/component filters.
- Transmission details include transaction, project, customer, seal, type, received date, component count, sender, status, and sequence information.
- User and group management are administrative workflows with existing edit/detail/delete and membership assignment behavior.

## Goals

- Implement the accepted StatusUI visual direction in the production application.
- Preserve current production routes, permissions, data, and server-side behavior unless explicitly changed.
- Improve navigation, table readability, filtering, and action clarity across desktop and mobile.
- Add modern status presentation for engineering transmission review stages.
- Improve accessibility and keyboard usability for tables, filters, dialogs, menus, and forms.
- Provide regression coverage for critical admin and transmission workflows.

## Non-Goals

- Replacing the authentication system.
- Redesigning backend data ownership or external integrations.
- Building broad analytics, reporting, notification, or real-time systems.
- Migrating to a new database or API platform solely for the UI refresh.
- Replacing production workflow semantics without product approval.

## Scope

In scope:

- Application shell, navigation, account menu, and responsive layout.
- Projects/transmissions list, filters, status display, details view, and workflow visualization.
- User list, user detail, user create/edit, group assignment UI, and password reset entry point.
- Group list, group create/edit, admin/member assignment UI, and delete/remove confirmation behavior.
- Maintenance and jobs pages aligned with production fields.
- Shared table, filtering, action, badge/status, dialog/sheet, and form components.
- Accessibility, responsive, and regression validation.

Out of scope unless separately approved:

- Full persistence for new notes/commenting behavior.
- Saved filter presets or saved column preferences.
- Bulk operations.
- New notification systems.
- New reporting dashboards.

## Success Metrics

- Existing production workflows remain reachable and complete successfully after the UI update.
- Users can find and open a transmission from Projects with no more interactions than production.
- Projects, Users, Groups, Jobs, and Maintenance pages remain usable at desktop, tablet, and mobile widths.
- Keyboard users can navigate primary menus, filters, dialogs, table actions, and forms.
- Critical workflows are covered by automated or documented regression tests.
- Stakeholders approve the refreshed UI against the accepted mockup and production workflow baseline.

## References

- Local mockup: `statusui_nextjs/nextjs_space`
- Primary mockup component: `statusui_nextjs/nextjs_space/app/components/status-app.tsx`
- Production app: `https://strongtiesoftware.com/statusui`
