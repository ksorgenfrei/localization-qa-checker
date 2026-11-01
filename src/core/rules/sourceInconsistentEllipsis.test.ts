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
            text: '2 entries use "...". Example:',
            children: ['status.loading'],
          },
          {
            text: '1 entry uses "…". Example:',
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

  it('limits examples to one ID per case', () => {
    const findings = findInconsistentEllipsis({
      one: 'One...', two: 'Two...', three: 'Three...', four: 'Four...',
      connecting: 'Connecting…',
    })
    expect(findings[0]?.details).toContainEqual({
      text: '4 entries use "...". Example:',
      children: ['one'],
    })
  })

  it('includes an entry using both styles in both style groups', () => {
    const findings = findInconsistentEllipsis({
      'status.mixed': 'Wait... really…',
      'status.loading': 'Loading...',
      'status.connecting': 'Connecting…',
    })

    expect(findings[0]?.details).toEqual([
      {
        text: '2 entries use "...". Example:',
        children: ['status.loading'],
      },
      {
        text: '2 entries use "…". Example:',
        children: ['status.connecting'],
      },
      {
        text: '1 entry uses both ellipsis styles. Example:',
        children: ['status.mixed'],
      },
    ])
  })

  it('falls back to a mixed entry when no style-exclusive example exists', () => {
    const findings = findInconsistentEllipsis({
      'status.mixed': 'Wait... really…',
    })

    expect(findings[0]?.details).toEqual([
      {
        text: '1 entry uses "...". Example:',
        children: ['status.mixed'],
      },
      {
        text: '1 entry uses "…". Example:',
        children: ['status.mixed'],
      },
      {
        text: '1 entry uses both ellipsis styles. Example:',
        children: ['status.mixed'],
      },
    ])
  })
})
