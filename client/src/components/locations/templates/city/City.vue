<template>
  <component :is="loadVariant" v-if="initialized" />
</template>

<script>
import { defineAsyncComponent } from "vue"


export default {
  name: 'City',
  components: {
  },
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
      return defineAsyncComponent(() => import(`./variants/${this.activePath}.vue`))
    }
  },
  async mounted() {
    this.loadVariants()
    this.rollVariant()
    this.initialized = true
  },
  methods: {
    loadVariants() {
      for (let variant of Object.keys(this.data.templates.locations.city)) {
        if (variant.startsWith('_')) continue
        this.variants.push(variant)
      }
    },
    rollVariant() {
      this.activeVariant = Math.floor(Math.random() * this.variants.length)
      this.activePath = this.data.templates.locations.city[this.variants[this.activeVariant]]
    }
  }
}
</script>