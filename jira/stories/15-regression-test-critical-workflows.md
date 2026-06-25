# Story 15: Regression Test Critical Refreshed Workflows

## Value Statement

As a StatusUI team member, I want regression coverage for the refreshed UI so that existing production workflows continue to work after deployment.

## Details For Developers

Add automated tests where the project supports them, and create manual regression scripts for workflows that cannot be automated yet. Cover authenticated navigation, Projects search/filter/detail, Users list/detail/create/edit, Groups list/create/edit, Jobs list/detail, Maintenance display, account menu, and responsive behavior.

## Acceptance Criteria

- Critical workflow test list is documented.
- Automated tests are added for supported flows.
- Manual regression script is provided for unsupported flows.
- Desktop and mobile viewport checks are included.
- Tests verify that production-required fields remain visible.
- Known gaps are documented before release.
