<template>
  <span class="button descriptor name-descriptor" :style="setColor" @click="reroll">
    {{ descriptorText }}
  </span>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { pickFormat } from '../../lib/descriptor-utils/formats'
import { useAppContext } from '../../composables/useAppContext'

interface Props {
  type: string
  color?: string
  priceOverride?: Record<string, unknown>
  numRangeOverride?: Record<string, unknown>
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black'
})

const { data } = useAppContext()

const descriptorText = ref('Descriptor')
const formatMap = ref<Record<string, number>>({})
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
    props.numRangeOverride
  )
}

const setColor = computed(() => {
  return `border-bottom-color: ${props.color};`
})
</script>