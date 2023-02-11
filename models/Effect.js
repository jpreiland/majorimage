const { Schema, model } = require('mongoose')

const EffectSchema = new Schema( 
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

const Effect = model('effects', EffectSchema)

module.exports = Effect