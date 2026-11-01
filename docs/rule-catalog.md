# Rule Catalog

This document defines the initial QA rules planned for the Localization QA
Checker. It is both a product specification and an implementation reference;
the status table below distinguishes documented rules from rules currently
available in the application.

Each rule has:

* a unique rule ID
* a category
* an analysis mode
* a default severity
* a defined input and output
* examples of valid and invalid content
* documented limitations

The rule catalog may be refined as the application is implemented and tested.

## Implementation status

| Rule | Status |
| --- | --- |
| `source-empty-string` | Implemented |
| `source-leading-trailing-whitespace` | Implemented |
| `source-repeated-whitespace` | Implemented |
| `source-unexpected-line-break` | Planned |
| `source-inconsistent-ellipsis` | Implemented |
| `source-us-english-spelling` | Planned |
| `target-missing-entry` | Planned |
| `target-extra-entry` | Planned |
| `target-empty-string` | Planned |
| `target-identical-to-source` | Planned |
| `localization-placeholder-mismatch` | Planned |
| `localization-variable-mismatch` | Planned |
| `localization-token-mismatch` | Planned |

The application currently analyzes one English source file. The bilingual rules
will become available after paired English–German file analysis is implemented.

# Source-language rules

## Empty source string

* **Rule ID:** `source-empty-string`
* **Category:** Source content
* **Analysis mode:** English source file
* **Default severity:** Error
* **Purpose:** Identify source entries that do not contain any visible text.
* **Input required:** A valid English source entry containing a string ID and text value.
* **Finding produced:** One finding for each source entry whose text is empty or contains only whitespace.
* **Finding message:** `Source string is empty.`

### Valid example

```json
{
  "menu.play": "Play"
}
```

### Invalid examples

```json
{
  "menu.play": ""
}
```

```json
{
  "menu.play": "   "
}
```

* **Limitations:** This rule only checks whether the source text contains visible characters. It does not determine whether the text is meaningful, complete, or appropriate for the string ID.

## Leading or trailing whitespace

* **Rule ID:** `source-leading-trailing-whitespace`
* **Category:** Source formatting
* **Analysis mode:** English source file
* **Default severity:** Warning
* **Purpose:** Identify source strings containing unnecessary whitespace before the first visible character or after the last visible character.
* **Input required:** A valid English source entry containing non-empty text.
* **Finding produced:** One finding for each source entry containing leading or trailing spaces, tabs, or line breaks.
* **Finding message:** `Source string contains leading or trailing whitespace.`

### Valid example

```json
{
  "menu.play": "Play"
}
```

### Invalid examples

```json
{
  "menu.play": " Play"
}
```

```json
{
  "menu.play": "Play "
}
```

* **Limitations:** Some applications may intentionally use surrounding whitespace. The MVP does not provide an allowlist or rule configuration for these cases. Whitespace-only strings are handled by `source-empty-string`.

## Repeated whitespace

* **Rule ID:** `source-repeated-whitespace`
* **Category:** Source formatting
* **Analysis mode:** English source file
* **Default severity:** Warning
* **Purpose:** Identify source strings containing multiple consecutive spaces where a single space is likely intended.
* **Input required:** A valid English source entry containing non-empty text.
* **Finding produced:** One finding for each source entry containing two or more consecutive space characters.
* **Finding message:** `Source string contains repeated whitespace.`

### Valid example

```json
{
  "dialogue.welcome": "Welcome back, player."
}
```

### Invalid example

```json
{
  "dialogue.welcome": "Welcome  back, player."
}
```

* **Limitations:** Repeated spaces may occasionally be intentional for alignment or formatting. The MVP does not support allowlisting these cases. Tabs and line breaks are handled separately.

## Unexpected line break

* **Rule ID:** `source-unexpected-line-break`
* **Category:** Source formatting
* **Analysis mode:** English source file
* **Default severity:** Warning
* **Purpose:** Identify source strings containing line breaks that may have been inserted accidentally.
* **Input required:** A valid English source entry.
* **Finding produced:** One finding for each source entry containing a literal or escaped line break.
* **Finding message:** `Source string contains a line break.`

### Valid example

```json
{
  "dialogue.warning": "Your progress will be lost."
}
```

### Invalid example

```json
{
  "dialogue.warning": "Your progress\nwill be lost."
}
```

* **Limitations:** Line breaks may be intentional in dialogue, subtitles, tooltips, or interface layouts. The MVP reports their presence but cannot determine whether they are appropriate.

## Inconsistent ellipsis

