<template>
  <span>{{ descriptorText }}</span>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { pickFormat } from '../../lib/descriptor-utils/formats'
import { useAppContext } from '../../composables/useAppContext'

import type { DFMapName, FormatName, NumRangeOverride, NumericString, PriceOverride, WordOverride } from '../../../../shared/types'

interface Props {
  type: DFMapName
  numRangeOverride?: NumRangeOverride
  priceOverride?: PriceOverride
  wordOverride?: WordOverride
  sequencedPick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sequencedPick: true
})

const { data } = useAppContext()

const descriptorText = ref('Descriptor')
const formatMap = ref<Record<NumericString, FormatName>>({})
const totalWeight = ref(0)

onMounted(() => {
  const df = data.dfMap[props.type]

  formatMap.value = df.formatMap
  totalWeight.value = df.totalWeight

  const format = pickFormat(formatMap.value, totalWeight.value)

  descriptorText.value = stitch(
    data.formats[format],
    data,
    props.priceOverride,
    props.numRangeOverride,
    props.wordOverride,
    props.sequencedPick
  )
})
</script>