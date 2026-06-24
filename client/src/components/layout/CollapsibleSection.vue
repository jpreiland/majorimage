<template>
  <div class="collapsible-section">
    <div class="card-header" :class="{ collapsed: !open }" @click="open = !open">
      <div class="card-header-left">
        <h2 class="card-title">
          {{ title }}
        </h2>
      </div>

      <div class="collapse-icon">
        {{ open ? '▲' : '▼' }}
      </div>
    </div>

    <div v-if="open" class="info-panel-description">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  initiallyOpen?: boolean
}>()

const open = ref(props.initiallyOpen ?? true)

</script>