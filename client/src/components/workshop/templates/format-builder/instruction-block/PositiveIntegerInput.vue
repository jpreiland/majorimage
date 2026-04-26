<template>
  <div>
    {{  paramNumber }}
    <input v-model="integerInput" type="number" min="0" step="1" @change="updateInteger(integerInput)" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { ModelRef, Ref } from 'vue'

interface Props {
  paramNumber: number
}

const props = defineProps<Props>()

const defaultInteger: number = 0
const integer: Ref<number> = ref(defaultInteger)
const integerInput: ModelRef<number> = defineModel('integerInput', { default: defaultInteger })

const emit = defineEmits({
  updatePartParam: ({ integerInput, paramNumber }) => {
    // console.log(`validate updatePartParam emit: ${selectedFormat}`)
    return true
  }
})

function updateInteger(integerInput: number) {
  integer.value = integerInput
  emit('updatePartParam', { value: integerInput, paramNumber: props.paramNumber })
}

updateInteger(integerInput.value)

</script>