* **Rule ID:** `source-inconsistent-ellipsis`
* **Category:** Source punctuation
* **Analysis mode:** English source file
* **Default severity:** Warning
* **Purpose:** Identify inconsistent use of three periods and the single ellipsis character.
* **Input required:** All valid entries in an English source file.
* **Finding produced:** A finding when both `...` and `…` are used within the same source file.
* **Finding message:** `Source file uses inconsistent ellipsis styles.`
* **Finding scope:** File-level. The finding includes counts and one representative string ID labeled as an example for each style, preferring entries that use only that style. If entries use both styles within the same value, it also reports the overlap count and one example. When no style-exclusive example exists, a mixed-style entry is used as the fallback.

If one entry contains both ellipsis styles, that entry is included in both style
groups because it uses both forms.

### Consistent example

```json
{
  "status.loading": "Loading...",
  "status.connecting": "Connecting..."
}
```

### Inconsistent example

```json
{
  "status.loading": "Loading...",
  "status.connecting": "Connecting…"
}
```

* **Limitations:** The rule detects inconsistency but does not decide which ellipsis style is correct. The preferred style may depend on the project style guide.

## US English spelling consistency

* **Rule ID:** `source-us-english-spelling`
* **Category:** Source language consistency
* **Analysis mode:** English source file
* **Default severity:** Warning
* **Purpose:** Identify selected British English spellings when the project uses US English.
* **Input required:** A valid English source entry containing non-empty text.
* **Finding produced:** One finding for each entry containing a recognized British English spelling from the configured term list.
* **Finding message:** `Possible British English spelling found: "{term}". Consider US English: "{replacement}".`

### Valid example

```json
{
  "settings.color": "Select a color."
}
```

### Invalid example

```json
{
  "settings.color": "Select a colour."
}
```

### Initial term examples

| British English | US English |
| --------------- | ---------- |
| colour          | color      |
| favourite       | favorite   |
| centre          | center     |
| organise        | organize   |
| behaviour       | behavior   |
| travelling      | traveling  |

* **Limitations:** This rule uses a limited, explicit term list and is not a complete spell checker. Some terms may be valid names, trademarks, quotations, or project-specific terminology. Case handling and word-boundary behavior will be defined during implementation.

# Bilingual localization rules

## Missing target entry

* **Rule ID:** `target-missing-entry`
* **Category:** File completeness
* **Analysis mode:** English and German files
* **Default severity:** Error
* **Purpose:** Identify string IDs that exist in the English source file but are absent from the German target file.
* **Input required:** Valid English and German localization files.
* **Finding produced:** One finding for each English string ID that has no matching German entry.
* **Finding message:** `German translation is missing for this string ID.`

### English source

```json
{
  "menu.play": "Play",
  "menu.settings": "Settings"
}
```

### Invalid German target

```json
{
  "menu.play": "Spielen"
}
```

In this example, `menu.settings` is missing from the German file.

* **Limitations:** IDs are compared exactly and are case-sensitive. The rule does not attempt to identify renamed or similar IDs.

## Extra target entry

* **Rule ID:** `target-extra-entry`
* **Category:** File completeness
* **Analysis mode:** English and German files
* **Default severity:** Warning
* **Purpose:** Identify string IDs that exist in the German target file but are absent from the English source file.
* **Input required:** Valid English and German localization files.
* **Finding produced:** One finding for each German string ID that has no matching English source entry.
* **Finding message:** `German file contains an entry that is not present in the English source file.`

### English source

```json
{
  "menu.play": "Play"
}
```

### Invalid German target

```json
{
  "menu.play": "Spielen",
  "menu.settings": "Einstellungen"
}
```

In this example, `menu.settings` exists only in the German file.

* **Limitations:** An extra entry may be obsolete, may have been added early, or may be intentionally target-specific. The rule reports the structural difference but cannot determine its cause.

## Empty target string

* **Rule ID:** `target-empty-string`
* **Category:** Translation completeness
* **Analysis mode:** English and German files
* **Default severity:** Error
* **Purpose:** Identify German entries that exist but do not contain any visible translated text.
* **Input required:** A German entry whose string ID also exists in the English source file.
* **Finding produced:** One finding for each German entry whose text is empty or contains only whitespace.
* **Finding message:** `German translation is empty.`

### Valid German entry

```json
{
  "menu.play": "Spielen"
}
```

### Invalid examples

```json
{
  "menu.play": ""
}
```

```json
{
  "menu.play": "   "
}
```

* **Limitations:** This rule only checks whether visible text exists. It does not determine whether the translation is correct or complete.

## Source and target text are identical

