<template>
  <div>
    {{  paramNumber }}
    <select v-model="selectedFormat" @change="updateFormat(selectedFormat)">
      <option v-for="FormatEntry in formats" :value="FormatEntry">
        {{ FormatEntry }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppContext } from '../../../../../composables/useAppContext'

import type { FormatName } from '../../../../../../../shared/types'
import type { ModelRef, Ref } from 'vue'

interface Props {
  paramNumber: number
}

const props = defineProps<Props>()

const { data } = useAppContext()

const formats = new Set(Object.keys(data.formats))

const defaultFormat: FormatName = 'a(n)-adjectivePerson-tradeNPC'
const formatName: Ref<FormatName> = ref(defaultFormat)
const selectedFormat: ModelRef<FormatName> = defineModel('selectedFormat', { default: defaultFormat })

const emit = defineEmits({
  updatePartParam: ({ selectedFormat, paramNumber }) => {
    // console.log(`validate updatePartParam emit: ${selectedFormat}`)
    return true
  }
})

function updateFormat(selectedFormat: FormatName) {
  formatName.value = selectedFormat
  emit('updatePartParam', { value: selectedFormat, paramNumber: props.paramNumber })
}

updateFormat(selectedFormat.value)

</script>