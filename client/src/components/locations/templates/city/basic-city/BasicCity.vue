<template>
  <component v-if="initialized" :is="computeVariant"></component>
</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
  name: 'BasicCity',
  inject: ['wordData'],
  data() {
    return {
      types: [],
      activeVariant: {},
      activePath: "",
      initialized: false
    }
  },
  async mounted() {
    for (let key of Object.keys(this.wordData.templates.locations.city['basic-city'])) {
      if (key.startsWith('_')) continue
      this.types.push(key)
    }
    this.activeVariant = this.types[0]
    this.activePath = this.wordData.templates.locations.city['basic-city'][this.activeVariant]._path
    this.initialized = true
  },
  methods: {
    async select(basicCity) {
      this.activeVariant = basicCity._path
    }
  },
  computed: {
    computeVariant () {
      if (this.activePath.includes('..')) return
      return defineAsyncComponent(() => import(`${this.activePath}`))
    }
  }
}
</script>