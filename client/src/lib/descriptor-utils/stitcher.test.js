import data from './testData.json'
import { stitch, pick } from './stitcher'
import { describe, expect, it } from 'vitest'

const formatBadPart = [["bad"]]
const formatStatic = [["static", "test"]]
const formatTitle = [["title"], ["static", "test a string"]]
const formatAName = [["a(n)"], ["pick", "nameAll"]]
const formatSomeNames = [["a(n)"], ["pick-pluralize", "nameAll"]]
const formatPick = [["pick", "nameAll"]]
const formatPickBadCategory = [["pick", "bad"]]
const formatPickPlural = [["pick-pluralize", "nameAll"]]
const formatPickPluralOptional = [["pick-pluralize-optional", "nameAll"]]
const formatAPickPluralOptional = [["a(n)"], ["pick-pluralize-optional", "nameAll"]]
const formatPickPast = [["pick-pastTense", "nameAll"]]
const formatPickVerber = [["pick-verber", "nameAll"]]
const formatPickGerund = [["pick-gerund", "nameAll"]]
const formatPickMulti = [["pick-multi", "nameAll", 2, 3]]
const formatPickMultiZero = [["pick-multi", "nameAll", 0, 0]]
const formatPickMultiNaN = [["pick-multi", "nameAll", "hey", 0]]
const formatStaticThenPickMultiZero = [["static", "test multi "], ["pick-multi", "nameAll", 0, 0]]
const formatPrice = [["price", 1, 999]]
const formatPriceFree = [["price", 0, 0]]
const formatNumber = [["number", 0, 9]]
const formatNumberZero = [["number", 0, 0, "zero"]]
const formatFormat = [["format", "some-accessories"]]
const formatType = [["format", "Accessory"]]

const formatInvalidLength = [[]]
const formatAInvalidLength = [["a(n)", 1]]
const formatStaticInvalidLength = [["static"]]
const formatTitleInvalidLength = [["title", 1]]
const formatPickInvalidLength = [["pick", "nameAll", 1]]
const formatPickPluralInvalidLength = [["pick-pluralize", "nameAll", 1]]
const formatPickPluralOptionalInvalidLength = [["pick-pluralize-optional", "nameAll", 1]]
const formatPickPastInvalidLength = [["pick-pastTense", "nameAll", 1]]
const formatPickVerberInvalidLength = [["pick-verber", "nameAll", 1]]
const formatPickGerundInvalidLength = [["pick-gerund", "nameAll", 1]]
const formatPickMultiInvalidLength = [["pick-multi", "nameAll", 1, 1, 1, 1]]
const formatNumberInvalidLength = [["number", 5]]
const formatPriceInvalidLength = [["price", 5]]
const formatFormatInvalidLength = [["format", "nameAll", 1]]

