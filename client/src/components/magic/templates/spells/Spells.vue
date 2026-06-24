<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Spells1 from './variants/Spells1.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Spells1
]

const { SelectedVariant } = useRandomVariant(variants)

</script>