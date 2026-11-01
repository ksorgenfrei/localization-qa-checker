import { describe, expect, it } from 'vitest'
import { findEmptySourceStrings } from './sourceEmptyString'

describe('findEmptySourceStrings', () => {
  it('reports empty and whitespace-only source strings', () => {
    const findings = findEmptySourceStrings({
      'menu.play': '',
      'menu.settings': '   ',
      'menu.quit': 'Quit',
    })

    expect(findings).toEqual([
      {
        ruleId: 'source-empty-string',
        severity: 'error',
        scope: 'entry',
        stringId: 'menu.play',
        message: 'Source string is empty.',
      },
      {
        ruleId: 'source-empty-string',
        severity: 'error',
        scope: 'entry',
        stringId: 'menu.settings',
        message: 'Source string is empty.',
      },
    ])
  })

  it('does not report non-empty source strings', () => {
    expect(findEmptySourceStrings({ 'menu.play': 'Play' })).toEqual([])
  })
})
