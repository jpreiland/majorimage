<template>
  <div class="materials-page" v-if="this.data">
    <Materials />
  </div>
</template>

<script>
import Materials from "./Materials.vue"

export default {
  name: 'MaterialsPage',
  components: {
    Materials
  },
  inject: ['data']
}
</script>