<template>
  <SmallTown1 v-if="variants[0]" />
  <SmallTown2 v-if="variants[1]" />
</template>

<script>
import SmallTown1 from "./variants/SmallTown1.vue"
import SmallTown2 from "./variants/SmallTown2.vue"

export default {
  name: 'SmallTown',
  components: {
    SmallTown1,
    SmallTown2
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