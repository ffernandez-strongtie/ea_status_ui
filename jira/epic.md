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

## Scope

In scope:

- Application shell, navigation, account menu, and responsive layout.
- Projects/transmissions list, filters, status display, details view, and workflow visualization.
- User list, user detail, user create/edit, group assignment UI, and password reset entry point.
- Group list, group create/edit, admin/member assignment UI, and delete/remove confirmation behavior.
- Maintenance and jobs pages aligned with production fields.
- Shared table, filtering, action, badge/status, dialog/sheet, and form components.
- Accessibility, responsive, and regression validation.

## Success Metrics

- Existing production workflows remain reachable and complete successfully after the UI update.
- Users can find and open a transmission from Projects with no more interactions than production.
- Projects, Users, Groups, Jobs, and Maintenance pages remain usable at desktop, tablet, and mobile widths.
- Keyboard users can navigate primary menus, filters, dialogs, table actions, and forms.
- Critical workflows are covered by automated or documented regression tests.
- Stakeholders approve the refreshed UI against the accepted mockup and production workflow baseline.

## References

- Hosted mockup: `https://ffernandez-strongtie.github.io/ea_status_ui/login.html`
- GitHub repository: `https://github.com/ffernandez-strongtie/ea_status_ui`
- Local mockup: `statusui_nextjs/nextjs_space`
- Primary mockup component: `statusui_nextjs/nextjs_space/app/components/status-app.tsx`
- Static mockup implementation: `Uploads/statusui`
- Production app: `https://strongtiesoftware.com/statusui`

## Mockup Review Instructions

Use the hosted GitHub Pages mockup to review the accepted UI direction before or during story refinement:

1. Open `https://ffernandez-strongtie.github.io/ea_status_ui/login.html`.
2. Choose one of the three demo access levels: `User`, `Admin`, or `Internal Admin`.
3. The mockup stores the selected role in browser local storage. Use the account menu in the lower-left sidebar and select `Logout` to return to the role picker.
4. Direct navigation to a page outside the selected role shows an `Access Restricted` page. This is intentional and demonstrates role-based visibility; it is not a production authentication design.

Role-specific review paths:

- `User`: review `Transmissions`, open a transmission detail from the table, and review `My Account`. This role demonstrates the engineering/customer-facing review surface without admin navigation.
- `Admin`: review `Transmissions`, `Users`, `Groups`, user details, user edit/create form, group edit/create form, and `My Account`. This role demonstrates customer/group administration without internal-only operational pages.
- `Internal Admin`: review the full mockup, including `Transmissions`, `Users`, `Groups`, `Maintenance`, `Jobs`, and `My Account`.

Important review notes:

- The mockup is static and intentionally uses fake role selection instead of real authentication.
- The mockup demonstrates navigation, layout, role visibility, form structure, table treatment, status presentation, and responsive behavior.
- The production implementation should preserve existing authentication, authorization, routes, server-side behavior, and data contracts unless a story or product decision explicitly changes them.
