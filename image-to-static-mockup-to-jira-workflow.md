# Image to Static Mockup to Jira Workflow

## Intent
Use this workflow when turning screenshots, requester notes, or rough product ideas into:

- A static HTML mockup for visual review.
- A hosted GitHub Pages preview.
- A concise epic.
- Atomic Jira-ready stories.
- PM review questions that expose missing product, data, migration, and workflow decisions.

The work should be interactive. Do not jump directly from screenshot to Jira stories. First understand the current state, create or update the mockup, let the user react to it, and only then move into work item definition.

## Conversation Starter
When this workflow is loaded in a fresh conversation, begin by asking:

> Send me the screenshot or image of the current state, any requester notes or business context, and what you are trying to accomplish. I’ll first review the current state and summarize what I understand. Then I’ll help create or update the static HTML mockup. We will not create epics or stories until you approve the mockup direction.

Lead the user through the workflow one phase at a time.

## Phase Gates
Do not move to the next phase until the user approves or clearly asks to proceed.

1. Understand the current state and goal.
2. Create or update the static mockup.
3. Review the mockup with the user and iterate.
4. Publish or prepare the mockup for sharing if requested.
5. Create the epic and stories.
6. Ask PM review questions.
7. Update stories based on answers.
8. Simplify and clean up the final backlog.

## Inputs To Request
Ask for only what is needed for the current phase.

- Screenshot or image of the current state.
- Requester notes, problem statement, or user story.
- Existing mockup files or repository path, if any.
- What the user is trying to accomplish.
- Target user/persona.
- Known constraints, especially legal, audit, operational, or migration constraints.
- Whether the user wants a new mockup page or changes to an existing one.
- Whether the user wants GitHub Pages publishing.
- GitHub repository URL or desired repository name, if publishing is requested.

## Initial Analysis
Before changing files or writing stories:

- Inspect the screenshot visually.
- Inspect existing HTML, CSS, and JavaScript if present.
- Compare the current app state against the requested change.
- Summarize what is changing in plain language.
- Separate current behavior, proposed mockup behavior, and implied product changes.
- Call out any data model, workflow, migration, or audit implications.
- Ask for confirmation if the product direction is ambiguous.

## Static Mockup Technical Standards
Unless the user says otherwise:

- Use static HTML files.
- Use Bootstrap for layout and common UI components.
- Bootstrap CDN links are acceptable.
- Keep local app code in static HTML, CSS, and JavaScript.
- Prefer inline JavaScript for small mockups.
- Use local `.js` files only when the mockup becomes large enough to justify it.
- Do not introduce npm, bundlers, frameworks, TypeScript, or a build system unless explicitly requested.
- Do not require a local server.
- Use relative paths for local page navigation and local assets.
- The mockup should work when opened from `index.html`.
- Scope JavaScript, for example with an IIFE, so variables do not leak globally.
- Use separate HTML pages for separate screens, flows, or alternate concepts.
- Preserve the visual language of the source application unless the user asks for a redesign.
- Keep exploratory mockups separate from accepted mockups until the user approves them.

## Mockup Interaction Standards
When building interactive samples:

- Implement just enough behavior to validate the workflow.
- Avoid overbuilding backend-like behavior in static JavaScript.
- Use realistic sample data.
- Keep controls close to the target application’s expected behavior.
- If the user says “simplify,” remove helper text, speculative UI, and extra controls.
- If a value is maintained elsewhere in the product, do not imply it can be created in the current view.
- Smoke test the page locally when possible.

## GitHub Publishing Workflow
When the user wants the mockup published:

1. Initialize a Git repository if one does not exist.
2. Create or confirm the GitHub repository.
3. Add the `origin` remote.
4. Commit the static mockup files.
5. Push to the default branch, usually `main`.
6. Configure GitHub Pages.
7. Add or verify a `.github/workflows/static.yml` workflow if needed.
8. Provide the GitHub Pages URL back to the user.
9. Add the hosted mockup URL as a reference in the epic, if an epic exists.

Do not force-push unless the user explicitly approves it.

If push is rejected because the remote has commits that local does not have:

