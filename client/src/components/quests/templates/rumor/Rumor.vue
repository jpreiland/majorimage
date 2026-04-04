<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import { useRandomVariant } from '../../../../composables/useRandomVariant'

import type { VueModule } from '../../../../types/pages';

const variants = import.meta.glob<VueModule>('./variants/*.vue', { eager: true })
const { SelectedVariant } = useRandomVariant(variants)
</script>