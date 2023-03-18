const { Router } = require('express')
const Stones = require('../../data/materials/stones.json')
const Woods = require('../../data/materials/woods.json')
const Metals = require('../../data/materials/metals.json')
const Textiles = require('../../data/materials/textiles.json')
const Words = require('../../data/words/words.json')
const WordGroups = require('../../data/words/word-groups.json')
const Templates = require('../../data/templates/templates.json')
const Formats = require('../../data/descriptor-formats/formats.json')
const DescriptorFormatsMap = require('../../data/descriptor-formats/descriptor-formats-map.json')

const router = Router()

router.get('/materials', async (req, res) => {
  try {
    let data = {
      stones: Stones.sort((a, b) => a.name.localeCompare(b.name)),
      woods: Woods.sort((a, b) => a.name.localeCompare(b.name)),
      metals: Metals.sort((a, b) => a.name.localeCompare(b.name)),
      textiles: Textiles.sort((a, b) => a.name.localeCompare(b.name))
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/data', async (req, res) => {
  try {
    const wordCounts = buildWordCounts()
    const compiledWordGroups = compileWordGroups(wordCounts)
    const compiledFormats = compileFormats()
    const compiledTemplates = compileTemplates()
    const compiledMaterials = compileMaterials()

    const data = {
      dfMap: compiledFormats,
      formats: Formats,
      materials: compiledMaterials,
      templates: compiledTemplates,
      words: Words, 
      wordGroups: compiledWordGroups
    }

    res.status(200).json(data)    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/locations', async (req, res) => {
  try {
    res.status(200).json(Locations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

function buildWordCounts() {
  wordCounts = {}

  // add base categories to word counts map
  for (let category of Object.keys(Words)) {
    wordCounts[category] = Words[category].length
  }

  let groupQueue = []
  for (let group of Object.keys(WordGroups)) {
    groupQueue.push(group)
  }

  let niaveCycleCounter = 0

  while (groupQueue.length) {
    if (niaveCycleCounter > 50) {
      console.log(`cycle likely present. aborting.`)
      break
    }

    let group = groupQueue.shift()
    let totalWords = 0
    for (let category of WordGroups[group]) {
      if (Object.hasOwn(wordCounts, category)) {
        totalWords += wordCounts[category]
      } else {
        groupQueue.push(group)
        niaveCycleCounter++
        totalWords = 0
        break
      }
    }

    if (totalWords > 0) {
      wordCounts[group] = totalWords
      niaveCycleCounter = 0
    }
  }

  return wordCounts
}

function compileWordGroups(wordCounts) {
  const compiledWordGroups = {}

  for (let group of Object.keys(WordGroups)) {
    totalWords = 0
    const compiledGroup = {}

    for (let category of WordGroups[group]) {
      if (!wordCounts[category]) continue

      totalWords += wordCounts[category]
      compiledGroup[(totalWords - 1)] = category
    }

    compiledWordGroups[group] = {
      categoryMap: compiledGroup,
      totalWords: totalWords
    }
  }

  return compiledWordGroups
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

function compileTemplates() {
  return Templates
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