- Inspect `git status`, `git remote -v`, `git branch -vv`, and recent logs.
- Fetch or merge/rebase safely.
- Preserve remote commits such as GitHub Pages workflow commits.
- Push only after local history includes the remote commits.

## GitHub Pages Workflow Template
Use this workflow when a simple static GitHub Pages deployment is needed:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

## Epic Creation Rules
Create the epic only after the user approves the mockup direction.

The epic should include:

- Title.
- Value statement using “As a...”.
- Background.
- Goals.
- Non-goals.
- Scope.
- Success metrics.
- References to hosted mockups or relevant local mockup files.

Do not include a story list inside the epic if Jira will manage epic/story relationships.

## Story Creation Rules
Stories should be pragmatic and Jira-ready.

Each story should include:

- Title.
- Value statement using “As a...”.
- Details for developers.
- Acceptance criteria.

Keep stories:

- Atomic.
- Small enough to complete in about a day when practical.
- Independently understandable.
- Sequenced by dependency.
- Clear about what is in scope and out of scope.

Avoid:

- Vague implementation terms when a concrete term is known.
- Padding.
- Speculative stories that do not affect implementation.
- Jumping into UI behavior before the page organization or data model is defined.
- Over-prescribing actual table/entity names when the real schema is unknown.

If table names, class names, or service names are unknown, say so and give developers high-level direction.

## Typical Story Sequence
Use this as a starting point, then adjust to the actual product:

1. Audit current data model and workflows.
2. Define target model or target workflow.
3. Define migration mapping if data changes are needed.
4. Add database/schema/query support if needed.
5. Migrate existing data if needed.
6. Define navigation or page organization.
7. Create or update pages.
8. Add interaction entry points.
9. Build dialogs or interaction flows.
10. Persist changes.
11. Add filtering/searching improvements.
12. Verify generated or downstream output.
13. Add regression coverage.

## PM Review Questions
After creating the initial epic and stories, review them through the requester’s eyes and the PM’s eyes.

Ask questions such as:

- What should be reusable vs copied?
- What must become immutable after use?
- What is association-only behavior?
- What should happen on delete?
- Should deletion be blocked if records are in use?
- What information should be shown when deletion is blocked?
- What makes two records duplicates during migration?
- What should remain separate even if records look similar?
- What should happen when no related records exist?
- Which fields are free text vs controlled values?
- Which fields are required vs optional?
- What is intentionally out of scope?
- What is the minimum demo that proves success?
- What would make the requester reject the result?

## Incorporating PM Answers
When the user answers PM review questions:

- Bake decisions directly into the relevant epic or stories.
- Remove unnecessary or speculative stories.
- Keep the backlog simple.
- Do not preserve stories only because they seem theoretically useful.
- Add legal, audit, or immutability constraints to the epic and verification stories.
- Add migration rules to migration stories.
- Add delete/blocking behavior to maintenance stories.
- Add UI empty states to interaction stories.
- Re-check that each story is still one-day-ish and atomic.

## Final Review Checklist
Before calling the backlog ready:

- The mockup direction has been approved.
- The epic does not contain an embedded story list if Jira will manage links.
- Hosted mockup links are included in the epic references.
- Stories cover every mockup-implied product change.
- Stories are ordered by dependency.
- Stories are small enough to be independently worked.
- Acceptance criteria are testable.
- Known legal/audit/immutability constraints are explicit.
- Migration/consolidation rules are explicit if data changes are involved.
- Delete behavior is explicit if reusable records are involved.
- Out-of-scope items are explicitly excluded.
- The backlog has been simplified after PM review.

## Required LLM Behavior
When using this workflow, the LLM should:

- Lead the user through the process.
- Ask for the image and goal first.
- Summarize understanding before implementation.
- Build the mockup before creating Jira items.
- Wait for user feedback on the mockup.
- Iterate visually before switching to work item definition.
- Be pragmatic and concise.
- Challenge unclear sequencing or overbroad stories.
- Remove unnecessary stories when the user says to keep it simple.
- Provide concrete file paths and hosted URLs when artifacts are created.
