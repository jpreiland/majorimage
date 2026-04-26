<template>
  <div>
    {{  paramNumber }}
    <select v-model="selectedDenomination" @change="updateDenomination(selectedDenomination)">
      <option v-for="denominationEntry in denominations" :value="denominationEntry">
        {{ denominationEntry }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { ModelRef, Ref } from 'vue'

interface Props {
  paramNumber: number
}

const props = defineProps<Props>()

const denominations = new Set(['copper', 'silver', 'gold'])

const defaultDenomination: string = 'gold'
const denomination: Ref<string> = ref(defaultDenomination)
const selectedDenomination: ModelRef<string> = defineModel('selectedGroupOrCategory', { default: defaultDenomination })

const emit = defineEmits({
  updatePartParam: ({ selectedDenomination, paramNumber }) => {
    // console.log(`validate updatePartParam emit: ${selectedDenomination}`)
    return true
  }
})

function updateDenomination(selectedDenomination: string) {
  denomination.value = selectedDenomination
  emit('updatePartParam', { value: selectedDenomination, paramNumber: props.paramNumber })
}

updateDenomination(selectedDenomination.value)

</script>