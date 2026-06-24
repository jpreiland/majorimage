<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import TempleCloud1 from './variants/TempleCloud1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  TempleCloud1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>