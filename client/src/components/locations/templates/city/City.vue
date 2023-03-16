<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">icon</h2>
    </div>
    <div class="card-header-right">
      <Descriptor :type="'City'" />
    </div>
  </div>
  <CityOverview />
  <component v-if="initialized" :is="loadVariant"></component>
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
      variants: [],
      activeVariant: 0,
      activePath: "",
      initialized: false
    }
  },
  async mounted() {
    this.loadVariants()
    this.rollVariant()
    this.initialized = true
  },
  methods: {
    loadVariants() {
      for (let variant of Object.keys(this.wordData.templates.locations.city)) {
        if (variant.startsWith('_')) continue
        this.variants.push(variant)
      }
    },
    rollVariant() {
      this.activeVariant = Math.floor(Math.random() * this.variants.length)
      this.activePath = this.wordData.templates.locations.city[this.variants[this.activeVariant]]
    }
  },
  computed: {
    loadVariant () {
      if (this.activePath.includes('..')) return
      return defineAsyncComponent(() => import(`${this.activePath}`))
    }
  }
}
</script>

<style>
</style>