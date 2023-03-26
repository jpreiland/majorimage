<template>
  <div class="shops-page" v-if="this.data">
    <Shops />
  </div>
</template>

<script>
import Shops from "./Shops.vue"

export default {
  name: 'ShopsPage',
  components: {
    Shops
  },
  inject: ['data']
}
</script>