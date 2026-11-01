export type Severity = 'error' | 'warning' | 'information'
export type FindingScope = 'entry' | 'file'

export interface FindingDetail {
  text: string
  children?: string[]
}

export interface QaFinding {
  ruleId: string
  severity: Severity
  scope: FindingScope
  stringId?: string
  message: string
  details?: FindingDetail[]
}
