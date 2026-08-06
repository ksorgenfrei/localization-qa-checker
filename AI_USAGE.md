# AI Usage Log

This project is being built iteratively by its author with assistance from Codex.
The goal of this log is to make that collaboration transparent for reviewers and
to record the author's learning and decisions.

## Working approach

- The author defines the product goals, localization-QA requirements, and
  decisions about scope.
- Codex helps review documentation, break work into small implementation
  milestones, explain technical choices, draft code, and suggest tests.
- The author reviews the proposed work, asks questions, and decides what to
  keep, change, or publish.
- AI-generated code and documentation are tested and reviewed before being
  committed.

## Collaboration log

### 2026-08-05 — Project orientation and MVP planning

- Codex reviewed the existing project brief, input-format specification,
  architecture notes, and QA-rule catalogue.
- Codex proposed a deliberately small first vertical slice: validate one
  English JSON file, detect empty source strings, and show the findings in a
  simple React interface.
- Future entries will record important prompts, decisions, implementation
  changes, tests, and lessons learned.

### 2026-08-05 — Project foundation

- The author asked Codex to create the first implementation milestone and fix
  the Markdown formatting in the input-format document.
- Codex created a minimal React and TypeScript application using Vite, with a
  development server, production build command, and Vitest test command.
- The author-approved dependencies were installed and the production build was
  run successfully. The test runner was configured to pass while no tests exist;
  parser and QA-rule tests will be added with the next feature.

### 2026-08-05 — First QA feature

- The author asked to work in small learning-focused increments and requested
  sample English JSON files for the new feature.
- Codex implemented the first end-to-end path: upload one English JSON file,
  validate the supported format, run the `source-empty-string` rule, and show
  either a file-validation message or structured QA findings.
- Three samples were added: a valid file, a valid file with empty strings, and
  a structurally invalid file. Six automated parser and rule tests were added.
- Codex ran the tests and production build, then manually checked both the
  finding and no-finding paths in the local application.

## Notes for reviewers

AI was used as a collaborative development tool, not as an unreviewed code
generator. The project documentation and implementation choices are intended to
show both localization-domain reasoning and the author's growing development
practice.
