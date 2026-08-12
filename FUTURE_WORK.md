# Future Work Notes

This file records ideas that may be valuable later but are intentionally outside
the current milestone. An item is not a commitment to build the feature; it is a
place to capture the idea, discuss feasibility, and decide its priority later.

## How to add an idea

Include `*futurework` in a prompt when you want Codex to consider adding a note
to this file. We will first discuss the idea and its feasibility, then record a
short note only if it is genuinely useful for the project.

Each note should explain:

- the proposed capability;
- why it could be useful;
- important design questions or risks;
- possible prerequisites.

## Ideas

### Editable findings and corrected JSON export

**Status:** Idea

Allow users to review QA findings in the app, edit or accept safe suggested
fixes, and export a corrected JSON file.

**Why it could be useful:** This would turn the checker into an assisted QA
workflow rather than a read-only reporting tool. It would also demonstrate
state management, user review, and browser file generation.

**Design questions and risks:**

- The app must never change the uploaded file silently.
- Users should review changes before exporting.
- Safe automatic fixes, such as removing edge whitespace, should be separated
  from judgment-based changes such as spelling or translation edits.
- We should decide whether exported JSON must preserve the original formatting
  and key order.

**Possible prerequisites:** A structured edit model for findings, an editable
results interface, change tracking, and an export/download step.
