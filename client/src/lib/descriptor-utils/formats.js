// TODO: Move formatMapper to server alongside the rest of the data compilation process
// so that there isn't this intermediate schema for format maps. This will simplify
// Descriptors and Stitcher.
function formatMapper(dfMap) {
  const formatMap = {}
  let totalWeight = 0

  for (let format of Object.keys(dfMap)) {
    if (!isFormatValid(dfMap[format])) continue
    totalWeight += dfMap[format].weight
    formatMap[totalWeight - 1] = format
  }

  return {
    "totalWeight": totalWeight,
    "formatMap": formatMap
  }
}

function isFormatValid(format) {
  if (!format.weight || isNaN(format.weight) || format.weight < 1) return false
  if (!format.format || !Array.isArray(format.format)) return false
  return true
}

function formatPicker(formatMap, totalWeight) {
  const groupsize = totalWeight
  const grouproll = Math.floor(Math.random() * groupsize)
  let format = ''

  for (let categorySize of Object.keys(formatMap)) {
    format = formatMap[categorySize]
    if (categorySize >= grouproll) break
  }

  return format
}

export const pickFormat = formatPicker
export const mapFormats = formatMapper
