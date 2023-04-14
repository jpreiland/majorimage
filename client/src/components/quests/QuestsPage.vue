<template>
  <div class="quests-page" v-if="this.data">
    <Quests />
  </div>
</template>

<script>
import Quests from "./Quests.vue"

export default {
  name: 'QuestsPage',
  components: {
    Quests
  },
  inject: ['data']
}
</script>