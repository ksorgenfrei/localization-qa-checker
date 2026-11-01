import type { LocalizationFile } from '../models/localization'
import type { QaFinding } from '../models/qa'

export const sourceInconsistentEllipsisRuleId = 'source-inconsistent-ellipsis'

const MAX_EXAMPLES_PER_STYLE = 3

export function findInconsistentEllipsis(file: LocalizationFile): QaFinding[] {
  const entriesUsingPeriods = Object.entries(file)
    .filter(([, text]) => text.includes('...'))
    .map(([stringId]) => stringId)
  const entriesUsingCharacter = Object.entries(file)
    .filter(([, text]) => text.includes('…'))
    .map(([stringId]) => stringId)

  if (entriesUsingPeriods.length === 0 || entriesUsingCharacter.length === 0) {
    return []
  }

  const periodsExamples = entriesUsingPeriods.slice(0, MAX_EXAMPLES_PER_STYLE)
  const characterExamples = entriesUsingCharacter.slice(0, MAX_EXAMPLES_PER_STYLE)
  const buildDetail = (style: string, entryCount: number, exampleIds: string[]) => ({
    text: `${entryCount} ${entryCount === 1 ? 'entry uses' : 'entries use'} "${style}". Examples:`,
    children: exampleIds,
  })

  return [{
    ruleId: sourceInconsistentEllipsisRuleId,
    severity: 'warning',
    scope: 'file',
    message: 'Source file uses inconsistent ellipsis styles.',
    details: [
      buildDetail('...', entriesUsingPeriods.length, periodsExamples),
      buildDetail('…', entriesUsingCharacter.length, characterExamples),
    ],
  }]
}
