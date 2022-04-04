const { Schema, model } = require('mongoose')

const ColorSchema = new Schema( 
  {
    name: {
      type: String,
      required: true,
    }
  }
)

const Color = model('color', ColorSchema)

module.exports = Color