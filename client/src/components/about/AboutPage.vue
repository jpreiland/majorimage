<template>
  <div v-if="this.wordData">
    <About />
  </div>
</template>

<script>
import About from "./About.vue"

export default {
  name: 'AboutPage',
  components: {
    About
  },
  inject: ['wordData']
}
</script>