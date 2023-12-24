<template>
  <Ship1 v-if="variants[0]" />
  <Ship2 v-if="variants[1]" />
</template>

<script>
import Ship1 from "./variants/Ship1.vue"
import Ship2 from "./variants/Ship2.vue"

export default {
  name: 'Ship',
  components: {
    Ship1,
    Ship2
  },
  inject: ['data'],
  data() {
    return {
      variants: [
        true,
        false
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