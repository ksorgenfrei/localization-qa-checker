Localization QA Checker

Problem

Localization teams often receive large files containing hundreds or thousands of strings. Manually detecting structural inconsistencies, missing translations, mismatched variables and style problems is slow and error-prone.


Proposed solution

A browser-based QA checker that analyses:

1. an English source JSON file or
2. paired English and German JSON files.

It returns structured, explainable QA findings.


Intended users

Localization QA testers, translators, localization project managers, game-development teams,
developers maintaining localized products.


Initial project goals

- parse a defined JSON localization format
- validate source-language strings
- compare English and German entries by string ID
- run independent QA rules
- display actionable findings
- provide automated tests for the rule engine
- document architectural and implementation decisions


Non-goals for the MVP

These are defined to control scope.

- machine translation
- AI-generated translations
- support for every localization file format
- full grammar or spell checking
- user accounts
- cloud storage
- team collaboration
- server-side processing


Success criteria

A user should be able to:

- load a valid English JSON file
- receive understandable source-language findings (e.g. regarding UK or US English consistency)
- load matching English and German files
- receive localization findings by string ID
- filter and inspect findings
- understand which rule produced each finding
- use sample files to evaluate the application without preparing their own data