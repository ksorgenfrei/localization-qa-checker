# Localization QA Checker

A browser-based tool for finding structural and text-quality issues in
localization JSON files. It is designed for localization QA work in games and
apps, including projects that are still English-only and projects preparing for
translation.

## Current status

The current version analyzes one flat English JSON file and reports:

- empty or whitespace-only source strings (`source-empty-string`);
- leading or trailing whitespace (`source-leading-trailing-whitespace`);
- repeated spaces (`source-repeated-whitespace`).

The parser and QA rules are kept separate from the React interface, and the
core logic has automated tests.

English–German comparison is planned but is not implemented yet. See the
[rule catalog](docs/rule-catalog.md) for the complete planned rule set and
implementation status.

## Run locally

This project uses Node.js 24. From the repository directory:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. To run the checks used before commits:

```bash
npm run test -- --run
npm run build
```

## Try the sample files

Sample inputs are in [`public/samples`](public/samples):

- `english-valid.json` demonstrates a clean file;
- `english-with-empty-strings.json` demonstrates error findings;
- `english-with-whitespace-issues.json` demonstrates edge-whitespace findings;
- `english-with-repeated-whitespace.json` demonstrates repeated-space findings;
- `english-invalid-value.json` demonstrates a structural validation error.

## Documentation

- [Project brief](docs/project-brief.md) — product rationale, scope, and goals
- [Architecture](docs/architecture.md) — current structure and planned design
- [Input format](docs/input-format.md) — supported JSON structure and planned bilingual format
- [Rule catalog](docs/rule-catalog.md) — detailed rule specifications and status
- [AI usage log](AI_USAGE.md) — how Codex was used and reviewed
- [Future work](FUTURE_WORK.md) — ideas intentionally outside the current milestone

## Development approach

The project is developed in small feature branches with focused tests,
pull-request review, and incremental documentation updates. The goal is to
demonstrate both practical software development and localization QA expertise.

This project is also a hands-on way for the author to become more familiar with
AI-assisted software development using tools such as Codex. AI is used to help
break work into manageable tasks, explain technical concepts, draft and review
implementation ideas, and suggest tests. The author remains responsible for
product decisions, code review, testing, and final changes. The collaboration
process is documented in the [AI usage log](AI_USAGE.md).
