<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import NPCCloud1 from './variants/NPCCloud1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  NPCCloud1
]

const { SelectedVariant } = useRandomVariant(variants)
</script>