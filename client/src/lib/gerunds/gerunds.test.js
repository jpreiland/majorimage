import gerunds from './gerunds'
import { describe, expect, it } from 'vitest'

describe('#gerunds', () => {
  it('returns unmodified input if input is not a string', () => {
    expect(gerunds()).toBe()
    expect(gerunds(4)).toBe(4)
    expect(gerunds(true)).toBe(true)
    expect(gerunds([])).toStrictEqual([])
    expect(gerunds({})).toStrictEqual({})
  })

  it('returns empty string if input is empty string', () => {
    expect(gerunds('')).toBe('')
  })

  it('returns correct gerund in regular verb cases', () => {
    expect(gerunds('jump')).toBe('jumping')
    expect(gerunds('fume')).toBe('fuming')
  })

  it('returns correct gerund if verb ends in e', () => {
    expect(gerunds('fume')).toBe('fuming')
    expect(gerunds('write')).toBe('writing')
  })

  it('returns correct gerund if verbe ends in two vowels', () => {
    expect(gerunds('flee')).toBe('fleeing')
    expect(gerunds('boo')).toBe('booing')
    expect(gerunds('queue')).toBe('queueing')
  })

  it('returns gerund for special verb cases', () => {
    expect(gerunds('frolic')).toBe('frolicking')
    expect(gerunds('chop')).toBe('chopping')
  })
})