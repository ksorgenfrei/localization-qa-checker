import type { LocalizationFile } from '../models/localization'
import type { QaFinding } from '../models/qa'

export const sourceRepeatedWhitespaceRuleId = 'source-repeated-whitespace'

export function findRepeatedWhitespace(file: LocalizationFile): QaFinding[] {
  return Object.entries(file)
    // Whitespace-only values belong to the empty-string rule.
    .filter(([, text]) => text.trim().length > 0 && / {2,}/.test(text))
    .map(([stringId]) => ({
      ruleId: sourceRepeatedWhitespaceRuleId,
      severity: 'warning',
      stringId,
      message: 'Source string contains repeated whitespace.',
    }))
}
