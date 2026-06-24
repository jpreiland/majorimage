<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Noble1 from './variants/Noble1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Noble1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>