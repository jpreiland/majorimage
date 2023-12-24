<template>
  <Wanted1 v-if="variants[0]" />
</template>

<script>
import Wanted1 from "./variants/Wanted1.vue"

export default {
  name: 'Wanted',
  components: {
    Wanted1
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