import titleize from './titleize'
import { describe, expect, it } from 'vitest'

describe('#titleize', () => {
  it('returns unmodified input if input is not a string', () => {
    expect(titleize()).toBe()
    expect(titleize(4)).toBe(4)
    expect(titleize(true)).toBe(true)
    expect(titleize([])).toStrictEqual([])
    expect(titleize({})).toStrictEqual({})
  })

  it('returns empty string if input is empty string', () => {
    expect(titleize('')).toBe('')
  })

  it('returns title case string if input is one character', () => {
    expect(titleize('a')).toBe('A')
  })

  it('returns title case string if input is one word', () => {
    expect(titleize('frank')).toBe('Frank')
  })

  it('returns title case string without capitalized articles/prepositions', () => {
    expect(titleize('dog of the noble house')).toBe('Dog of the Noble House')
  })

  it('returns title case string without capitalized articles/prepositions, except if article/preposition is at the end of the string', () => {
    expect(titleize('without or with')).toBe('Without or With')
    expect(titleize('where\'s the loot at')).toBe('Where\'s the Loot At')
  })

  it('returns title case string without capitalized articles/prepositions, except if article/preposition is at start of the string', () => {
    expect(titleize('a chicken')).toBe('A Chicken')
    expect(titleize('the dog of the noble house')).toBe('The Dog of the Noble House')
  })

  it('returns title case string if input already has capital letters', () => {
    expect(titleize('HAMLET')).toBe('Hamlet')
    expect(titleize('mUcH aDo AbOuT nOtHiNg')).toBe('Much Ado about Nothing')
  })
})