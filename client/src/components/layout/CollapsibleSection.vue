<template>
  <div class="collapsible-section">
    <div class="card-header" :class="{ collapsed: closed }" @click="closed = !closed">
      <div class="card-header-left">
        <h2 class="card-title">
          {{ title }}
        </h2>
      </div>

      <div class="collapse-icon">
        {{ !closed ? '▲' : '▼' }}
      </div>
    </div>

    <div v-if="!closed" class="info-panel-description">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  title: string
  initiallyClosed?: boolean
}>()

const closed = ref(props.initiallyClosed ?? true)

</script>