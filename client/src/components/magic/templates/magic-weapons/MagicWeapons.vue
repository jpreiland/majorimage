<template>
  <component v-if="initialized" :is="loadVariant"></component>
</template>

<script>
import { defineAsyncComponent } from "vue"


export default {
  name: 'MagicWeapons',
  inject: ['data'],
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
      for (let variant of Object.keys(this.data.templates.magic['magic-weapons'])) {
        if (variant.startsWith('_')) continue
        this.variants.push(variant)
      }
    },
    rollVariant() {
      this.activeVariant = Math.floor(Math.random() * this.variants.length)
      this.activePath = this.data.templates.magic['magic-weapons'][this.variants[this.activeVariant]]
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