<template>
  <div class="magic-page" v-if="this.data">
    <Magic />
  </div>
</template>

<script>
import Magic from "./Magic.vue"

export default {
  name: 'MagicPage',
  components: {
    Magic
  },
  inject: ['data']
}
</script>