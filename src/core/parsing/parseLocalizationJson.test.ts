import { describe, expect, it } from 'vitest'
import { parseLocalizationJson } from './parseLocalizationJson'

describe('parseLocalizationJson', () => {
  it('accepts a flat object with string values', () => {
    const result = parseLocalizationJson('{"menu.play":"Play"}')

    expect(result).toEqual({ success: true, file: { 'menu.play': 'Play' } })
  })

  it('rejects invalid JSON', () => {
    expect(parseLocalizationJson('{')).toEqual({
      success: false,
      message: 'The file does not contain valid JSON.',
    })
  })

  it('rejects a top-level array', () => {
    expect(parseLocalizationJson('["Play"]')).toEqual({
      success: false,
      message: 'The top-level JSON value must be an object of string IDs and text values.',
    })
  })

  it('rejects non-string values', () => {
    expect(parseLocalizationJson('{"menu.play":123}')).toEqual({
      success: false,
      message: 'The value for "menu.play" must be a string.',
    })
  })
})
