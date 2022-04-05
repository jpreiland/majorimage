const { Schema, model } = require('mongoose')

const QualitySchema = new Schema( 
  {
    name: {
      type: String,
      required: true,
    },
    isArmor: {
      type: Boolean,
    },
    isClothing: {
      type: Boolean,
    },
    isContainer: {
      type: Boolean,
    },
    isFurniture: {
      type: Boolean,
    },
    isMisc: {
      type: Boolean,
    },
    isTreasure: {
      type: Boolean,
    },
    isWeapon: {
      type: Boolean,
    },
    isWriting: {
      type: Boolean,
    }
  }
)

const Quality = model('qualities', QualitySchema)

module.exports = Quality