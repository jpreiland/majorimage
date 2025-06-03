<template>
  <DungeonRoom1 v-if="variants[0]" />
  <DungeonRoom2 v-if="variants[1]" />
</template>

<script>
import DungeonRoom1 from "./variants/DungeonRoom1.vue"
import DungeonRoom2 from "./variants/DungeonRoom2.vue"

export default {
  name: 'DungeonRoom',
  components: {
    DungeonRoom1,
    DungeonRoom2
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