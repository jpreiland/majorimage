const { Schema, model } = require('mongoose')

const QualitySchema = new Schema( 
  {
    name: {
      type: String,
      required: true,
    }
  }
)

const Quality = model('quality', QualitySchema)

module.exports = Quality