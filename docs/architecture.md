# Application Structure

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

The React interface will:

- allow the user to select English and German JSON files
- display file-validation errors
- start the analysis
- display a summary of the results
- display individual QA findings
- eventually allow the user to filter and inspect findings

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

When the user selects both English and German JSON files, the application reads and validates each file. It matches entries using their string IDs, compares the source and target text, and runs the localization rules. React then displays the findings.

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

## First working feature

The first implementation will create one complete path through the application.

The user will be able to:

1. select one English JSON file
2. have the file read as text
3. have the JSON parsed and structurally validated
4. receive a clear message if the file is invalid
5. have valid entries checked for empty source strings
6. see any resulting QA findings in the interface

The first working feature will support only:

- one English source file
- the flat JSON format defined in `input-format.md`
- the `source-empty-string` rule
- a basic results display

It will not yet include:

- German target files
- additional QA rules
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