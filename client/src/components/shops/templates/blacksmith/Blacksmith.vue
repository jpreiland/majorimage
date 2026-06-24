<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Blacksmith1 from './variants/Blacksmith1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Blacksmith1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>