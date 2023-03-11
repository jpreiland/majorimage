const { Router } = require('express')
const Item = require('../../models/Item')
const Items = require('../../sample-data/objects/items.json')
const Colors = require('../../sample-data/colors.json')
const Qualities = require('../../sample-data/qualities.json')
const Materials = require('../../sample-data/materials.json')
const Effects = require('../../sample-data/effects.json')
const Stones = require('../../sample-data/materials/stones.json')
const Woods = require('../../sample-data/materials/woods.json')
const Metals = require('../../sample-data/materials/metals.json')
const Textiles = require('../../sample-data/materials/textiles.json')
const Words = require('../../sample-data/words.json')
const Locations = require('../../sample-data/locations/locations.json')

const router = Router()

router.get('/item', async (req, res) => {
  try {
    let query = { $or: [] }
    let trueCount = 0

    for (const param in req.query) {
      if (req.query[param] === 'true') {
        const queryParam = {}
        queryParam[param] = req.query[param]
        query.$or.push(queryParam)
        trueCount++
      }
    }

    let data = { 
      "items": Items,
      "colors": Colors,
      "qualities": Qualities,
      "materials": Materials,
      "effects": Effects
    }

    // Don't send request to db if requesting all items
    if (trueCount !== 0 && trueCount !== Object.keys(req.query).length) {
      data.items = await Item.find(query).select({ name: 1 })
    }

    if (!data.items) throw new Error('No items found')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/material/stone', async (req, res) => {
  try {
    let data = { stones: Stones.sort((a, b) => a.name.localeCompare(b.name)) }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/material/wood', async (req, res) => {
  try {
    let data = { woods: Woods.sort((a, b) => a.name.localeCompare(b.name)) }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/material/metal', async (req, res) => {
  try {
    let data = { metals: Metals.sort((a, b) => a.name.localeCompare(b.name)) }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/material/textile', async (req, res) => {
  try {
    let data = { textiles: Textiles.sort((a, b) => a.name.localeCompare(b.name)) }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/words', async (req, res) => {
  try {
    res.status(200).json(Words)
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