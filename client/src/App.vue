<template>
  <div id="app">
    Major Image
    <div class="control">
      <a class="button btn-effect" v-bind:class="{ 'is-light': !displayedDescriptors.effect }" v-on:click="toggleDescriptor('effect')">Effect</a>
      <a class="button is-danger" v-bind:class="{ 'is-light': !displayedDescriptors.quality }" v-on:click="toggleDescriptor('quality')">Quality</a>
      <a class="button is-success" v-bind:class="{ 'is-light': !displayedDescriptors.color }" v-on:click="toggleDescriptor('color')">Color</a>
      <a class="button is-warning" v-bind:class="{ 'is-light': !displayedDescriptors.material }" v-on:click="toggleDescriptor('material')">Material</a>
    </div>
    <div class="item-type-filters">
      <div class="control">
        <a class="button" v-bind:class="{ 'is-light': !params.isArmor }" v-on:click="toggleItemType('isArmor')">Armor</a>
        <a class="button" v-bind:class="{ 'is-light': !params.isClothing }" v-on:click="toggleItemType('isClothing')">Clothing</a>
        <a class="button" v-bind:class="{ 'is-light': !params.isContainer }" v-on:click="toggleItemType('isContainer')">Container</a>
        <a class="button" v-bind:class="{ 'is-light': !params.isFurniture }" v-on:click="toggleItemType('isFurniture')">Furniture</a>
        <a class="button" v-bind:class="{ 'is-light': !params.isMisc }" v-on:click="toggleItemType('isMisc')">Misc</a>
        <a class="button" v-bind:class="{ 'is-light': !params.isTreasure }" v-on:click="toggleItemType('isTreasure')">Treasure</a>
        <a class="button" v-bind:class="{ 'is-light': !params.isWeapon }" v-on:click="toggleItemType('isWeapon')">Weapon</a>
        <a class="button" v-bind:class="{ 'is-light': !params.isWriting }" v-on:click="toggleItemType('isWriting')">Writing</a>
      </div>
    </div>
    <div v-if="initialized">
      <template v-for="row in rows" v-bind:key="row.id">
        <ObjectRow  v-bind:rowId="row.id"
                    v-bind:displayed-descriptors="displayedDescriptors"
                    v-bind:effect="displayedEffects[row.id].name"
                    v-bind:quality="displayedQualities[row.id].name"
                    v-bind:color="displayedColors[row.id].name"
                    v-bind:material="displayedMaterials[row.id].name"
                    v-bind:item="displayedItems[row.id].name"
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
import ObjectRow from "./components/ObjectRow.vue"

export default {
  name: 'App',
  components: {
    ObjectRow: ObjectRow
  },
  data() {
    return {
      initialized: false,
      items: [],
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
      numRows: 20,
      displayedItems: [],
      displayedColors: [],
      displayedMaterials: [],
      displayedQualities: [],
      displayedEffects: [],
      rows: []
    }
  },
  async mounted() {
    const response = await axios.get('api/data/', { params: this.params })
    this.items = response.data.items
    this.colors = response.data.colors
    this.materials = response.data.materials
    this.qualities = response.data.qualities
    this.effects = response.data.effects

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
    },
    async pickEffect(rowNum) {
      this.displayedEffects[rowNum] = this.effects[Math.floor(Math.random() * this.effects.length)]
    }
  }
}
</script>

<style>
#app {
  margin: auto;
  margin-top: 1rem;
  max-width: 50rem;
}
@media (max-width: 390px) {
  html {
    font-size: .6em;
  }
}
.button {
  margin: 1px;
}
.descriptor {
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 0px;
  border-bottom: 4px solid;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
.effect {
  border-bottom-color: #6800df;
}
.quality {
  border-bottom-color: #ef2e55;
}
.q2 {
  border-bottom-color: #fcd4dc;
}
.color {
  border-bottom-color: #3abb81;
}
.material {
  border-bottom-color: #ffe08a;
}
.item {
  border-bottom-color: #3e8ed0;
}
.item-type-filters {
  background-color: lightsteelblue;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.button.btn-effect {
    background-color: #6800df;
    color: #fff;
}
.button.btn-effect.is-light {
    background-color: #e4cdff;
    color: #43008f;
}
</style>
