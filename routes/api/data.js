const { Router } = require('express')
const Stones = require('../../data/materials/stones.json')
const Woods = require('../../data/materials/woods.json')
const Metals = require('../../data/materials/metals.json')
const Textiles = require('../../data/materials/textiles.json')
const Words = require('../../data/words/words.json')
const WordGroups = require('../../data/words/word-groups.json')
const Locations = require('../../data/locations/locations.json')
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

router.get('/words', async (req, res) => {
  try {
    /* compile word groups */
    const compiledWordGroups = {}

    for (let group of Object.keys(WordGroups)) {
      let totalWords = 0
      const compiledGroup = {}

      for (let category of WordGroups[group]) {
        if (!Words[category] || Words[category].length <= 0) continue;

        totalWords += Words[category].length
        compiledGroup[(totalWords-1)] = category
      }

      compiledWordGroups[group] = {
        categoryMap: compiledGroup,
        totalWords: totalWords
      }
    }

    /* compile descriptor-format map */
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

    const wordData = {
      words: Words, 
      wordGroups: compiledWordGroups,
      dfMap: compiledFormats,
      formats: Formats
    }

    res.status(200).json(wordData)    
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

module.exports = router