<template>
  <button v-if="variants.length > 1" @click="cycleVariant">new city</button>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import City1 from './variants/City1.vue'
import City2 from './variants/City2.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  City1,
  City2
]

const { SelectedVariant, cycleVariant } = useRandomVariant(variants)

</script>