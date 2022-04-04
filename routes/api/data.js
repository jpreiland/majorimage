const { Router } = require('express')
const Item = require ('../../models/Item')
const Color = require ('../../models/Color')
const Quality = require ('../../models/Quality')
const Material = require ('../../models/Material')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const items = await Item.find()
    const colors = await Color.find()
    const qualities = await Quality.find()
    const materials = await Material.find()
    const data = {items, colors, qualities, materials}
    
    if (!items) throw new Error('No items found')
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router