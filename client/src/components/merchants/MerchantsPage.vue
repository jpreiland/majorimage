<template>
  <div class="merchants-page" v-if="this.data">
    <Merchants />
  </div>
</template>

<script>
import Merchants from "./Merchants.vue"

export default {
  name: 'MerchantsPage',
  components: {
    Merchants
  },
  inject: ['data']
}
</script>