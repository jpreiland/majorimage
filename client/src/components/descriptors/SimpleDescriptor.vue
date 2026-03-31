<template>
  <span class="button descriptor name-descriptor" :style="setColor" @click="reroll()">{{ descriptorText }}</span>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { useAppContext } from '../../composables/useAppContext'

interface Props {
  type: string
  color?: string
  a_an?: boolean
  properNoun?: boolean
  pickStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black',
  pickStyle: 'pick'
})

const { data } = useAppContext()

const descriptorText = ref('Simple Descriptor')
let format: string[][] = []
const pickStyles = ref([
  "pick",
  "pick-pluralize",
  "pick-pluralize-optional",
  "pick-pastTense",
  "pick-verber",
  "pick-gerund"
])

onMounted(() => {
  if (props.properNoun) format.push(["title"])
  if (props.a_an) format = [["a(n)"]].concat(format)

  if (pickStyles.value.indexOf(props.pickStyle) >= 0) {
    format.push([props.pickStyle, props.type])
  } else {
    format.push(["pick", props.type])
  }

  reroll()
})

function reroll() {
  if (props.type) descriptorText.value = stitch(format, data, null, null)
}

const setColor = computed(() => {
  return `border-bottom-color: ${props.color};`
})

</script>