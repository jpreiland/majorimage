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
    <div>
      <MaterialInfoCard :material="activeMaterial" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import MaterialInfoCard from "./MaterialInfoCard.vue"

export default {
  name: 'Materials',
  components: {
    MaterialInfoCard
  },
  data() {
    return {
      fullLists: false,
      params: {
        stone: { category: 'Common' },
        wood: { category: 'Common' },
        metal: { category: 'Common' },
        textile: { category: 'Common' }
      },
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
      activeMaterial: {
        "name": "Diamond",
        "attributes": {
          "weightCost": {
            "Weight": {"value": 146.8, "units": "lb"},
            "Cost": {"value": 2, "units": "g"}
          },
          "other": {
            "Hardness": {"value": 10},
            "Cost/lb": {"value": 0.1, "units": "g"}
          },
          "units": "in³"
        },
        "image": "https://via.placeholder.com/50",
        "description": "a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper.",
        "uses": "Lorem, ipsum, dolor, sit, and amet.",
        "isCommon": true,
        "isPrecious": true,
        "isMagical": false
      },
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
    this.getAllMaterials()
    this.switchUnits()
  },
  methods: {
    async getAllMaterials() {
      this.getMaterials()
    },
    async getMaterials() {
      const response = await axios.get('api/materials', { params: this.params })
      this.stone.stones = response.data.stones
      this.wood.woods = response.data.woods
      this.metal.metals = response.data.metals
      this.textile.textiles = response.data.textiles
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