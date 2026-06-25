# Story 03: Modernize App Shell And Navigation

## Value Statement

As a StatusUI user, I want a clear app shell with persistent navigation so that I can move between Projects, Users, Groups, Maintenance, Jobs, and My Account without relying on dense top-level menus.

## Details For Developers

Replace the current production top-navbar/admin-dropdown navigation with the cleaner application shell direction shown in the mockup, using the approved Strong-Tie Design System UI/CSS patterns.

Reference the accepted static mockup for the shell layout, sidebar collapse behavior, mobile menu behavior, active navigation states, account menu structure, icon treatment, and responsive CSS. The production implementation may copy or adapt the mockup's shell/navigation component structure and styles from `Uploads/statusui/src/App.jsx` and `Uploads/statusui/assets/css/super-admin.css` as long as production routes, authentication, authorization, logout behavior, and framework boundaries are preserved.

The shell should keep all existing production destinations reachable:

- Projects: current production `/statusui/Projects`
- Users: current production `/statusui/Admin/Users`
- Groups: current production `/statusui/Admin/Groups`
- Maintenance: current production `/statusui/Admin/Maintenance`
- Jobs: current production `/statusui/Admin/Jobs`
- My Account: current production `/statusui/Identity/Account/Manage`
- Logout: current production logout behavior/form submission

Desktop behavior:

- Use a persistent left-side navigation rail/sidebar like the mockup.
- Show the Simpson Strong-Tie logo and `Engineering Status Service` brand.
- Show primary nav items with icons and labels.
- Provide a sidebar collapse control that leaves icon-only navigation visible.
- Preserve active route indication for the current section.
- Keep the current user/account menu available near the bottom or a consistent shell location.
- Keep environment/version visible, using production values such as `Production (v0.26.3.3)` or the current deployed equivalent.

Mobile/tablet behavior:

- Replace the left sidebar with a compact header and menu trigger.
- Keep the logo/brand visible without crowding the header.
- Opening the menu should expose the same navigation destinations and account menu actions.
- Closing the menu should be possible by selecting a nav item, pressing Escape where supported, or activating the close/menu control.

Account menu behavior:

- Display the current user's role/context, for example `SuperAdmin`, when available.
- Include `My Account`.
- Include `Logout`.
- Do not change authentication, authorization, or logout semantics in this story.

## Acceptance Criteria

- The production top navbar/admin dropdown is replaced on refreshed screens by the new shell/navigation treatment.
- Implementation references the accepted mockup shell/navigation behavior and documents any copied or adapted component/style code.
- Navigation includes Projects, Users, Groups, Maintenance, Jobs, My Account, and Logout.
- Each nav item routes to the same production destination or an approved refreshed equivalent.
- Current user role/account context remains visible.
- The active page is visually indicated and exposes `aria-current="page"` or an equivalent semantic state.
- Desktop sidebar can be expanded and collapsed without losing navigation access.
- Collapsed desktop navigation uses icon-only buttons/links with accessible names.
- Mobile navigation opens and closes predictably and does not permanently cover page content.
- The header/sidebar does not cause horizontal page overflow at common widths: 1440px, 1024px, 768px, and 390px.
- Navigation works by mouse, keyboard, and touch.
- Focus states are visible for nav links, menu controls, and account menu items.
- Logout behavior remains unchanged from production.
- Environment/version display remains available in the shell or footer.
