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
    <div v-if="initialized">
      <template v-for="row in rows" v-bind:key="'item-'+row.id">
        <ObjectRow  :rowId="row.id"
                    :displayed-descriptors="displayedDescriptors"
                    :effect="displayedEffects[row.id].name"
                    :quality="displayedQualities[row.id].name"
                    :color="displayedColors[row.id].name"
                    :material="displayedMaterials[row.id].name"
                    :item="displayedItems[row.id].name"
                    @reroll-row="rerollRow(row.id)"
                    @pick-effect="pickEffect(row.id)"
                    @pick-quality="pickQuality(row.id)"
                    @pick-color="pickColor(row.id)"
                    @pick-material="pickMaterial(row.id)"
                    @pick-item="pickItem(row.id)" />
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import ObjectRow from "./ObjectRow.vue"

export default {
  name: 'App',
  components: {
    ObjectRow: ObjectRow
  },
  data() {
    return {
      initialized: false,
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
      numRows: 18,
      displayedItems: [],
      displayedColors: [],
      displayedMaterials: [],
      displayedQualities: [],
      displayedEffects: [],
      rows: []
    }
  },
  async mounted() {
    const response = await axios.get('api/item', { params: this.params })
    this.items = response.data.items
    this.colors = response.data.colors
    this.materials = response.data.materials
    this.qualities = response.data.qualities
    this.effects = response.data.effects

    for (let i of Array(this.numRows).keys()) {
      this.rerollRow(i)
      this.rows.push({id: i})
    }
  
    this.initialized = true
  },
  methods: {
    async getData() {
      const response = await axios.get('api/item', { params: this.params })
      this.items = response.data.items
      this.colors = response.data.colors
      this.materials = response.data.materials
      this.qualities = response.data.qualities
      this.effects = response.data.effects
    },
    async toggleDescriptor(descriptor) {
      this.displayedDescriptors[descriptor] = !this.displayedDescriptors[descriptor]
    },
    async toggleItemType(itemType) {
      this.params[itemType] = !this.params[itemType]
      await this.getData()
      this.rerollItems()
    },
    async rerollRow(rowNum) {
      this.pickItem(rowNum)
      this.pickColor(rowNum)
      this.pickMaterial(rowNum)
      this.pickQuality(rowNum)
      this.pickEffect(rowNum)
    },
    async rerollItems() {
      for (let i of Array(this.numRows).keys()) {
        this.pickItem(i)
      }
    },
    async pickItem(rowNum) {
      this.displayedItems[rowNum] = this.items[Math.floor(Math.random() * this.items.length)]
    },
    async pickColor(rowNum) {
      this.displayedColors[rowNum] = this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    async pickMaterial(rowNum) {
      this.displayedMaterials[rowNum] = this.materials[Math.floor(Math.random() * this.materials.length)]
    },
    async pickQuality(rowNum) {
      this.displayedQualities[rowNum] = this.qualities[Math.floor(Math.random() * this.qualities.length)]
    },
    async pickEffect(rowNum) {
      this.displayedEffects[rowNum] = this.effects[Math.floor(Math.random() * this.effects.length)]
    }
  }
}
</script>