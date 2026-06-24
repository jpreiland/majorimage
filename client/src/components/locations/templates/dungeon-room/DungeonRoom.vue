<template>
  <component v-if="SelectedVariant" :is="SelectedVariant" />
</template>

<script lang="ts" setup>
import DungeonRoom1 from './variants/DungeonRoom1.vue'
import DungeonRoom2 from './variants/DungeonRoom2.vue'

import { useRandomVariant } from '../../../../composables/useRandomVariant'

const variants = [
  DungeonRoom1,
  DungeonRoom2
]

const { SelectedVariant } = useRandomVariant(variants)

</script>