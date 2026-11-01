import type { LocalizationFile } from '../models/localization'
import type { QaFinding } from '../models/qa'

export const sourceInconsistentEllipsisRuleId = 'source-inconsistent-ellipsis'

const MAX_EXAMPLES_PER_CASE = 1

export function findInconsistentEllipsis(file: LocalizationFile): QaFinding[] {
  const entriesUsingPeriods = Object.entries(file)
    .filter(([, text]) => text.includes('...'))
    .map(([stringId]) => stringId)
  const entriesUsingCharacter = Object.entries(file)
    .filter(([, text]) => text.includes('…'))
    .map(([stringId]) => stringId)
  const entriesUsingCharacterSet = new Set(entriesUsingCharacter)
  const entriesUsingBothStyles = entriesUsingPeriods.filter((stringId) =>
    entriesUsingCharacterSet.has(stringId),
  )
  const entriesUsingBothStylesSet = new Set(entriesUsingBothStyles)

  if (entriesUsingPeriods.length === 0 || entriesUsingCharacter.length === 0) {
    return []
  }

  const periodsExclusive = entriesUsingPeriods.filter(
    (stringId) => !entriesUsingBothStylesSet.has(stringId),
  )
  const characterExclusive = entriesUsingCharacter.filter(
    (stringId) => !entriesUsingBothStylesSet.has(stringId),
  )
  const periodsExamples = (periodsExclusive.length > 0 ? periodsExclusive : entriesUsingPeriods)
    .slice(0, MAX_EXAMPLES_PER_CASE)
  const characterExamples = (characterExclusive.length > 0
    ? characterExclusive
    : entriesUsingCharacter
  ).slice(0, MAX_EXAMPLES_PER_CASE)
  const bothStylesExamples = entriesUsingBothStyles.slice(0, MAX_EXAMPLES_PER_CASE)
  const buildDetail = (style: string, entryCount: number, exampleIds: string[]) => ({
    text: `${entryCount} ${entryCount === 1 ? 'entry uses' : 'entries use'} "${style}". Example:`,
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
      ...(entriesUsingBothStyles.length > 0
        ? [{
            text: `${entriesUsingBothStyles.length} ${entriesUsingBothStyles.length === 1 ? 'entry uses' : 'entries use'} both ellipsis styles. Example:`,
            children: bothStylesExamples,
          }]
        : []),
    ],
  }]
}
