const { Schema, model } = require('mongoose')

const ItemSchema = new Schema( 
  {
    name: {
      type: String,
      required: true,
    }
  }
)

const Item = model('item', ItemSchema)

module.exports = Item