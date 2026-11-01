import { describe, expect, it } from 'vitest'
import { findInconsistentEllipsis } from './sourceInconsistentEllipsis'

describe('findInconsistentEllipsis', () => {
  it('reports one file-level finding with counts and examples', () => {
    expect(findInconsistentEllipsis({
      'status.loading': 'Loading...',
      'status.retry': 'Retry...',
      'status.connecting': 'Connecting…',
    })).toEqual([{
      ruleId: 'source-inconsistent-ellipsis',
        severity: 'warning',
        scope: 'file',
        message: 'Source file uses inconsistent ellipsis styles.',
        details: [
          {
            text: '2 entries use "...". Examples:',
            children: ['status.loading', 'status.retry'],
          },
          {
            text: '1 entry uses "…". Examples:',
            children: ['status.connecting'],
          },
        ],
    }])
  })

  it('does not report a file that uses only one ellipsis style', () => {
    expect(findInconsistentEllipsis({
      'status.loading': 'Loading...',
      'status.retry': 'Retry...',
    })).toEqual([])
  })

  it('limits examples to three IDs per style', () => {
    const findings = findInconsistentEllipsis({
      one: 'One...', two: 'Two...', three: 'Three...', four: 'Four...',
      connecting: 'Connecting…',
    })
    expect(findings[0]?.details).toContainEqual({
      text: '4 entries use "...". Examples:',
      children: ['one', 'two', 'three'],
    })
  })
})
