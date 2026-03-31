<template>
  <div class="info-panel-description" style="text-align: center; margin-top: 5rem;">
    <p>Page not found</p>
    <p v-if="data">
      May we offer you <Descriptor :type="'TestA(n)'" /> in this trying time?
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useAppContext } from '../../composables/useAppContext'
const { data } = useAppContext()
</script>