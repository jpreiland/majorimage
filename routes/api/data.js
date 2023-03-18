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
    const compiledWordGroups = compileWordGroups()
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

function compileWordGroups() {
  const compiledWordGroups = {}

  for (let wordGroup of Object.keys(WordGroups)) {
    let totalWords = 0
    const compiledGroup = {}

    for (let category of WordGroups[wordGroup]) {
      if (!Words[category] || Words[category].length <= 0) continue;

      totalWords += Words[category].length
      compiledGroup[(totalWords-1)] = category
    }

    compiledWordGroups[wordGroup] = {
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