<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">
        Format Builder
      </h2>
    </div>
  </div>
  <div class="info-panel-description">
    <div>
      <input type="number" min="1" max="10" step="1" v-model="numInstructions" @change="rerollAll()" />
    </div>
    <div>
      <p v-for="instruction in instructions">
        <FormatInstructionBlock :instruction-number="instruction.index" @emit-format="handleInstructionBlock" />
      </p>
    </div>
    <div>
      {{ builtFormat }}
    </div>
    <div>
      <p v-for="descriptor in Descriptors" :key="descriptor.id">
        <FilteredDescriptor 
          :key="'FD-' + descriptor.id + '-' + rerollToggle" 
          :filtered-formats="filteredFormats" 
          :format-picker="formatPicker" 
          :color="'#70c947'"
        />
      </p>
    </div>
  </div>
  <div class="center">
    <button class="button info-panel reroll-all" @click="rerollAll">
      Reroll All
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import FormatInstructionBlock from '../instruction-block/FormatInstructionBlock.vue'

import type { Format, FormatInstruction, FormatName } from '../../../../../../../shared/types';
import type { ComputedRef, Ref } from 'vue';

const Descriptors = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
const rerollToggle = ref(true)
const builtFormatName = "formatBuilderFormat"
const builtFormat: Ref<Format> = ref([['pick', 'accessory']])
const formatPicker = [builtFormatName as FormatName]

const filteredFormats: ComputedRef<Record<string, {weight: number, format: Format}>> = computed(() => {
  const filteredFormats: Record<string, {weight: number, format: Format}> = {}
  filteredFormats[builtFormatName] = { weight: 1, format: builtFormat.value }
  return filteredFormats
})

const numInstructions = ref(1)

const instructions = computed(() => {
  const instructions = []
  for (let i = 1; i <= numInstructions.value; i++) {
    instructions.push({index: i})
  }
  if (instructions.length < builtFormat.value.length) {
    builtFormat.value.length = instructions.length
  }
  return instructions
})

function rerollAll() {
  rerollToggle.value = !rerollToggle.value
}

function handleInstructionBlock(emitted: { formatInstruction: FormatInstruction, instructionNumber: number}) {
  builtFormat.value[emitted.instructionNumber-1] = emitted.formatInstruction
  rerollAll()
}

</script>