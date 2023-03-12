<template>
  <div v-if="this.wordData">
    <Objects />
  </div>
</template>

<script>
import Objects from "./Objects.vue"

export default {
  name: 'ObjectsPage',
  components: {
    Objects
  },
  inject: ['wordData']
}
</script>