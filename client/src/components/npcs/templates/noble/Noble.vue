<template>
  <component :is="loadVariant" v-if="initialized" />
</template>

<script>
import { defineAsyncComponent } from "vue"


export default {
  name: 'Noble',
  inject: ['data'],
  data() {
    return {
      variants: [],
      activeVariant: 0,
      activePath: "",
      initialized: false
    }
  },
  computed: {
    loadVariant () {
      if (this.activePath.includes('..')) return
      return defineAsyncComponent(() => import(`${this.activePath}`))
    }
  },
  async mounted() {
    this.loadVariants()
    this.rollVariant()
    this.initialized = true
  },
  methods: {
    loadVariants() {
      for (let variant of Object.keys(this.data.templates.npcs.noble)) {
        if (variant.startsWith('_')) continue
        this.variants.push(variant)
      }
    },
    rollVariant() {
      this.activeVariant = Math.floor(Math.random() * this.variants.length)
      this.activePath = this.data.templates.npcs.noble[this.variants[this.activeVariant]]
    }
  }
}
</script>

<style>
</style>