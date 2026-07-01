<template>
  <div :style="setColor" class="overview overview-title card-header" :class="{ collapsed: closed }" @click="closed = !closed">
    {{ title }}
    <div class="collapse-icon">
        {{ !closed ? '▲' : '▼' }}
    </div>
  </div>

  <div v-if="!closed" class="overview" :style="setColor">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { getCssGradient } from '../../lib/descriptor-utils/descriptor-display-utils'

interface Props {
  title: string
  color?: string | string[]
  initiallyClosed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'bisque'
})

const closed = ref(props.initiallyClosed ?? true)

const setColor = computed(() => {
  if (Array.isArray(props.color)) {
    return {
      '--overview-gradient': getCssGradient(props.color, 90)
    }
  } else {
    return {
      '--overview-gradient': props.color
    }
  }
})

</script>