* **Rule ID:** `target-identical-to-source`
* **Category:** Translation completeness
* **Analysis mode:** English and German files
* **Default severity:** Warning
* **Purpose:** Identify entries where the German target text is exactly the same as the English source text.
* **Input required:** Matching English and German entries containing non-empty text.
* **Finding produced:** One finding for each matching entry whose source and target values are identical.
* **Finding message:** `German translation is identical to the English source text.`

### Valid example

English:

```json
{
  "menu.settings": "Settings"
}
```

German:

```json
{
  "menu.settings": "Einstellungen"
}
```

### Potential issue

English:

```json
{
  "menu.settings": "Settings"
}
```

German:

```json
{
  "menu.settings": "Settings"
}
```

* **Limitations:** Identical text is not always an error. Names, acronyms, brands, technical terms, button labels such as `OK`, and words shared by both languages may remain unchanged. A future version may support an allowlist.

## Placeholder mismatch

* **Rule ID:** `localization-placeholder-mismatch`
* **Category:** Dynamic content
* **Analysis mode:** English and German files
* **Default severity:** Error
* **Purpose:** Identify missing, additional, duplicated, or changed positional and format placeholders in the German translation.
* **Input required:** Matching English and German entries.
* **Finding produced:** One finding when the set or number of supported placeholders differs between source and target.
* **Finding message:** `Placeholder mismatch between the English source and German translation.`

### Supported MVP placeholder examples

* `%s`
* `%d`
* `%1$s`
* `%2$d`
* `{0}`
* `{1}`

### Valid example

English:

```json
{
  "inventory.count": "You have %d items."
}
```

German:

```json
{
  "inventory.count": "Du hast %d Gegenstände."
}
```

### Invalid example

English:

```json
{
  "inventory.count": "You have %d items."
}
```

German:

```json
{
  "inventory.count": "Du hast %s Gegenstände."
}
```

* **Limitations:** The MVP will support a defined set of placeholder formats rather than every placeholder system. Escaped percentage characters and project-specific formatting syntax may require additional handling.

## Variable mismatch

* **Rule ID:** `localization-variable-mismatch`
* **Category:** Dynamic content
* **Analysis mode:** English and German files
* **Default severity:** Error
* **Purpose:** Identify named variables that are missing, added, renamed, or duplicated in the German translation.
* **Input required:** Matching English and German entries.
* **Finding produced:** One finding when the set or number of supported named variables differs between source and target.
* **Finding message:** `Variable mismatch between the English source and German translation.`

### Supported MVP variable examples

* `{playerName}`
* `{{playerName}}`
* `${playerName}`

### Valid example

English:

```json
{
  "dialogue.welcome": "Welcome, {playerName}!"
}
```

German:

```json
{
  "dialogue.welcome": "Willkommen, {playerName}!"
}
```

### Invalid example

English:

```json
{
  "dialogue.welcome": "Welcome, {playerName}!"
}
```

German:

```json
{
  "dialogue.welcome": "Willkommen, {username}!"
}
```

* **Limitations:** Different projects use different variable syntaxes. The exact supported syntax will be defined and tested during implementation. The rule checks variable integrity, not whether the variable is positioned correctly for German grammar.

## Token mismatch

* **Rule ID:** `localization-token-mismatch`
* **Category:** Protected content
* **Analysis mode:** English and German files
* **Default severity:** Error
* **Purpose:** Identify protected tokens, markup, or control sequences that are missing, added, or changed in the German translation.
* **Input required:** Matching English and German entries.
* **Finding produced:** One finding when the set or number of supported tokens differs between source and target.
* **Finding message:** `Token mismatch between the English source and German translation.`

### Supported MVP token examples

* `<b>`
* `</b>`
* `<i>`
* `</i>`
* `<br>`
* `\n`
* `[ITEM_ICON]`

### Valid example

English:

```json
{
  "tutorial.pickup": "Press <b>E</b> to collect [ITEM_ICON]."
}
```

German:

```json
{
  "tutorial.pickup": "Drücke <b>E</b>, um [ITEM_ICON] aufzuheben."
}
```

### Invalid example

English:

```json
{
  "tutorial.pickup": "Press <b>E</b> to collect [ITEM_ICON]."
}
```

German:

```json
{
  "tutorial.pickup": "Drücke E, um den Gegenstand aufzuheben."
}
```

* **Limitations:** Token formats vary considerably between applications and game engines. The MVP will support only explicitly defined token patterns. The rule will not validate whether HTML-like tags are correctly nested.

# Initial severity definitions

The MVP uses three severity levels:

* **Error:** A problem likely to cause missing content, runtime defects, broken formatting, or incorrect variable substitution.
* **Warning:** A possible quality or consistency problem that requires human review.
* **Information:** A low-risk observation that may help reviewers but does not necessarily require correction.

The initial rule catalog does not yet include information-level rules.
