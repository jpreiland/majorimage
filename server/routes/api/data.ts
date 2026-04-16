import express from 'express'
import Stones from '../../data/materials/stones.json' with { type: "json" };
import Woods from '../../data/materials/woods.json' with { type: "json" };
import Metals from '../../data/materials/metals.json' with { type: "json" };
import Textiles from '../../data/materials/textiles.json' with { type: "json" };
import Categories from '../../data/words/categories.json' with { type: "json" };
import Groups from '../../data/words/groups.json' with { type: "json" };
import Templates from '../../data/templates/templates.json' with { type: "json" };
import Formats from '../../data/descriptor-formats/formats.json' with { type: "json" };
import DescriptorFormatsMap from '../../data/descriptor-formats/descriptor-formats-map.json' with { type: "json" };
import { validateAll } from '../../data/validators.js';

import type { CategoryName, GroupsCompiled, GroupName, DFEntry, FormatName, NumericString, DFMapName, CompiledGroup, DFMapJsonEntry, Format } from '../../../shared/types.ts'

const router = express.Router()

validateAll(Categories, Groups, Formats, DescriptorFormatsMap)

router.get('/data', async (req, res) => {
  try {
    // TODO: this compilaton is only here for development convenience.
    // Eventually move to a script that compiles data once at startup rather than on each request.
    const wordCounts = buildWordCounts()
    const compiledGroups = compileGroups(wordCounts)
    const compiledFormats = compileFormats()
    const compiledMaterials = compileMaterials()

    /** @type {import('../../../shared/types').AppData} */
    const data = {
      version: "0.1.0",
      categories: Categories,
      dfMap: compiledFormats,
      formats: Formats,
      groups: compiledGroups,
      materials: compiledMaterials,
      templates: Templates
    }

    res.status(200).json(data)    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json("An unexpected error occurred")
    }
  }
})

function buildWordCounts(): Record<string, number> {
  const wordCounts: Record<string, number> = {}
  // add base categories to word counts map
  for (let category of Object.keys(Categories) as CategoryName[]) {
    wordCounts[category] = Categories[category].length
  }

  let groupQueue = []
  for (let group of Object.keys(Groups)) {
    groupQueue.push(group)
  }

  let naiveCycleCounter = 0

  while (groupQueue.length) {
    const group: GroupName = groupQueue.shift() as GroupName

    if (naiveCycleCounter > 50) {
      console.log(`cycle likely present. aborting at group ${group}.`)
      break
    }

    let totalWords = 0
    for (let category of Groups[group]) {
      if (Object.hasOwn(wordCounts, category)) {
        totalWords += wordCounts[category]
      } else {
        groupQueue.push(group)
        naiveCycleCounter++
        totalWords = 0
        break
      }
    }

    if (totalWords > 0) {
      wordCounts[group] = totalWords
      naiveCycleCounter = 0
    }
  }

  return wordCounts
}

function compileGroups(wordCounts: Record<string, number>): GroupsCompiled {
  const compiledGroups: GroupsCompiled = {}

  for (let group of Object.keys(Groups) as GroupName[]) {
    let totalWords = 0
    const categoryMap: Record<NumericString, CategoryName | GroupName> = {}

    for (let category of Groups[group] as GroupName[]) {
      if (!wordCounts[category]) continue

      totalWords += wordCounts[category]
      categoryMap[(totalWords - 1)] = category
    }

    compiledGroups[group] = {
      categoryMap: categoryMap,
      totalWords: totalWords
    } as CompiledGroup
  }

  return compiledGroups
}

function compileFormats() {
  const dfMap: Record<string, DFEntry> = {}

  for (let descriptorType of Object.keys(DescriptorFormatsMap) as DFMapName[]) {
    const compiledDescriptorTypes: Record<string, {weight: number, format: Format}> = {}

    for (let nfWeightPair of DescriptorFormatsMap[descriptorType] as DFMapJsonEntry) {
      compiledDescriptorTypes[nfWeightPair[0]] = {
        weight: nfWeightPair[1],
        format: Formats[nfWeightPair[0]] as unknown as Format
      }
    }

    const mappedFormat = formatMapper(compiledDescriptorTypes)

    dfMap[descriptorType] = mappedFormat
  }

  return dfMap
}

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

function compileMaterials() {
  return {
    stones: Stones.sort((a, b) => a.name.localeCompare(b.name)),
    woods: Woods.sort((a, b) => a.name.localeCompare(b.name)),
    metals: Metals.sort((a, b) => a.name.localeCompare(b.name)),
    textiles: Textiles.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export default router