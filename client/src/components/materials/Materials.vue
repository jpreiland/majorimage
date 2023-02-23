<template>
  <div class="material-page">
    <div class="columns">
      <div class="column header" :key="'stone-header'">
        <ul>
          <li class="material-list-header">Stone</li>
          <span class='button material-category' @click="cycleCategory('stone')">{{ stoneCategories[stoneCategory] }}</span>
        </ul>
      </div>
      <div class="column header" :key="'wood-header'">
        <ul>
          <li class="material-list-header">Wood</li>
          <li class="button material-category" @click="cycleCategory('wood')">{{ woodCategories[woodCategory] }}</li>
        </ul>
      </div>
      <div class="column header" :key="'metal-header'">
        <ul>
          <li class="material-list-header">Metal</li>
          <li class="button material-category" @click="cycleCategory('metal')">{{ metalCategories[metalCategory] }}</li>
        </ul>
      </div>
      <div class="column header" :key="'textile-header'">
        <ul>
          <li class="material-list-header">Textile</li>
          <li class="button material-category" @click="cycleCategory('textile')">{{ textileCategories[textileCategory] }}</li>
        </ul>
      </div>
    </div>
    <div class="columns material-list">
      <div class="column" :key="'stone'">
        <ul>
          <li class="material-list-item" v-for="(material, i) in stones" @click="select(material)" :key="'-stone-'+i">{{ material.name }}</li>
        </ul>
      </div>
      <div class="column" :key="'wood'">
        <ul>
          <li class="material-list-item" v-for="(material, i) in woods" @click="select(material)" :key="'-wood-'+i">{{ material.name }}</li>
        </ul>
      </div>
      <div class="column" :key="'metal'">
        <ul>
          <li class="material-list-item" v-for="(material, i) in metals" @click="select(material)" :key="'-metal-'+i">{{ material.name }}</li>
        </ul>
      </div>
      <div class="column" :key="'textile'">
        <ul>
          <li class="material-list-item" v-for="(material, i) in textiles" @click="select(material)" :key="'-textile-'+i">{{ material.name }}</li>
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
  name: 'App',
  components: {
    MaterialInfoCard
  },
  data() {
    return {
      fullLists: false,
      stoneCategory: 0,
      stoneCategories: ['All', 'Precious', 'Magical'],
      woodCategory: 0,
      woodCategories: ['All', 'Exotic', 'Magical'],
      metalCategory: 0,
      metalCategories: ['All', 'Precious', 'Magical'],
      textileCategory: 0,
      textileCategories: ['All', 'Cloth', 'Fur'],
      stoneParams: { category: 'All' }, 
      woodParams: { category: 'All' }, 
      metalParams: { category: 'All' },
      textileParams: { category: 'All' },
      stones: [],
      woods: [],
      metals: [],
      textiles: [],
      activeMaterial: {
        "name": "Emerald",
        "attributes": {
          "Weight": 103.0,
          "Cost": 57,
          "Hardness": 7
        },
        "image": "https://via.placeholder.com/50",
        "description": "a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper.",
        "uses": "Lorem, ipsum, dolor, sit, and amet.",
        "isCommon": true,
        "isPrecious": true,
        "isMagical": false
    }
    }
  },
  async mounted() {
    this.getAllMaterials()
  },
  methods: {
    async getAllMaterials() {
      this.getStones()
      this.getWoods()
      this.getMetals()
      this.getTextiles()
    },
    async getStones() {
      const response = await axios.get('api/material/stone', { params: this.stoneParams })
      this.stones = response.data.stones
    },
    async getWoods() {
      const response = await axios.get('api/material/wood', { params: this.woodParams })
      this.woods = response.data.woods
    },
    async getMetals() {
      const response = await axios.get('api/material/metal', { params: this.metalParams })
      this.metals = response.data.metals
    },
    async getTextiles() {
      const response = await axios.get('api/material/textile', { params: this.textileParams })
      this.textiles = response.data.textiles
    },
    async cycleCategory(material) {
      switch (material) {
        case 'stone':
          this.stoneCategory = (this.stoneCategory + 1) % this.stoneCategories.length
          break;
        case 'wood':
          this.woodCategory = (this.woodCategory + 1) % this.woodCategories.length
          break;
        case 'metal':
          this.metalCategory = (this.metalCategory + 1) % this.metalCategories.length
          break;
        case 'textile':
          this.textileCategory = (this.textileCategory + 1) % this.textileCategories.length
          break;
      
        default:
          break;
      }
    },
    async select(material) {
      this.activeMaterial = material
    }
  },
}
</script>

<style>
/* Width and height of the scrollbar */
::-webkit-scrollbar {
  width: 5px;
}

/* Background color of the scrollbar */
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

/* Color of the scrollbar thumb */
::-webkit-scrollbar-thumb {
  background-color: #888;
}

/* Hover state of the scrollbar thumb */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

</style>