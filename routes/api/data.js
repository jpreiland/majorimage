const { Router } = require('express')
const Item = require ('../../models/Item')
const Color = require ('../../models/Color')
const Quality = require ('../../models/Quality')
const Material = require ('../../models/Material')

const router = Router()

router.get('/', async (req, res) => {
  try {
    // build query
    let query = { $or: [ ] }
    for (const param in req.query) {
      if (req.query[param] === 'true') {
        let queryParam = {};
        queryParam[param] = req.query[param]
        query.$or.push(queryParam)
      }
    }
    console.log(`Get data with query: ${JSON.stringify(query)}`)

    const items = await Item.find(query)
    const colors = await Color.find(query)
    const qualities = await Quality.find(query)
    const materials = await Material.find(query)
    const data = {items, colors, qualities, materials}
    
    if (!items) throw new Error('No items found')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.get('/furniture', async (req, res) => {
  try {
    // const query = req.params.query
    // console.log('query:')
    // console.log(query)

    const items = await Item.find({isFurniture: true})
    const data = {items}
    
    if (!items) throw new Error('No items found')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router