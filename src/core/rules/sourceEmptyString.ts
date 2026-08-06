import type { LocalizationFile } from '../models/localization'
import type { QaFinding } from '../models/qa'

export const sourceEmptyStringRuleId = 'source-empty-string'

export function findEmptySourceStrings(file: LocalizationFile): QaFinding[] {
  return Object.entries(file)
    .filter(([, text]) => text.trim().length === 0)
    .map(([stringId]) => ({
      ruleId: sourceEmptyStringRuleId,
      severity: 'error',
      stringId,
      message: 'Source string is empty.',
    }))
}
