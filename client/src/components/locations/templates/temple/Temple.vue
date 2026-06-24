<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import Temple1 from './variants/Temple1.vue'
import Temple2 from './variants/Temple2.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  Temple1,
  Temple2
]

const { SelectedVariant } = useRandomVariant(variants)
</script>