# StatusUI UI Refresh Jira Package

This folder contains Jira-ready work items for implementing the accepted StatusUI UI refresh mockup.

## Source Inputs

- Accepted mockup source: `statusui_nextjs/nextjs_space/app/components/status-app.tsx`
- Mockup styling reference: `statusui_nextjs/nextjs_space/app/globals.css`
- Production reference reviewed: `https://strongtiesoftware.com/statusui`
- Strong-Tie Design System guide: `https://design.strongtie.io/llm-guide.md`
- Workflow used: `image-to-static-mockup-to-jira-workflow.md`

## Files

- `epic.md` - Epic description for Jira.
- `stories/` - Ordered Jira-ready implementation stories.
- `pm-review-questions.md` - Product/PM questions to resolve before or during refinement.
- `work-items.csv` - Copy/import-friendly summary of the epic and stories.
- `evaluation.md` - Review of implementation risks, dependencies, and suggested release sequencing.

## Backlog Assumptions

- The visual direction of the mockup is approved.
- Work should replace refreshed screens' Bootstrap-style UI patterns with the appropriate Strong-Tie Design System UI libraries, CSS, tokens, and component conventions documented on `design.strongtie.io`.
- The Jira package does not assume a Vite, Next.js, React Router, or broader application framework migration.
- Work should modernize the existing StatusUI experience rather than rewrite unrelated backend systems.
- Production data fields and current URLs should remain supported unless explicitly changed by product.
- Mock-only features, especially notes and column personalization, need product confirmation before full persistence work.
