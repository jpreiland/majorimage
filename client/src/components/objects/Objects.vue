<template>
  <div id="objects">
    <div class="control">
      <a class="button btn-effect" :class="{ 'is-light': !displayedDescriptors.effect }" @click="toggleDescriptor('effect')">Effect</a>
      <a class="button is-danger" :class="{ 'is-light': !displayedDescriptors.quality }" @click="toggleDescriptor('quality')">Quality</a>
      <a class="button is-success" :class="{ 'is-light': !displayedDescriptors.color }" @click="toggleDescriptor('color')">Color</a>
      <a class="button is-warning" :class="{ 'is-light': !displayedDescriptors.material }" @click="toggleDescriptor('material')">Material</a>
    </div>
    <div class="item-type-filters">
      <div class="control">
        <a class="button filter" :class="{ 'is-light': !params.isArmor }" @click="toggleItemType('isArmor')">Armor</a>
        <a class="button filter" :class="{ 'is-light': !params.isClothing }" @click="toggleItemType('isClothing')">Clothing</a>
        <a class="button filter" :class="{ 'is-light': !params.isContainer }" @click="toggleItemType('isContainer')">Container</a>
        <a class="button filter" :class="{ 'is-light': !params.isFurniture }" @click="toggleItemType('isFurniture')">Furniture</a>
        <a class="button filter" :class="{ 'is-light': !params.isMisc }" @click="toggleItemType('isMisc')">Misc</a>
        <a class="button filter" :class="{ 'is-light': !params.isTreasure }" @click="toggleItemType('isTreasure')">Treasure</a>
        <a class="button filter" :class="{ 'is-light': !params.isWeapon }" @click="toggleItemType('isWeapon')">Weapon</a>
        <a class="button filter" :class="{ 'is-light': !params.isWriting }" @click="toggleItemType('isWriting')">Writing</a>
      </div>
    </div>
    <div>
      <template v-for="row in rows" v-bind:key="'item-'+row.id">
        <ObjectRow :displayed-descriptors="displayedDescriptors" :itemTypes="itemTypes" />
      </template>
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
  inject: ['wordData'],
  data() {
    return {
      displayedDescriptors: {
        item: true,
        color: true,
        quality: true,
        material: false,
        effect: false
      },
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
      armorFormat: ["_armorShield", 1],
      clothingFormat: ["_clothingHeadwear", 1],
      containerFormat: ["_container", 1],
      furnitureFormat: ["_furniture", 1],
      miscFormat: ["_misc", 1],
      treasureFormat: ["_treasure", 1],
      weaponFormat: ["_weapon", 1],
      writingFormat: ["_writing", 1]
    }
  },
  async created() {
    this.compileItemTypes()
    for (let i = 0; i < this.numRows; i++) {
      this.rows.push({id: i})
    }
  },
  methods: {
    async toggleDescriptor(descriptor) {
      this.displayedDescriptors[descriptor] = !this.displayedDescriptors[descriptor]
    },
    async toggleItemType(itemType) {
      this.params[itemType] = !this.params[itemType]
      this.compileItemTypes()
    },
    async compileItemTypes() {
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
          format: this.wordData.formats[nfWeightPair[0]]
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
    }
  }
}
</script>