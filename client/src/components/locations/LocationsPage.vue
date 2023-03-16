<template>
  <div class="locations-page" v-if="this.data">
    <Locations />
  </div>
</template>

<script>
import Locations from "./Locations.vue"

export default {
  name: 'LocationsPage',
  components: {
    Locations
  },
  inject: ['data']
}
</script>