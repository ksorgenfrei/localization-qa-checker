export type Severity = 'error' | 'warning' | 'information'

export interface QaFinding {
  ruleId: string
  severity: Severity
  stringId: string
  message: string
}
