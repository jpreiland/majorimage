<template>
  <MagicWeapons1 v-if="variants[0]" />
</template>

<script>
import MagicWeapons1 from "./variants/MagicWeapons1.vue"

export default {
  name: 'MagicWeapons',
  components: {
    MagicWeapons1
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