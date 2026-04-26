<template>
  <div>
    {{  paramNumber }}
    <input v-model="textInput" type="text" @change="updateText(textInput)" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { ModelRef, Ref } from 'vue'

interface Props {
  paramNumber: number
}

const props = defineProps<Props>()

const defaultText: string = ""
const text: Ref<string> = ref(defaultText)
const textInput: ModelRef<string> = defineModel('textInput', { default: defaultText })

const emit = defineEmits({
  updatePartParam: ({ textInput, paramNumber }) => {
    // console.log(`validate updatePartParam emit: ${selectedFormat}`)
    return true
  }
})

function updateText(textInput: string) {
  text.value = textInput
  emit('updatePartParam', { value: textInput, paramNumber: props.paramNumber })
}

updateText(textInput.value)

</script>