<template>
  <div class="instruction-block">
    <div>{{ formatInstruction }}</div>
    <select v-model="selectedInstructionType" @change="updateInstructionType(selectedInstructionType)">
      <option v-for="instruction in formatInstructionOptions" :value="instruction">
        {{ instruction }}
      </option>
    </select>
    <template v-for="(part, index) in formatInstructions[instructionType].parts" :key="index+partToggle+1">
      <component :is="part" :param-number="index+1" @update-part-param="testEmit" />
    </template>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'

import DenominationDropdown from './DenominationDropdown.vue'
import FormatDropdown from './FormatDropdown.vue'
import GroupOrCategoryDropdown from './GroupOrCategoryDropdown.vue'
import NumberPctInput from './NumberPctInput.vue'
import PositiveIntegerInput from './PositiveIntegerInput.vue'
import TextInput from './TextInput.vue'

import type { ModelRef, Ref } from 'vue'

const formatInstructions = {
  "pick": {
    "parts": [GroupOrCategoryDropdown],
    "description": "Randomly select a word from a group/category."
  },
  "pick-pluralize": {
    "parts": [GroupOrCategoryDropdown],
    "description": "Randomly select a word from a group/category and pluralize it."
  },
  "pick-pluralize-optional": {
    "parts": [GroupOrCategoryDropdown],
    "description": "Randomly select a word from a group/category with 50% chance of pluralizing it."
  },
  "pick-pastTense": {
    "parts": [GroupOrCategoryDropdown],
    "description": "Randomly select a word from a group/category and make it past tense."
  },
  "pick-verber": {
    "parts": [GroupOrCategoryDropdown],
    "description": "Randomly select a word from a group/category and add -er to the end."
  },
  "pick-gerund": {
    "parts": [GroupOrCategoryDropdown],
    "description": "Randomly select a word from a group/category and add -ing to the end."
  },
  "pick-multi": {
    "parts": [GroupOrCategoryDropdown, PositiveIntegerInput, PositiveIntegerInput, NumberPctInput, NumberPctInput],
    "description": "Randomly select a number of words from a group/category within a specified range, with optional parameters for bonus words chance (0.01-0.99), and bonus words chance decay rate (0.01-0.99)."
  },
  "static": {
    "parts": [TextInput],
    "description": "Static text"
  },
  "a(n)": {
    "parts": [],
    "description": "Flag to indicate that the next word should be preceded by 'a' or 'an', or 'some' if it is plural."
  },
  "title": {
    "parts": [],
    "description": "Flag to indicate that the entire output should be converted to title case."
  },
  "number": {
    "parts": [PositiveIntegerInput, PositiveIntegerInput, TextInput],
    "description": "Randomly generate an integer within the specified range, with an optional text parameter to display if the generated number is 0."
  },
  "price": {
    "parts": [PositiveIntegerInput, PositiveIntegerInput, DenominationDropdown],
    "description": "Randomly generate a price within the specified range, with an optional denomination parameter ('silver' or 'gold') to indicate what denomination of currency the price range is specified in (default 'copper')."
  },  
  "format": {
    "parts": [FormatDropdown],
    "description": "Generate output using referenced format."
  },
}

const partToggle = ref(true)
const formatInstructionOptions = Object.keys(formatInstructions)
const defaultInstructionType = formatInstructionOptions[0]
const instructionType: Ref<string> = ref(defaultInstructionType)
const selectedInstructionType: ModelRef<string> = defineModel('selectedInstructionType', { default: 'pick' })

const formatInstruction = ref([defaultInstructionType])

interface Props {
  instructionNumber: number
}

const props = defineProps<Props>()

function updateInstructionType(selectedInstructionType: string) {
  formatInstruction.value.length = 0
  formatInstruction.value[0] = selectedInstructionType
  instructionType.value = selectedInstructionType
  partToggle.value = !partToggle.value
}

const emit = defineEmits({
  emitFormat: ({ formatInstruction }) => {
    return true
  }
})

function testEmit(emitted: { paramNumber: number, value: any}) {
  if (emitted.value !== undefined) {
    formatInstruction.value[emitted.paramNumber] = emitted.value
  }
  validate()
}

function validate() {
  switch (formatInstruction.value[0]) {
    case 'pick':
    case 'pick-pluralize':
    case 'pick-pluralize-optional':
    case 'pick-pastTense':
    case 'pick-verber':
    case 'pick-gerund':
      // do pick validation
      break;
    case 'pick-multi':
      // do pick-multi validation
      break;
    case 'static':
      // console.log('validating static instruction')
      break;
    case 'a(n)':
      // do a(n) validation
      break;
    case 'title':
      // do title validation
      break;
    case 'number':
      if (formatInstruction.value[1] === "" || formatInstruction.value[2] === "" ) {
        console.log('invalid number instruction, missing number range param')
      } else if (formatInstruction.value[1] > formatInstruction.value[2]) {
        console.log('invalid number instruction, min cannot be greater than max')
      }
      if (formatInstruction.value.length === 4 && formatInstruction.value[3] === "") {
        formatInstruction.value.pop();
      }
      break;
    case 'price':
      // do price validation
      break;
    case 'format':
      // do format validation
      break;

    default:
      console.log('invalid format instruction type')
      break;
  }

  emit('emitFormat', { formatInstruction: formatInstruction.value, instructionNumber: props.instructionNumber })
}

validate()

</script>