describe('#stitch', () => {
  it('log error on null or undefined format', () => {
    expect(stitch(null, data, null, null)).toBe("")
    expect(stitch(undefined, data, null, null)).toBe("")
  })

  it('skips invalid format part types', () => {
    expect(stitch(formatBadPart, data, null, null)).toBe("")
  })

  it('returns a static string of text', () => {
    expect(stitch(formatStatic, data, null, null)).toBe("test")
  })

  it('returns a static string of text in title case', () => {
    expect(stitch(formatTitle, data, null, null)).toBe("Test a String")
  })

  it('returns a static string of text with "a " prepended', () => {
    expect(stitch(formatAName, data, null, null)).toMatch(/^a [1-5][a-c][1-3]$/)
  })

  it('returns a static string of text with "a " prepended', () => {
    expect(stitch(formatSomeNames, data, null, null)).toMatch(/^some [1-5][a-c][1-3]s$/)
  })

  it('returns a name from one of the 15 subcategories nested in the nameAll group', () => {
    expect(stitch(formatPick, data, null, null)).toMatch(/^[1-5][a-c][1-3]$/)
  })

  it('returns empty string if category/group name does not exist in data set', () => {
    expect(stitch(formatPickBadCategory, data, null, null)).toBe("")
  })

  it('returns a name with an s at the end', () => {
    expect(stitch(formatPickPlural, data, null, null)).toMatch(/^[1-5][a-c][1-3]s$/)
  })

  it('returns a name, optionally with an s at the end', () => {
    expect(stitch(formatPickPluralOptional, data, null, null)).toMatch(/^[1-5][a-c][1-3]s?$/)
  })

  it('returns a name, optionally with an s at the end, and prepended with "a " or "some " as appropriate', () => {
    // ensure high chance of line coverage since there's a branch with random (50%) chance of execution
    for (let i = 0; i < 10; i++) {
      expect(stitch(formatAPickPluralOptional, data, null, null)).toMatch(/^(a [1-5][a-c][1-3])|(some [1-5][a-c][1-3]s)$/)
    }
  })

  it('returns a name with -ed appended to the end when pick-pastTense is used', () => {
    expect(stitch(formatPickPast, data, null, null)).toMatch(/^[1-5][a-c][1-3]ed$/)
  })

  it('returns a name with -er appended to the end when pick-verber is used', () => {
    expect(stitch(formatPickVerber, data, null, null)).toMatch(/^[1-5][a-c][1-3]er$/)
  })

  it('returns a name with -ing appended to the end when pick-gerund is used', () => {
    expect(stitch(formatPickGerund, data, null, null)).toMatch(/^[1-5][a-c][1-3]ing$/)
  })

  it('returns 2-3 names separated by spaces when pick-multi is used', () => {
    expect(stitch(formatPickMulti, data, null, null)).toMatch(/^[1-5][a-c][1-3] [1-5][a-c][1-3]( [1-5][a-c][1-3])?$/)
  })

  it('returns 0 names when pick-multi is used and 0 is the amount of words rolled', () => {
    expect(stitch(formatPickMultiZero, data, null, null)).toBe("")
    expect(stitch(formatStaticThenPickMultiZero, data, null, null)).toBe("test multi")
  })

  it('returns 0 names when pick-multi is used and a non-number value is used as one of the range bounds', () => {
    expect(stitch(formatPickMultiNaN, data, null, null)).toBe("")
  })

  it('returns a number in a given range', () => {
    expect(stitch(formatNumber, data, null, null)).toMatch(/^[0-9]$/)
  })

  it('returns a number in a given override range', () => {
    expect(stitch(formatNumber, data, null, { min: 10, max: 19 })).toMatch(/^1[0-9]$/)
  })

  it('returns a supplied custom "zero" value when 0 is rolled as a number', () => {
    expect(stitch(formatNumberZero, data, null, null)).toBe("zero")
    expect(stitch(formatNumber, data, null, { min: 0, max: 0, zeroString: "zero" })).toBe("zero")
  })

  it('returns a price-formatted number in a given range', () => {
    expect(stitch(formatPrice, data, null, null)).toMatch(/^([1-9]g|10g)?([1-9]s)?([1-9]c)?$/)
  })

  it('returns "free" if a price of 0 is rolled', () => {
    expect(stitch(formatPriceFree, data, null, null)).toBe("free")
  })

  it('returns a price-formatted number in a given override range', () => {
    expect(stitch(formatPrice, data, { min: 1, max: 9, denomination: "gold" }, null)).toMatch(/^([1-9]g)$/)
    expect(stitch(formatPrice, data, { min: 1, max: 9, denomination: "silver" }, null)).toMatch(/^([1-9]s)$/)
    expect(stitch(formatPrice, data, { min: 1, max: 9, denomination: "copper" }, null)).toMatch(/^([1-9]c)$/)
  })

  it('returns an accessory, pluralized, and prepended with "some " when using a "format" format part', () => {
    expect(stitch(formatFormat, data, null, null)).toMatch(/^some (acc[1-3]|basic[1-3])s$/)
  })

  it('returns an accessory prepended with "an " when using a "type" format part', () => {
    expect(stitch(formatType, data, null, null)).toMatch(/^(an acc[1-3]|a basic[1-3])$/)
  })

  it('skips any format part if there are an incorrect number of parameters', () => {
    expect(stitch(formatInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatAInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatStaticInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatTitleInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPickInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPickPluralInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPickPluralOptionalInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPickPastInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPickVerberInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPickGerundInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPickMultiInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatNumberInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatPriceInvalidLength, data, null, null)).toBe("")
    expect(stitch(formatFormatInvalidLength, data, null, null)).toBe("")
  })
})

describe('#pick', () => {
  // There's probably better statistical tests that can be implemented here, but this is good enough for now
  it('picks words from base categories in a group at roughly equal probability', () => {
    let testMap = {}
    for (let i = 0; i < 50000; i++) {
      let testWord = pick("nameAll", data)
      if (Object.hasOwn(testMap, testWord)) {
        testMap[testWord]++
      } else {
        testMap[testWord] = 1
      }
    }

    // 50,000 picks out of a group that contains 45 different words
    // average count should be about 1111. likely in range 950-1250.
    let total = 0
    for (let name of Object.keys(testMap)) {
      const count = testMap[name]
      total += count
      expect(count).toBeGreaterThanOrEqual(950)
      expect(count).toBeLessThanOrEqual(1250)
    }
    expect(total).toBe(50000)
  })
})