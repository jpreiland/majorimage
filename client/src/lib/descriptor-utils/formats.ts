import { Format, FormatName, NumericString } from "../../../../shared/types"

// TODO: Now that this (and isFormatValid) is in the server, 
// remove these once the associated unit tests have been moved.
function formatMapper(compiledDescriptorTypes: Record<string, {weight: number, format: Format}>) {
  const formatMap: Record<NumericString, FormatName> = {}
  let totalWeight = 0

  for (let format of Object.keys(compiledDescriptorTypes) as FormatName[]) {
    if (!isFormatValid(compiledDescriptorTypes[format])) continue
    totalWeight += compiledDescriptorTypes[format].weight
    formatMap[totalWeight - 1] = format
  }

  return {
    "totalWeight": totalWeight,
    "formatMap": formatMap
  }
}

function isFormatValid(compiledDescriptorType: {weight: number, format: Format}) {
  if (!compiledDescriptorType.weight || isNaN(compiledDescriptorType.weight) || compiledDescriptorType.weight < 1) return false
  if (!compiledDescriptorType.format || !Array.isArray(compiledDescriptorType.format)) return false
  return true
}

function formatPicker(formatMap: Record<NumericString, FormatName>, totalWeight: number): FormatName {
  const groupsize = totalWeight
  const grouproll = Math.floor(Math.random() * groupsize)
  let format: FormatName = '___'

  for (let categorySize of Object.keys(formatMap) as NumericString[]) {
    format = formatMap[categorySize]
    if (categorySize as number >= grouproll) break
  }

  return format
}

export const pickFormat = formatPicker
export const mapFormats = formatMapper
