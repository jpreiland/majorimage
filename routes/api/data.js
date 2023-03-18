const { Router } = require('express')
const Stones = require('../../data/materials/stones.json')
const Woods = require('../../data/materials/woods.json')
const Metals = require('../../data/materials/metals.json')
const Textiles = require('../../data/materials/textiles.json')
const Categories = require('../../data/words/categories.json')
const Groups = require('../../data/words/groups.json')
const Templates = require('../../data/templates/templates.json')
const Formats = require('../../data/descriptor-formats/formats.json')
const DescriptorFormatsMap = require('../../data/descriptor-formats/descriptor-formats-map.json')

const router = Router()

router.get('/data', async (req, res) => {
  try {
    const wordCounts = buildWordCounts()
    const compiledGroups = compileGroups(wordCounts)
    const compiledFormats = compileFormats()
    const compiledMaterials = compileMaterials()

    const data = {
      categories: Categories,
      dfMap: compiledFormats,
      formats: Formats,
      groups: compiledGroups,
      materials: compiledMaterials,
      templates: Templates
    }

    res.status(200).json(data)    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

function buildWordCounts() {
  wordCounts = {}

  // add base categories to word counts map
  for (let category of Object.keys(Categories)) {
    wordCounts[category] = Categories[category].length
  }

  let groupQueue = []
  for (let group of Object.keys(Groups)) {
    groupQueue.push(group)
  }

  let naiveCycleCounter = 0

  while (groupQueue.length) {
    if (naiveCycleCounter > 50) {
      console.log(`cycle likely present. aborting.`)
      break
    }

    let group = groupQueue.shift()
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

function compileGroups(wordCounts) {
  const compiledGroups = {}

  for (let group of Object.keys(Groups)) {
    totalWords = 0
    const compiledGroup = {}

    for (let category of Groups[group]) {
      if (!wordCounts[category]) continue

      totalWords += wordCounts[category]
      compiledGroup[(totalWords - 1)] = category
    }

    compiledGroups[group] = {
      categoryMap: compiledGroup,
      totalWords: totalWords
    }
  }

  return compiledGroups
}

function compileFormats() {
  const compiledFormats = {}

  for (let descriptorType of Object.keys(DescriptorFormatsMap)) {
    const compiledDescriptorType = {}

    for (let nfWeightPair of DescriptorFormatsMap[descriptorType]) {
      compiledDescriptorType[nfWeightPair[0]] = {
        weight: nfWeightPair[1],
        format: Formats[nfWeightPair[0]]
      }
    }

    compiledFormats[descriptorType] = compiledDescriptorType
  }

  return compiledFormats
}

function compileMaterials() {
  return {
    stones: Stones.sort((a, b) => a.name.localeCompare(b.name)),
    woods: Woods.sort((a, b) => a.name.localeCompare(b.name)),
    metals: Metals.sort((a, b) => a.name.localeCompare(b.name)),
    textiles: Textiles.sort((a, b) => a.name.localeCompare(b.name))
  }
}

module.exports = router