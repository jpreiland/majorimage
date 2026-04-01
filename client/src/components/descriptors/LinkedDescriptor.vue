<template>
  <span class="button descriptor name-descriptor" :style="setColor" @click="reroll">
    {{ descriptorText }}
  </span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { pickFormat } from '../../lib/descriptor-utils/formats'
import { useAppContext } from '../../composables/useAppContext'

import type { NumRangeOverride, PriceOverride } from '../../../../shared/types';

interface Props {
  type: string
  color?: string
  numRangeOverride?: NumRangeOverride
  priceOverride?: PriceOverride
  link: string
  linkedParser?: (val: string) => string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black'
})

const { data } = useAppContext()
const descriptorText = ref('Linked Descriptor')
const formatMap = ref<Record<string, number>>({})
const totalWeight = ref(0)

const emit = defineEmits<{
  (e: 'linkUpdate', payload: { linkKey: string; linkVal: string }): void
}>()

onMounted(() => {
  const df = data.dfMap[props.type]

  formatMap.value = df.formatMap
  totalWeight.value = df.totalWeight

  reroll()
})

function reroll() {
  const format = pickFormat(formatMap.value, totalWeight.value)

  descriptorText.value = stitch(
    data.formats[format],
    data,
    props.priceOverride,
    props.numRangeOverride
  )

  const linkResponse = {
    linkKey: props.link,
    linkVal: props.linkedParser
      ? props.linkedParser(descriptorText.value)
      : descriptorText.value,
  }

  emit('linkUpdate', linkResponse)
}

const setColor = computed(() => {
  return `border-bottom-color: ${props.color};`
})
</script>