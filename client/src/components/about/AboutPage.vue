<template>
  <div v-if="this.data">
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
  inject: ['data']
}
</script>