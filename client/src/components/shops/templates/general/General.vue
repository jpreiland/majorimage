<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import General1 from './variants/General1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  General1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>