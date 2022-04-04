const { Schema, model } = require('mongoose')

const MaterialSchema = new Schema( 
  {
    name: {
      type: String,
      required: true,
    }
  }
)

const Material = model('material', MaterialSchema)

module.exports = Material