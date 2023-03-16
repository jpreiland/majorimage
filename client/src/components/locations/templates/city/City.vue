<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">icon</h2>
    </div>
    <div class="card-header-right">
      <Descriptor :type="'City'" />
    </div>
    <div class="button" @click="select">
      pick...
    </div>
  </div>
  <CityOverview />
  <component v-if="initialized" :is="computeSubtype"></component>
</template>

<script>
import { defineAsyncComponent } from "vue"
import CityOverview from "./CityOverview.vue"

export default {
  name: 'City',
  components: {
    CityOverview
  },
  inject: ['wordData'],
  data() {
    return {
      types: [],
      activeSubtype: {},
      activeSubtypeVariants: [],
      activeVariant: 0,
      activePath: "",
      initialized: false
    }
  },
  async mounted() {
    for (let subType of Object.keys(this.wordData.templates.locations.city)) {
      if (subType.startsWith('_')) continue
      this.types.push(subType)
    }
    this.activeSubtype = this.types[0]
    for (let variant of Object.keys(this.wordData.templates.locations.city[this.activeSubtype])) {
      if (variant.startsWith('_')) continue
      this.activeSubtypeVariants.push(variant)
    }
    this.activeVariant = Math.floor(Math.random() * this.activeSubtypeVariants.length)
    this.activePath = this.wordData.templates.locations.city[this.activeSubtype][this.activeSubtypeVariants[this.activeVariant]]
    this.initialized = true
  },
  methods: {
    async select(subType) {
      this.activeVariant = Math.floor(Math.random() * this.activeSubtypeVariants.length)
      this.activePath = this.wordData.templates.locations.city[this.activeSubtype][this.activeSubtypeVariants[this.activeVariant]]
    }
  },
  computed: {
    computeSubtype () {
      if (this.activePath.includes('..')) return
      return defineAsyncComponent(() => import(`${this.activePath}`))
    }
  }
}
</script>

<style>
</style>