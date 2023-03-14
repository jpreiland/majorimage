<template>
  <div class="objects-page" v-if="this.wordData">
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