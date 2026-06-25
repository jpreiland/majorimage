<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Ship1 from './variants/Ship1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Ship1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>