<template>
  <div>
    <div class="item-type-filters">
      <div class="control">
        <a class="button filter" :class="{ 'is-light': !params.isArmor }" @click="toggleItemType('isArmor')">Armor</a>
        <a class="button filter" :class="{ 'is-light': !params.isClothing }" @click="toggleItemType('isClothing')">Clothing</a>
        <a class="button filter" :class="{ 'is-light': !params.isContainer }" @click="toggleItemType('isContainer')">Container</a>
        <a class="button filter" :class="{ 'is-light': !params.isFurniture }" @click="toggleItemType('isFurniture')">Furniture</a>
        <br />
        <a class="button filter" :class="{ 'is-light': !params.isMisc }" @click="toggleItemType('isMisc')">Misc</a>
        <a class="button filter" :class="{ 'is-light': !params.isTreasure }" @click="toggleItemType('isTreasure')">Treasure</a>
        <a class="button filter" :class="{ 'is-light': !params.isWeapon }" @click="toggleItemType('isWeapon')">Weapon</a>
        <a class="button filter" :class="{ 'is-light': !params.isWriting }" @click="toggleItemType('isWriting')">Writing</a>
      </div>
    </div>
    <div>
      <template v-for="row in rows" :key="'item-'+row.id+'-'+rerollToggle">
        <ObjectRow :itemTypes="itemTypes" />
      </template>
    </div>
    <div class="center">
      <button class="button reroll-all" @click="rerollAll()">Reroll All</button>
    </div>
  </div>
</template>

<script>
import ObjectRow from "./ObjectRow.vue"

export default {
  name: 'Objects',
  components: {
    ObjectRow
  },
  inject: ['data'],
  data() {
    return {
      params: {
        isArmor: false,
        isClothing: false,
        isContainer: false,
        isFurniture: false,
        isMisc: false,
        isTreasure: false,
        isWeapon: false,
        isWriting: false,
      },
      itemTypes: {
        compiled: false,
        formatPicker: [],
        formats: {}
      },
      numRows: 12,
      rows: [],
      itemFormats: [],
      armorFormat: ["_armorShieldUntyped", 1],
      clothingFormat: ["_clothingHeadwear", 1],
      containerFormat: ["_container", 1],
      furnitureFormat: ["_furniture", 1],
      miscFormat: ["_misc", 1],
      treasureFormat: ["_treasure", 1],
      weaponFormat: ["_weapon", 1],
      writingFormat: ["_writing", 1],
      rerollToggle: true
    }
  },
  async created() {
    this.compileItemTypes()
    for (let i = 0; i < this.numRows; i++) {
      this.rows.push({id: i})
    }
  },
  methods: {
    async toggleItemType(itemType) {
      this.params[itemType] = !this.params[itemType]
      this.compileItemTypes()
    },
    async compileItemTypes() {
      // TODO fix this to work with new nested groups
      this.itemTypes.compiled = false
      this.itemFormats = []

      this.itemFormats = await this.applyItemFilters()      
      this.itemTypes.formats = await this.compileDescriptorFormats()
      this.itemTypes.formatPicker = await this.buildFormatPicker()

      this.itemTypes.compiled = true
    },
    async applyItemFilters() {
      let itemFormats = []

      for (let param of Object.keys(this.params)) {
        switch (param) {
          case 'isArmor':
            if (this.params[param]) itemFormats.push(this.armorFormat)
            break;
          
          case 'isClothing':
            if (this.params[param]) itemFormats.push(this.clothingFormat)
            break;

          case 'isContainer':
            if (this.params[param]) itemFormats.push(this.containerFormat)
            break;

          case 'isFurniture':
            if (this.params[param]) itemFormats.push(this.furnitureFormat)
            break;
          
          case 'isMisc':
            if (this.params[param]) itemFormats.push(this.miscFormat)
            break;

          case 'isTreasure':
            if (this.params[param]) itemFormats.push(this.treasureFormat)
            break;

          case 'isWeapon':
            if (this.params[param]) itemFormats.push(this.weaponFormat)
            break;

          case 'isWriting':
            if (this.params[param]) itemFormats.push(this.writingFormat)
            break;
        
        
          default:
            break;
        }
      }

      // if all filters are off, get all item types
      if (itemFormats.length === 0) {
        itemFormats.push(
          this.armorFormat,
          this.clothingFormat,
          this.containerFormat,
          this.furnitureFormat,
          this.miscFormat,
          this.treasureFormat,
          this.weaponFormat,
          this.writingFormat
        )
      }

      return itemFormats
    },
    async compileDescriptorFormats() {
      let compiledDescriptorFormats = {}

      for (let nfWeightPair of this.itemFormats) {
        compiledDescriptorFormats[nfWeightPair[0]] = {
          weight: nfWeightPair[1],
          format: this.data.formats[nfWeightPair[0]]
        }
      }
    
      return compiledDescriptorFormats
    },
    async buildFormatPicker() {
      let formatPicker = []
      for (let format of Object.keys(this.itemTypes.formats)) {
        formatPicker = formatPicker.concat(Array(this.itemTypes.formats[format].weight).fill(format))
      }
      return formatPicker
    },
    async rerollAll() {
      this.rerollToggle = !this.rerollToggle
    }
  }
}
</script>