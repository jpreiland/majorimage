<template>
  <div class="objects-page" v-if="this.data">
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
  inject: ['data']
}
</script>