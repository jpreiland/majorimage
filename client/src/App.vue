<template>
  <div id="app">
    Major Image
    <div class="control">
      <a class="button is-danger" v-bind:class="{ 'is-light': !displayedDescriptors.quality }" @click="toggleDescriptor('quality')">Quality</a>
      <a class="button is-success" v-bind:class="{ 'is-light': !displayedDescriptors.color }" @click="toggleDescriptor('color')">Color</a>
      <a class="button is-warning" v-bind:class="{ 'is-light': !displayedDescriptors.material }" @click="toggleDescriptor('material')">Material</a>
    </div>
    <div class="control">
      <a class="button" v-bind:class="{ 'is-light': !params.isArmor }" @click="toggleItemType('isArmor')">Armor</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isClothing }" @click="toggleItemType('isClothing')">Clothing</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isContainer }" @click="toggleItemType('isContainer')">Container</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isFurniture }" @click="toggleItemType('isFurniture')">Furniture</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isMisc }" @click="toggleItemType('isMisc')">Misc</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isTreasure }" @click="toggleItemType('isTreasure')">Treasure</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isWeapon }" @click="toggleItemType('isWeapon')">Weapon</a>
      <a class="button" v-bind:class="{ 'is-light': !params.isWriting }" @click="toggleItemType('isWriting')">Writing</a>
    </div>
    <div v-for="row in rows" :key="row.id">
      <div v-if="initialized">
        <span class="button is-info rerollRow" @click="rerollRow(row.id)">➔</span>
        <span class="button qualityName" v-if="displayedDescriptors.quality" @click="pickQuality(row.id)" :key="displayedQualities[row.id].name">{{displayedQualities[row.id].name}}</span>
        <span class="button colorName" v-if="displayedDescriptors.color" @click="pickColor(row.id)" :key="displayedColors[row.id].name">{{displayedColors[row.id].name}}</span>
        <span class="button materialName" v-if="displayedDescriptors.material" @click="pickMaterial(row.id)" :key="displayedMaterials[row.id].name">{{displayedMaterials[row.id].name}}</span>
        <span class="button itemName" v-if="displayedDescriptors.item" @click="pickItem(row.id)" :key="displayedItems[row.id].name">{{displayedItems[row.id].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'App',
  data() {
    return {
      initialized: false,
      items: [],
      displayedDescriptors: {
        item: true,
        color: true,
        quality: true,
        material: false
      },
      params: {
        isArmor: true,
        isClothing: true,
        isContainer: true,
        isFurniture: true,
        isMisc: true,
        isTreasure: true,
        isWeapon: true,
        isWriting: true,
      },
      numRows: 5,
      displayedItems: [],
      displayedColors: [],
      displayedMaterials: [],
      displayedQualities: [],
      rows: []
    }
  },
  async mounted() {
    const response = await axios.get('api/data/', { params: this.params })
    this.items = response.data.items
    this.colors = response.data.colors
    this.materials = response.data.materials
    this.qualities = response.data.qualities

    for (let i = 0; i < this.numRows; i++) {
      this.rerollRow(i)
      this.rows.push({id: i})
    }
  
    this.initialized = true
  },
  methods: {
    async getData() {
      const response = await axios.get('api/data/', { params: this.params })
      this.items = response.data.items
      this.colors = response.data.colors
      this.materials = response.data.materials
      this.qualities = response.data.qualities
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
    },
    async rerollItems() {
      for (let i = 0; i < this.numRows; i++) {
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
    }
  }
}
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 760px;
}
</style>
