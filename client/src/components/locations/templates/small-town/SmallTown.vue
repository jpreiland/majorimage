<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import SmallTown1 from './variants/SmallTown1.vue'
import SmallTown2 from './variants/SmallTown2.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  SmallTown1,
  SmallTown2
]

const { SelectedVariant } = useRandomVariant(variants)
</script>