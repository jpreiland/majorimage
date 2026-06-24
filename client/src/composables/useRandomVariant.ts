import { markRaw, onMounted, ref } from 'vue'
import type { Component } from 'vue'

export function useRandomVariant(variants: Component[], seed?: number) {
  const SelectedVariant = ref<Component | null>(null)

  rollVariant()

  function getRandomIndex(length: number) {
    if (seed !== undefined) {
      return seed % length
    }

    return Math.floor(Math.random() * length)
  }

  function rollVariant() {
    if (!variants.length) {
      console.warn('No variants available')
      return
    }

    SelectedVariant.value = markRaw(variants[getRandomIndex(variants.length)])
  }

  return {
    SelectedVariant,
    reroll: rollVariant
  }
}