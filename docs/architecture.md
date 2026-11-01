# Application Structure

## Current implementation and planned design

The current application supports one uploaded English source JSON file. It
parses the file, runs the implemented source-language rules, and displays the
findings in React.

The sections below also describe planned bilingual analysis and future UI
capabilities. Those parts are design direction, not claims that the current
application already supports them.

## Purpose

The application should keep the localization QA logic separate from the React interface.

React will handle user interaction and display results. The parsing and QA code will handle the actual analysis without depending on React.

This separation makes the QA logic easier to:

- understand
- test
- maintain
- reuse in a possible command-line version later

## Main parts of the application

### React interface

The React interface currently:

- allows the user to select one English JSON file;
- displays file-validation errors;
- starts the analysis;
- displays a summary of the results;
- displays individual QA findings.

Planned interface capabilities include:

- selecting paired English and German JSON files;
- filtering and inspecting findings in more detail.

The React components should not contain the implementation of individual QA rules.

### File reading

The file-reading code will:

- receive a file selected by the user
- read the file contents as text
- handle errors that occur while reading the file
- pass the text to the JSON parser

This part uses browser file APIs and is separate from the core QA logic.

### JSON parsing and validation

The parser will:

- parse the JSON text
- check that the top-level value is an object
- check that every property value is a string
- reject unsupported arrays, nested objects, numbers, booleans, and `null`
- convert valid content into the application's internal typed data format

The parser decides whether the file can be analyzed.

It does not decide whether the localization content is good or bad.

### Data models

TypeScript types will define the main data used by the application.

The initial models are expected to include:

- localization entry
- localization file
- QA finding
- QA rule
- severity
- analysis result

These types should not depend on React.

### QA rules

Each QA rule will perform one specific check.

A rule should:

- have a unique rule ID
- have a name and description
- have a default severity
- receive typed input
- return zero or more QA findings
- avoid changing its input
- be testable independently

Rules should return data rather than React elements or formatted interface content.

### Analysis

The analysis code will:

- select the rules that apply to the uploaded files
- run those rules
- collect the findings
- return a structured result to the interface

The analysis code runs the rules and collects their findings. Each rule contains its own checking logic.

## How the parts work together

### English source analysis

When the user selects an English JSON file, the browser reads the file and passes its contents to the parser. The parser checks that the file follows the supported format and converts it into data the application can use. The source-language rules then check the entries and return any findings, which React displays to the user.

### English–German analysis

When implemented, bilingual analysis will read and validate English and German
files, match entries using their string IDs, compare source and target text, and
run the localization rules. React will then display the findings.

## Initial source-code structure

The first version of the application may use this structure:

```text
src/
├── core/
│   ├── analysis/
│   ├── models/
│   ├── parsing/
│   └── rules/
├── features/
│   └── source-analysis/
├── components/
├── App.tsx
└── main.tsx
```

### `core/models`

Contains the TypeScript types used by the parser, rules, and analysis code.

### `core/parsing`

Contains the functions that parse and validate localization JSON.

### `core/rules`

Contains the individual source-language and bilingual QA rules.

### `core/analysis`

Contains the functions that run the appropriate rules and collect their findings.

### `features/source-analysis`

Contains React components and state used specifically for English source-file analysis.

### `components`

Contains reusable interface components that are not tied to one feature.

This structure will be adjusted as the project develops. The first version should avoid unnecessary folders or abstractions.

## First working feature (completed)

The first implementation created one complete path through the application.

The user will be able to:

1. select one English JSON file
2. have the file read as text
3. have the JSON parsed and structurally validated
4. receive a clear message if the file is invalid
5. have valid entries checked for empty source strings
6. see any resulting QA findings in the interface

The first working feature supports:

- one English source file
- the flat JSON format defined in `input-format.md`
- the `source-empty-string` rule;
- the `source-leading-trailing-whitespace` rule;
- the `source-repeated-whitespace` rule;
- a basic results display

The current application does not yet include:

- German target files
- the remaining additional QA rules
- filtering
- advanced styling
- result export
- user-configurable rules

## Testing the first feature

The first feature should include automated tests for the JSON parser and the empty-source-string QA rule.

### Parser tests

- valid localization JSON is accepted
- invalid JSON syntax is rejected
- unsupported value types are rejected

### QA rule tests

- empty strings produce a finding
- whitespace-only strings produce a finding
- non-empty strings do not produce a finding

Interface testing can be added after the parser and QA rule work correctly.

## Important design decisions

- Keep the QA logic separate from React.
- Handle file-reading errors, parsing errors, and QA findings separately.
- QA rules should return data that React can display.
- Keep the first version simple.
- New rules should be easy to add without changing the parser or React interface.
