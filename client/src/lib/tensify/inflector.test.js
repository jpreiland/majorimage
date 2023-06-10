import tensify from './inflector'
import { describe, expect, it } from 'vitest'

describe('#tensify', () => {
  it('returns unmodified input if input is not a string', () => {
    expect(tensify()).toBe()
    expect(tensify(4)).toBe(4)
    expect(tensify(true)).toBe(true)
    expect(tensify([])).toStrictEqual([])
    expect(tensify({})).toStrictEqual({})
  })

  it('returns empty string if input is empty string', () => {
    expect(tensify('')).toBe('')
  })

  it('returns past tense verb for normal verbs that do not invoke exceptions or special rules', () => {
    expect(tensify('bomb')).toBe('bombed')
    expect(tensify('subpoena')).toBe('subpoenaed')
  })

  it('returns past tense verb if input is irregular verb', () => {
    expect(tensify('am')).toBe('was')
    expect(tensify('are')).toBe('were')
    expect(tensify('beat')).toBe('beat')
    expect(tensify('bend')).toBe('bent')
  })

  it('returns past tense verb if input ends with c', () => {
    expect(tensify('arc')).toBe('arced')
    expect(tensify('mimic')).toBe('mimicked')
  })

  it('returns past tense verb if input ends with consonant-then-y', () => {
    expect(tensify('party')).toBe('partied')
  })

  it('returns past tense verb if input ends with e', () => {
    expect(tensify('free')).toBe('freed')
    expect(tensify('use')).toBe('used')
  })

  it('returns past tense verb if input ends with vowel-vowel-consonant', () => {
    expect(tensify('seed')).toBe('seeded')
  })

  it('returns past tense verb if input ends with vowel-consonant, except consonants w or x', () => {
    expect(tensify('sunder')).toBe('sundered')
    expect(tensify('allow')).toBe('allowed')
    expect(tensify('tax')).toBe('taxed')
    expect(tensify('pop')).toBe('popped')
  })
})