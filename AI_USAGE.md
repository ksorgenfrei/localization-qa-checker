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
- Every implementation cycle includes updating the relevant project
  documentation and sample data so the written project state stays aligned
  with the code.
- AI-generated code and documentation are tested and reviewed before being
  committed.

## Collaboration log

### 2026-08-05 — Project orientation and MVP planning

- Codex reviewed the existing project brief, input-format specification,
  architecture notes, and QA-rule catalog.
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

### 2026-08-12 — Leading/trailing whitespace rule

- We started a separate feature branch for the next small QA rule so `main`
  remains stable while the work is developed.
- Codex added a warning rule for leading or trailing spaces, tabs, and line
  breaks around visible source text.
- Whitespace-only values remain the responsibility of the existing error-level
  empty-string rule, avoiding duplicate findings for the same issue.
- The rule has focused automated tests and a sample JSON file for manual use.

### 2026-08-12 — Future-work tracking

- The author requested a separate notes file for ideas that should be discussed
  without expanding the current milestone.
- `FUTURE_WORK.md` was added with a proposed editable-findings and corrected
  JSON-export feature.
- We agreed to use `*futurework` in future prompts when an idea should be
  considered for addition to that file after feasibility discussion.

### 2026-11-01 — Repeated-whitespace rule

- The author returned to the project and created a separate feature branch for
  the next source-language QA rule.
- Codex added `source-repeated-whitespace`, a warning for two or more
  consecutive ordinary spaces in visible source text.
- The rule excludes whitespace-only values so the existing empty-string rule
  remains the single finding for that case.
- During review, the author noticed that the rule catalog could be mistaken
  for a list of already implemented features. The catalog was updated with
  an explicit implementation-status table distinguishing implemented and
  planned rules.

### 2026-11-01 — Documentation cleanup

- The author noticed duplication and ambiguity between the project brief,
  architecture notes, input-format specification, and rule catalog.
- Codex added a portfolio-facing README and clarified current versus planned
  behavior in the architecture and input-format documents.
- The detailed rule catalog, AI usage log, and future-work notes remain
  separate because they serve different purposes.

### 2026-11-01 — Inconsistent-ellipsis rule

- The author requested a file-level rule that reports mixed use of `...` and
  `…` without producing one finding for every affected entry.
- Codex extended the QA finding model with `entry` and `file` scopes, updated
  existing findings, and added the ellipsis rule with counts and representative
  string IDs.
- We refined the interface output so findings can include structured detail
  bullets instead of one long message string.
- We clarified the ellipsis details so each style labels its displayed string IDs
  as examples; the total count remains in the parent bullet without a redundant
  "more entries" child.
- We updated the upload instructions and sample-file note so the interface
  describes all currently implemented source-file checks.
- We added an analyzer integration test using one file with several different
  issues. Its purpose is to verify that the registered rules are actually run
  together by `analyseSourceFile`.
- We added a multi-issue JSON sample so the same combined analysis can be tested
  manually through the upload interface.
- We made finding colors depend on severity: errors use red, warnings use
  yellow/orange, and informational findings use blue.

## Notes for reviewers

AI was used as a collaborative development tool, not as an unreviewed code
generator. The project documentation and implementation choices are intended to
show both localization-domain reasoning and the author's growing development
practice.
