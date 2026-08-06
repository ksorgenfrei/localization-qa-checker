import type { LocalizationFile } from '../models/localization'

export type ParseResult =
  | { success: true; file: LocalizationFile }
  | { success: false; message: string }

/**
 * Parses the deliberately small JSON format supported by the MVP: one object
 * whose values are all strings.
 */
export function parseLocalizationJson(content: string): ParseResult {
  let parsed: unknown

  try {
    parsed = JSON.parse(content)
  } catch {
    return { success: false, message: 'The file does not contain valid JSON.' }
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {
      success: false,
      message: 'The top-level JSON value must be an object of string IDs and text values.',
    }
  }

  for (const [stringId, value] of Object.entries(parsed)) {
    if (typeof value !== 'string') {
      return {
        success: false,
        message: `The value for "${stringId}" must be a string.`,
      }
    }
  }

  return { success: true, file: parsed as LocalizationFile }
}
