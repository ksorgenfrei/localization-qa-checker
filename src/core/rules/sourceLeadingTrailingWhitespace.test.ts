import { describe, expect, it } from 'vitest'
import { findLeadingTrailingWhitespace } from './sourceLeadingTrailingWhitespace'

describe('findLeadingTrailingWhitespace', () => {
  it('reports spaces, tabs, and line breaks around visible text', () => {
    const findings = findLeadingTrailingWhitespace({
      'menu.play': ' Play',
      'menu.settings': 'Settings\t',
      'dialogue.welcome': '\nWelcome',
      'menu.quit': 'Quit',
    })

    expect(findings).toEqual([
      {
        ruleId: 'source-leading-trailing-whitespace',
        severity: 'warning',
        scope: 'entry',
        stringId: 'menu.play',
        message: 'Source string contains leading or trailing whitespace.',
      },
      {
        ruleId: 'source-leading-trailing-whitespace',
        severity: 'warning',
        scope: 'entry',
        stringId: 'menu.settings',
        message: 'Source string contains leading or trailing whitespace.',
      },
      {
        ruleId: 'source-leading-trailing-whitespace',
        severity: 'warning',
        scope: 'entry',
        stringId: 'dialogue.welcome',
        message: 'Source string contains leading or trailing whitespace.',
      },
    ])
  })

  it('does not report whitespace-only values', () => {
    expect(findLeadingTrailingWhitespace({ 'menu.play': '   ' })).toEqual([])
  })

  it('does not report text with only internal spaces', () => {
    expect(
      findLeadingTrailingWhitespace({
        'dialogue.welcome': 'Welcome back, player.',
      }),
    ).toEqual([])
  })
})
