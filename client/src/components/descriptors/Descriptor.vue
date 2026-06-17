<template>
  <span class="button descriptor name-descriptor" :style="setColor" @click="reroll">
    {{ descriptorText }}
  </span>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { pickFormat } from '../../lib/descriptor-utils/formats'
import { useAppContext } from '../../composables/useAppContext'
import { getCssGradient } from '../../lib/descriptor-utils/descriptor-display-utils'

import type { DFMapName, FormatName, NumRangeOverride, NumericString, PriceOverride, WordOverride } from '../../../../shared/types'

interface Props {
  type: DFMapName
  color?: string | string[]
  numRangeOverride?: NumRangeOverride
  priceOverride?: PriceOverride
  wordOverride?: WordOverride
  sequencedPick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black',
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

  reroll()
})

function reroll() {
  const format = pickFormat(formatMap.value, totalWeight.value)

  descriptorText.value = stitch(
    data.formats[format],
    data,
    props.priceOverride,
    props.numRangeOverride,
    props.wordOverride,
    props.sequencedPick
  )
}

const setColor = computed(() => {
  if (Array.isArray(props.color)) {
    return {
      '--descriptor-gradient': getCssGradient(props.color, 90)
    }
  } else {
    return {
      '--descriptor-gradient': props.color
    }
  }
})

</script>