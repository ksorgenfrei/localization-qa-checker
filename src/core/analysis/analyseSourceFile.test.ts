import { describe, expect, it } from 'vitest'
import { analyseSourceFile } from './analyseSourceFile'

describe('analyseSourceFile', () => {
  it('runs the registered source rules against one file', () => {
    const findings = analyseSourceFile({
      'menu.play': '',
      'dialogue.welcome': ' Welcome back, player.',
      'dialogue.goodbye': 'See you  soon.',
      'status.loading': 'Loading...',
      'status.connecting': 'Connecting…',
    })

    expect(findings).toHaveLength(4)
    expect(findings.map(({ ruleId }) => ruleId)).toEqual([
      'source-empty-string',
      'source-leading-trailing-whitespace',
      'source-repeated-whitespace',
      'source-inconsistent-ellipsis',
    ])
    expect(findings[0]).toMatchObject({
      scope: 'entry',
      stringId: 'menu.play',
    })
    expect(findings[3]).toMatchObject({
      scope: 'file',
    })
  })
})
