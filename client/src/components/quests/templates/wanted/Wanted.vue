<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Wanted1 from './variants/Wanted1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Wanted1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>