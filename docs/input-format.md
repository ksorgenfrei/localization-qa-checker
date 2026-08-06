# Input Format

## Valid input

The application accepts localization files that meet the following requirements:

- The file contains valid JSON.
- The top-level value is an object.
- Each property name is a string ID.
- Each property value is the displayed text.
- Source and target files use matching string IDs.
- Nested objects, arrays, numbers, booleans, and `null` values are not supported.
- String IDs are case-sensitive.
- Source and target files are uploaded separately.

### English example

```json
{
  "menu.play": "Play",
  "menu.settings": "Settings",
  "dialogue.welcome": "Welcome, {playerName}!",
  "inventory.items": "You have %d items."
}
```

### German example

```json
{
  "menu.play": "Spielen",
  "menu.settings": "Einstellungen",
  "dialogue.welcome": "Willkommen, {playerName}!",
  "inventory.items": "Du hast %d Gegenstände."
}
```

## Invalid input

The application rejects a file when:

- The file does not contain valid JSON.
- The top-level value is not an object.
- Any property value is not a string.
- The file contains nested objects or arrays.

### Unsupported top-level array

```json
["Play", "Settings"]
```

### Unsupported nested object

```json
{
  "menu.play": {
    "text": "Play"
  }
}
```

### Unsupported non-string value

```json
{
  "menu.play": 123
}
```

## Structurally valid content with QA issues

Some values are structurally valid and can be parsed, but may still produce QA findings.

For example, an empty string is accepted by the file parser:

```json
{
  "menu.play": ""
}
```

The QA rule engine may then report an empty-string issue.

Similarly, the following value is structurally valid but may produce a whitespace issue:

```json
{
  "menu.play": " Play "
}
```

The parser determines whether a file can be analysed. The QA rule engine determines whether the accepted content contains quality problems.

## Matching source and target entries

English and German entries are matched using their exact string IDs.

String IDs are case-sensitive. Therefore, the following IDs do not match:

- `menu.settings`
- `menu.Settings`

During bilingual analysis, string IDs are classified as:

- Present in both files.
- Present only in the English source file.
- Present only in the German target file.
