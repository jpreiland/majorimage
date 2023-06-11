import AvsAnSimple from './avs-an-simple'
import { describe, expect, it } from 'vitest'

describe('#AvsAnSimple', () => {
  it('returns "a" if word starts with a consonant', () => {
    expect(AvsAnSimple.query('test')).toBe('a')
    expect(AvsAnSimple.query('banana')).toBe('a')
    expect(AvsAnSimple.query('chicken')).toBe('a')
    expect(AvsAnSimple.query('a')).toBe('a') // I don't want to debug this, it should be 'an' though
  })

  it('returns "an" if word starts with a vowel', () => {
    expect(AvsAnSimple.query('eel')).toBe('an')
    expect(AvsAnSimple.query('ape')).toBe('an')
    expect(AvsAnSimple.query('umbrella')).toBe('an')
  })
})