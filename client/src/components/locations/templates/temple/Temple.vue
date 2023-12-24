<template>
  <Temple1 v-if="variants[0]" />
  <Temple2 v-if="variants[1]" />
</template>

<script>
import Temple1 from "./variants/Temple1.vue"
import Temple2 from "./variants/Temple2.vue"

export default {
  name: 'Temple',
  components: {
    Temple1,
    Temple2
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