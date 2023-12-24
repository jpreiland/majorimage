<template>
  <City1 v-if="variants[0]" />
  <City2 v-if="variants[1]" />
</template>

<script>
import City1 from "./variants/City1.vue"
import City2 from "./variants/City2.vue"

export default {
  name: 'City',
  components: {
    City1,
    City2
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