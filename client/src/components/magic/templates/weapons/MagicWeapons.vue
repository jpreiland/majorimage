<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import MagicWeapons1 from './variants/MagicWeapons1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  MagicWeapons1
]

const { SelectedVariant } = useRandomVariant(variants)

</script>