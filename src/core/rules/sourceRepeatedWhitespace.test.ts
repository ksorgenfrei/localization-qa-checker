import { describe, expect, it } from 'vitest'
import { findRepeatedWhitespace } from './sourceRepeatedWhitespace'

describe('findRepeatedWhitespace', () => {
  it('reports two or more consecutive spaces', () => {
    const findings = findRepeatedWhitespace({
      'dialogue.welcome': 'Welcome  back, player.',
      'dialogue.goodbye': 'See you soon.',
      'menu.play': 'Play   now',
    })

    expect(findings).toEqual([
      {
        ruleId: 'source-repeated-whitespace',
        severity: 'warning',
        scope: 'entry',
        stringId: 'dialogue.welcome',
        message: 'Source string contains repeated whitespace.',
      },
      {
        ruleId: 'source-repeated-whitespace',
        severity: 'warning',
        scope: 'entry',
        stringId: 'menu.play',
        message: 'Source string contains repeated whitespace.',
      },
    ])
  })

  it('does not report whitespace-only values', () => {
    expect(findRepeatedWhitespace({ 'menu.play': '   ' })).toEqual([])
  })

  it('does not report a single space between words', () => {
    expect(findRepeatedWhitespace({ 'dialogue.welcome': 'Welcome back' })).toEqual([])
  })
})
