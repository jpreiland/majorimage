import plural from './plural'
import { describe, expect, it } from 'vitest'

describe('#plural', () => {
  it('returns unmodified input if input is not a string', () => {
    expect(plural()).toBe()
    expect(plural(4)).toBe(4)
    expect(plural(true)).toBe(true)
    expect(plural([])).toStrictEqual([])
    expect(plural({})).toStrictEqual({})
  })

  it('returns empty string if input is empty string', () => {
    expect(plural('')).toBe('')
  })

  it('returns pluralized input', () => {
    expect(plural('bear')).toBe('bears')
    expect(plural('horse')).toBe('horses')
    expect(plural('bus')).toBe('buses')
    expect(plural('sword')).toBe('swords')
  })

  it('returns pluralized input for special cases', () => {
    expect(plural('cyclops')).toBe('cyclopes')
    expect(plural('fey')).toBe('fey')
    expect(plural('lens')).toBe('lenses')
    expect(plural('rug of smothering')).toBe('rugs of smothering')
  })
})