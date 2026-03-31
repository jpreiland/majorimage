<template>
  <Spells1 v-if="variants[0]" />
</template>

<script lang="ts" setup>
import Spells1 from "./variants/Spells1.vue"

const variants = [true]

function rollVariant() {
  const variantIndex = Math.floor(Math.random() * variants.length) as unknown as string
  for (const i in variants) {
    variants[i] = i == variantIndex ? true : false
  }
}

rollVariant()
</script>