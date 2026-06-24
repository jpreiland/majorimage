<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Wizard1 from './variants/Wizard1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Wizard1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>