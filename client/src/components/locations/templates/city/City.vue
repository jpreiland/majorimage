<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">icon</h2>
    </div>
    <div class="card-header-right">
      <Descriptor :type="'City'" />
    </div>
    <div class="button">
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
      activePath: "",
      initialized: false
    }
  },
  async mounted() {
    for (let key of Object.keys(this.wordData.templates.locations.city)) {
      if (key.startsWith('_')) continue
      this.types.push(key)
    }
    this.activeSubtype = this.types[0]
    this.activePath = this.wordData.templates.locations.city[this.activeSubtype]._path
    this.initialized = true
  },
  methods: {
    async select(city) {
      this.activeSubtype = city._path
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