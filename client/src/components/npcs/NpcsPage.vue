<template>
  <div class="npcs-page" v-if="this.data">
    <Npcs />
  </div>
</template>

<script>
import Npcs from "./Npcs.vue"

export default {
  name: 'NpcsPage',
  components: {
    Npcs
  },
  inject: ['data']
}
</script>