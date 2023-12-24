<template>
  <Blacksmith1 v-if="variants[0]" />
</template>

<script>
import Blacksmith1 from "./variants/Blacksmith1.vue"

export default {
  name: 'Blacksmith',
  components: {
    Blacksmith1
  },
  inject: ['data'],
  data() {
    return {
      variants: [
        true
      ]
    }
  },
  async mounted() {
    this.rollVariant()
  },
  methods: {
    rollVariant() {
      const variant = Math.floor(Math.random() * this.variants.length)
      for (let i in this.variants) {
        this.variants[i] = i == variant ? true : false
      }
    }
  }
}
</script>