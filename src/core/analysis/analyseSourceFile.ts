import type { LocalizationFile } from '../models/localization'
import type { QaFinding } from '../models/qa'
import { findEmptySourceStrings } from '../rules/sourceEmptyString'

export function analyseSourceFile(file: LocalizationFile): QaFinding[] {
  return findEmptySourceStrings(file)
}
