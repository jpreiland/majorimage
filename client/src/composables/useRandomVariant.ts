import { markRaw } from 'vue'
import { onMounted, ref } from 'vue'

type VariantModule = {
  default: any
}

export function useRandomVariant(globImport: Record<string, any>, seed?: number) {
  const SelectedVariant = ref<any>(null)
  const variantKeys = ref<string[]>([])

   function initKeys() {
    let keys = Object.keys(globImport)

    variantKeys.value = keys
  }

  function getRandomIndex(length: number) {
    if (seed !== undefined) {
      return seed % length
    }
    return Math.floor(Math.random() * length)
  }

  function roll() {
    if (variantKeys.value.length === 0) {
      console.warn('No variants available')
      return
    }

    const index = getRandomIndex(variantKeys.value.length)
    const key = variantKeys.value[index]

    const mod = globImport[key] as VariantModule
    SelectedVariant.value = markRaw(mod.default)
  }

  initKeys()

  onMounted(roll)

  return {
    SelectedVariant,
    variantKeys
  }
}