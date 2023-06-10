import verber from './verber'
import { describe, expect, it } from 'vitest'

describe('#verber', () => {
  it('returns unmodified input if input is not a string', () => {
    expect(verber()).toBe()
    expect(verber(4)).toBe(4)    
    expect(verber(true)).toBe(true)
    expect(verber([])).toStrictEqual([])
    expect(verber({})).toStrictEqual({})
  })

  it('returns unmodified input if input is length 1 or less', () => {
    expect(verber('')).toBe('')
    expect(verber('a')).toBe('a')
  })

  it('returns value from special verb lookup if input is an exception to normal rules', () => {
    expect(verber('advise')).toBe('advisor')
  })

  it('returns correct value for verbs ending in consonant-then-y', () => {
    expect(verber('party')).toBe('partier')
  })

  it('returns correct value for verbs ending in vowel-then-consonant, except the consonants y-w-n-r, and no vowel immediately preceding the penultimate character', () => {
    expect(verber('fasten')).toBe('fastener')
    expect(verber('hit')).toBe('hitter')
  })

  it('returns correct value for verbs ending in e', () => {
    expect(verber('chase')).toBe('chaser')
  })

  it('returns correct value for typical/default verbs that do not invoke special rules', () => {
    expect(verber('crunch')).toBe('cruncher')
  })
})