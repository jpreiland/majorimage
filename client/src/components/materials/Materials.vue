<template>
  <div class="materials-page">
    <div class="columns materials">
      <div class="column materials header" :key="'stone-header'">
        <ul>
          <li class="list-header">Stone</li>
          <span v-if="false" class='button material-category' @click="cycleCategory('stone')">{{ stone.categories[stone.category][0] }}</span>
        </ul>
      </div>
      <div class="column materials header" :key="'wood-header'">
        <ul>
          <li class="list-header">Wood</li>
          <li v-if="false" class="button material-category" @click="cycleCategory('wood')">{{ wood.categories[wood.category][0] }}</li>
        </ul>
      </div>
      <div class="column materials header" :key="'metal-header'">
        <ul>
          <li class="list-header">Metal</li>
          <li v-if="false" class="button material-category" @click="cycleCategory('metal')">{{ metal.categories[metal.category][0] }}</li>
        </ul>
      </div>
      <div class="column materials header" :key="'textile-header'">
        <ul>
          <li class="list-header">Textile</li>
          <li v-if="false" class="button material-category" @click="cycleCategory('textile')">{{ textile.categories[textile.category][0] }}</li>
        </ul>
      </div>
    </div>
    <div class="columns materials list">
      <div class="column materials" :key="'stone'">
        <ul>
          <span v-for="(material, i) in stone.stones">
          <li v-if="stone.categories[stone.category][0] === 'All' ? true : material[stone.categories[stone.category][1]]" class="list-item"  
              @click="select(material, 'stone')" :key="'-stone-'+i">{{ material.name }}</li>
          </span>
        </ul>
      </div>
      <div class="column materials" :key="'wood'">
        <ul>
          <span v-for="(material, i) in wood.woods">
          <li v-if="wood.categories[wood.category][0] === 'All' ? true : material[wood.categories[wood.category][1]]" class="list-item"  
              @click="select(material, 'wood')" :key="'-wood-'+i">{{ material.name }}</li>
          </span>
        </ul>
      </div>
      <div class="column materials" :key="'metal'">
        <ul>
          <span v-for="(material, i) in metal.metals">
          <li v-if="metal.categories[metal.category][0] === 'All' ? true : material[metal.categories[metal.category][1]]" class="list-item"  
              @click="select(material, 'metal')" :key="'-metal-'+i">{{ material.name }}</li>
          </span>
        </ul>
      </div>
      <div class="column materials" :key="'textile'">
        <ul>
          <span v-for="(material, i) in textile.textiles">
          <li v-if="textile.categories[textile.category][0] === 'All' ? true : material[textile.categories[textile.category][1]]" class="list-item"  
              @click="select(material, 'textile')" :key="'-textile-'+i">{{ material.name }}</li>
          </span>
        </ul>
      </div>
    </div>
    <div v-if="initialized">
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
  inject: ['data'],
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
    this.select(this.stone.stones[0], this.activeMaterialType)
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
        this.activeMaterial.attributes.weightCost.Weight.value /= Math.pow(12, dimension)
        this.activeMaterial.attributes.weightCost.Cost.value /= Math.pow(12, dimension)
      } else {
        this.activeMaterial.attributes.weightCost.Weight.value *= Math.pow(12, dimension)
        this.activeMaterial.attributes.weightCost.Cost.value *= Math.pow(12, dimension)
      }

      const dimensionSuperscript = dimension === 3 ? '³' : '²'

      this.activeMaterial.attributes.units = (this.isInInches ? 'in' : 'ft') + dimensionSuperscript
    }
  },
}
</script>

<style>
</style>