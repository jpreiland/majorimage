<template>
  <div>
    {{  paramNumber }}
    <input v-model="numberPctInput" type="number" min="0.01" max="0.99" step="0.01" @change="updateNumberPct(numberPctInput)" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { ModelRef, Ref } from 'vue'

interface Props {
  paramNumber: number
}

const props = defineProps<Props>()

const defaultNumberPct: number = 0.01
const numberPct: Ref<number> = ref(defaultNumberPct)
const numberPctInput: ModelRef<number> = defineModel('numberPctInput', { default: undefined })

const emit = defineEmits({
  updatePartParam: ({ value, paramNumber }) => {
    if (value >= 0.01 && value <= 0.99 || !value) {
      return true
    } else { return false }
  }
})

function updateNumberPct(numberPctInput: number) {
  numberPct.value = numberPctInput
  console.log(numberPct.value)
  emit('updatePartParam', { value: numberPctInput, paramNumber: props.paramNumber })
}

updateNumberPct(numberPctInput.value)

</script>