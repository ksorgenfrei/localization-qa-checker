import type { LocalizationFile } from '../models/localization'
import type { QaFinding } from '../models/qa'

export const sourceLeadingTrailingWhitespaceRuleId =
  'source-leading-trailing-whitespace'

export function findLeadingTrailingWhitespace(
  file: LocalizationFile,
): QaFinding[] {
  return Object.entries(file)
    // Whitespace-only values belong to the empty-string rule.
    .filter(([, text]) => text.trim().length > 0 && /^\s|\s$/.test(text))
    .map(([stringId]) => ({
      ruleId: sourceLeadingTrailingWhitespaceRuleId,
      severity: 'warning',
      scope: 'entry' as const,
      stringId,
      message: 'Source string contains leading or trailing whitespace.',
    }))
}
