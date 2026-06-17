<template>
  <span class="button descriptor name-descriptor" :style="setColor" @click="reroll">
    {{ descriptorText }}
  </span>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { useAppContext } from '../../composables/useAppContext'
import { getCssGradient } from '../../lib/descriptor-utils/descriptor-display-utils'

import type { CategoryName, GroupName, NumRangeOverride, PriceOverride, WordOverride } from '../../../../shared/types'

interface Props {
  type: GroupName | CategoryName
  color?: string | string[]
  numRangeOverride?: NumRangeOverride
  priceOverride?: PriceOverride
  wordOverride?: WordOverride
  sequencedPick?: boolean
  a_an?: boolean
  properNoun?: boolean
  pickStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black',
  pickStyle: 'pick',
  sequencedPick: true
})

const { data } = useAppContext()
const descriptorText = ref('Simple Descriptor')
let format: any[] = []
const pickStyles = ref([
  'pick',
  'pick-pluralize',
  'pick-pluralize-optional',
  'pick-pastTense',
  'pick-verber',
  'pick-gerund'
])

onMounted(() => {
  if (props.properNoun) format.push(['title'])
  if (props.a_an) format = [['a(n)']].concat(format)

  if (pickStyles.value.indexOf(props.pickStyle) >= 0) {
    format.push([props.pickStyle, props.type])
  } else {
    format.push(['pick', props.type])
  }

  reroll()
})

function reroll() {
  if (props.type) descriptorText.value = stitch(
    format,
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