function formatMapper(dfMap) {
  const formatMap = {}
  let totalWeight = 0

  for (let format of Object.keys(dfMap)) {
    totalWeight += dfMap[format].weight
    formatMap[totalWeight-1] = format
  }

  return {
    "totalWeight": totalWeight,
    "formatMap": formatMap
  }
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
