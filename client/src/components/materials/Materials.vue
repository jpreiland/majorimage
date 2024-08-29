<template>
  <div class="materials-page">
    <div class="columns materials">
      <div :key="'stone-header'" class="column materials head">
        <ul>
          <li class="list-header">
            Stone
          </li>
          <span v-if="false" class="button material-category" @click="cycleCategory('stone')">
            {{ stone.categories[stone.category][0] }}
          </span>
        </ul>
      </div>
      <div :key="'wood-header'" class="column materials head">
        <ul>
          <li class="list-header">
            Wood
          </li>
          <li v-if="false" class="button material-category" @click="cycleCategory('wood')">
            {{ wood.categories[wood.category][0] }}
          </li>
        </ul>
      </div>
      <div :key="'metal-header'" class="column materials head">
        <ul>
          <li class="list-header">
            Metal
          </li>
          <li v-if="false" class="button material-category" @click="cycleCategory('metal')">
            {{ metal.categories[metal.category][0] }}
          </li>
        </ul>
      </div>
      <div :key="'textile-header'" class="column materials head">
        <ul>
          <li class="list-header">
            Textile
          </li>
          <li v-if="false" class="button material-category" @click="cycleCategory('textile')">
            {{ textile.categories[textile.category][0] }}
          </li>
        </ul>
      </div>
    </div>
    <div class="columns materials list">
      <div :key="'stone'" class="column materials">
        <ul>
          <span v-for="(material, matkey) in stone.stones" :key="'stone-'+matkey">
            <li 
              v-if="stone.categories[stone.category][0] === 'All' ? true : material[stone.categories[stone.category][1]]"              
              class="list-item"
              :class="{ 'selected': material === activeMaterial }"
              @click="select(material, 'stone')"
            >
              {{ material.name }}
            </li>
          </span>
        </ul>
      </div>
      <div :key="'wood'" class="column materials">
        <ul>
          <span v-for="(material, matkey) in wood.woods" :key="'wood-'+matkey">
            <li 
              v-if="wood.categories[wood.category][0] === 'All' ? true : material[wood.categories[wood.category][1]]"             
              class="list-item"
              :class="{ 'selected': material === activeMaterial }"
              @click="select(material, 'wood')"
            >
              {{ material.name }}
            </li>
          </span>
        </ul>
      </div>
      <div :key="'metal'" class="column materials">
        <ul>
          <span v-for="(material, key) in metal.metals" :key="'metal-'+key">
            <li 
              v-if="metal.categories[metal.category][0] === 'All' ? true : material[metal.categories[metal.category][1]]"
              class="list-item"
              :class="{ 'selected': material === activeMaterial }"
              @click="select(material, 'metal')"
            >
              {{ material.name }}
            </li>
          </span>
        </ul>
      </div>
      <div :key="'textile'" class="column materials">
        <ul>
          <span v-for="(material, key) in textile.textiles" :key="'textile-'+key">
            <li 
              v-if="textile.categories[textile.category][0] === 'All' ? true : material[textile.categories[textile.category][1]]"
              class="list-item"
              :class="{ 'selected': material === activeMaterial }"
              @click="select(material, 'textile')"
            >
              {{ material.name }}
            </li>
          </span>
        </ul>
      </div>
    </div>
    <div v-if="initialized" style="margin-top: 0.5rem;">
      <MaterialInfoCard :material="activeMaterial" />
    </div>
  </div>
</template>

<script>
import MaterialInfoCard from "./MaterialInfoCard.vue"

export default {
  name: 'Materials',
  components: {
    MaterialInfoCard
  },
  inject: ['data', 'menuSelections'],
  data() {
    return {
      initialized: false,
      stone: {
        category: 0,
        categories: [['Common', 'isCommon'], ['All', true], ['Precious', 'isPrecious'], ['Magical', 'isMagical']],
        stones: []
      },
      wood: {
        category: 0,
        categories: [['Common', 'isCommon'], ['All', true], ['Exotic', 'isExotic'], ['Magical', 'isMagical']],
        woods: []
      },
      metal: {
        category: 0,
        categories: [['Common', 'isCommon'], ['All', true], ['Precious', 'isPrecious'], ['Magical', 'isMagical']],
        metals: []
      },
      textile: {
        category: 0,
        categories: [['Common', 'isCommon'], ['All', true], ['Fabric', 'isFabric'], ['Fur', 'isFur']],
        textiles: []
      },
      activeMaterial: {},
      activeMaterialType: "stone",
      materialTypeDimensions: {
        "stone": 3,
        "wood": 3,
        "metal": 3,
        "textile": 2
      },
      isInInches: true
    }
  },
  async mounted() {
    this.getMaterials()
    if (!this.menuSelections.materials) {
      this.menuSelections.materials = { type: this.activeMaterialType, name: this.stone.stones[0].name }
      this.select(this.stone.stones[0], this.activeMaterialType)
    } else {
      for (let material of this[this.menuSelections.materials.type][this.menuSelections.materials.type+'s']) {
        if (material.name === this.menuSelections.materials.name) {
          this.select(material, this.menuSelections.materials.type)
        }
      }
    }
    this.switchUnits()
    this.initialized = true
  },
  methods: {
    async getMaterials() {
      this.stone.stones = this.data.materials.stones
      this.wood.woods = this.data.materials.woods
      this.metal.metals = this.data.materials.metals
      this.textile.textiles = this.data.materials.textiles
    },
    async cycleCategory(material) {
      switch (material) {
        case 'stone':
          this.stone.category = (this.stone.category + 1) % this.stone.categories.length
          break;
        case 'wood':
          this.wood.category = (this.wood.category + 1) % this.wood.categories.length
          break;
        case 'metal':
          this.metal.category = (this.metal.category + 1) % this.metal.categories.length
          break;
        case 'textile':
          this.textile.category = (this.textile.category + 1) % this.textile.categories.length
          break;
      }
    },
    async select(material, materialType) {
      this.activeMaterial = material
      this.activeMaterialType = materialType
      this.menuSelections.materials = { type: this.activeMaterialType, name: this.activeMaterial.name }
      if (!this.activeMaterial.attributes.units.includes(this.isInInches ? 'in' : 'ft')) {
        this.adjustMaterialUnits(this.materialTypeDimensions[this.activeMaterialType])
      }
    },
    async switchUnits() {
      this.isInInches = !this.isInInches
      this.adjustMaterialUnits(this.materialTypeDimensions[this.activeMaterialType])
    },
    async adjustMaterialUnits(dimension) {
      if (this.isInInches) {
        this.activeMaterial.attributes.row1.Weight.value /= Math.pow(12, dimension)
        // this.activeMaterial.attributes.row1.Cost.value /= Math.pow(12, dimension)  // old display value
      } else {
        this.activeMaterial.attributes.row1.Weight.value *= Math.pow(12, dimension)
        // this.activeMaterial.attributes.row1.Cost.value *= Math.pow(12, dimension)  // old display value
      }

      const dimensionSuperscript = dimension === 3 ? '³' : '²'

      this.activeMaterial.attributes.units = (this.isInInches ? 'in' : 'ft') + dimensionSuperscript
    }
  },
}
</script>

<style>
</style>