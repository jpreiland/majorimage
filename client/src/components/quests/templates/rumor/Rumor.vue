<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Rumor1 from './variants/Rumor1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Rumor1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>