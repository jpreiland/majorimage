<template>
  <div id="materials">
    materials...
    <!-- toggle switch for short/full lists -->
    <!-- 4x material columns -->
      <!-- title (stone, wood, metal, ...) -->
      <!-- category (all, precious, magical, ...) -->
      <!-- material list, selectable  -->
    <!-- info panel -->
  </div>
</template>

<script>
import axios from "axios"
import ObjectRow from "./MaterialRow.vue"

export default {
  name: 'App',
  components: {
    ObjectRow: ObjectRow
  },
  data() {
    return {
      initialized: false,
      fullLists: false,
      stoneParams: {}, // isPrecious: bool, isMagical: bool
      woodParams: {}, // isPrecious: bool, isMagical: bool
      metalParams: {}, // isExotic: bool, isMagical: bool
      textileParams: {}, // isCloth: bool, isFur: bool
      stones: [],
      woods: [],
      metals: [],
      textiles: []
    }
  },
  async mounted() {
    // get all materials
    // const response = await axios.get('api/materials', {})
  
    this.initialized = true
  },
  methods: {
    async getAllMaterials() {
      // const response = await axios.get('api/material', { params: [this.stoneParams, this.woodParams, this.metalParams, this.textileParams] })
    },
    async getStones() {
      // const response = await axios.get('api/material/stone', { params: this.stoneParams })
    },
    async getWoods() {
      // const response = await axios.get('api/material/wood', { params: this.woodParams })
    },
    async getMetals() {
      // const response = await axios.get('api/material/metal', { params: this.metalParams })
    },
    async getTextiles() {
      // const response = await axios.get('api/material/textile', { params: this.textileParams })
    },
    async select(material) {
      // set info panel fields to material's values
    }
  }
}
</script>