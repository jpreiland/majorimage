import { mapFormats, pickFormat } from './formats'
import { describe, expect, it } from 'vitest'

const dfMapEmpty = {}
const dfMapNoWeight = {
  "format1": {
    "format": [["title"]]
  },
  "format2": {
    "weight": 1,
    "format": [["title"]]
  },
}
const dfMapNaNWeight = {
  "format1": {
    "weight": "test",
    "format": [["title"]]
  },
  "format2": {
    "weight": 1,
    "format": [["title"]]
  },
}
const dfMapNegativeWeight = {
  "format1": {
    "weight": -5,
    "format": [["title"]]
  },
  "format2": {
    "weight": 1,
    "format": [["title"]]
  },
}
const dfMapNoFormat = {
  "format1": {
    "weight": 1
  },
  "format2": {
    "weight": 1,
    "format": [["title"]]
  },
}
const dfMapBadFormat = {
  "format1": {
    "weight": 1,
    "format": "test"
  },
  "format2": {
    "weight": 1,
    "format": [["title"]]
  },
}
const dfMap1 = {
  "format1": {
    "weight": 4,
    "format": [["title"]]
  },
  "format2": {
    "weight": 1,
    "format": [["title"]]
  },
  "format3": {
    "weight": 7,
    "format": [["title"]]
  }
}

const mappedFormatsEmpty = {
  "totalWeight": 0,
  "formatMap": {}
}
const mappedFormatsMissingProp = {
  "totalWeight": 1,
  "formatMap": {
    0: "format2",
  }
}
const mappedFormats1 = {
  "totalWeight": 12,
  "formatMap": {
    3: "format1",
    4: "format2",
    11: "format3"
  }
}

describe('#formatMapper', () => {
  it('returns an object containing totalWeight 0 and empty formatMap if dfMap is empty', () => {
    expect(mapFormats(dfMapEmpty)).toEqual(mappedFormatsEmpty)
  })

  it('skips formats with no weight', () => {
    expect(mapFormats(dfMapNoWeight)).toEqual(mappedFormatsMissingProp)
  })

  it('skips formats with NaN weight', () => {
    expect(mapFormats(dfMapNaNWeight)).toEqual(mappedFormatsMissingProp)
  })

  it('skips formats with negative weight', () => {
    expect(mapFormats(dfMapNegativeWeight)).toEqual(mappedFormatsMissingProp)
  })

  it('skips formats with no inner format property', () => {
    expect(mapFormats(dfMapNoFormat)).toEqual(mappedFormatsMissingProp)
  })

  it('skips formats if inner format property is not an array', () => {
    expect(mapFormats(dfMapBadFormat)).toEqual(mappedFormatsMissingProp)
  })

  it('returns object containing totalWeight property and formatMap property', () => {
    expect(mapFormats(dfMap1)).toEqual(mappedFormats1)
  })
})

describe('#formatPicker', () => {
  it('returns one of the three format names in the mappedFormats.formatMap object', () => {
    expect(pickFormat(mappedFormats1.formatMap, mappedFormats1.totalWeight)).toMatch(/^format[1-3]$/)
  })
})