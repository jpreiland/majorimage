<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import SmallTown1 from './variants/SmallTown1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  SmallTown1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>