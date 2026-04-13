<template>
  <span class="button descriptor name-descriptor" :style="setColor" @click="reroll">
    {{ descriptorText }}
  </span>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { useAppContext } from '../../composables/useAppContext'

import type { Format, FormatName, NumRangeOverride, PriceOverride } from '../../../../shared/types'

interface Props {
  filteredFormats: Record<string, {weight: number, format: Format}>
  formatPicker: FormatName[]
  color?: string
  numRangeOverride?: NumRangeOverride
  priceOverride?: PriceOverride
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black'
})

const { data } = useAppContext()

const descriptorText = ref('Filtered Descriptor')

onMounted(() => {
  reroll()
})

function reroll() {
  const format: FormatName = props.formatPicker[Math.floor(Math.random() * props.formatPicker.length)]

  descriptorText.value = stitch(
    props.filteredFormats[format].format,
    data,
    props.priceOverride,
    props.numRangeOverride
    )
}

const setColor = computed(() => {
  return `border-bottom-color: ${props.color};`
})
</script>