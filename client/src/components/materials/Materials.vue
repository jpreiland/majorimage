<template>
  <div class="materials-page">
    <div class="columns materials">
      <div v-for="matType in materialOrder" :key="matType + '-header'" class="column materials head">
        <ul>
          <li class="list-header">
            {{ matType.charAt(0).toUpperCase() + matType.slice(1) }}
          </li>
        </ul>
      </div>
    </div>

    <div class="columns materials list">
      <div v-for="matType in materialOrder" :key="matType" class="column materials">
        <ul>
          <li v-for="(material, i) in getFilteredMaterials(matType)" :key="matType + '-' + i" class="list-item"
            :class="{ selected: material === activeMaterial }" @click="select(material, matType)">
            {{ material.name }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="initialized && activeMaterial" style="margin-top: 0.5rem;">
      <MaterialInfoCard :material="activeMaterial" @switch-units="switchUnits" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import MaterialInfoCard from './MaterialInfoCard.vue'
import { useAppContext } from '../../composables/useAppContext'

import type { Material, MaterialCategory } from '../../../../shared/types'

export type MaterialType = 'stone' | 'wood' | 'metal' | 'textile'

interface MaterialState {
  category: number
  categories: MaterialCategory[]
  items: Material[]
}

const { data, menuSelections } = useAppContext()

const materials = reactive<Record<MaterialType, MaterialState>>({
  stone: {
    category: 0,
    categories: [
      ['Common', 'isCommon'],
      ['All', true],
      ['Precious', 'isPrecious'],
      ['Magical', 'isMagical']
    ],
    items: [] as Material[]
  },
  wood: {
    category: 0,
    categories: [
      ['Common', 'isCommon'],
      ['All', true],
      ['Exotic', 'isExotic'],
      ['Magical', 'isMagical']
    ],
    items: [] as Material[]
  },
  metal: {
    category: 0,
    categories: [
      ['Common', 'isCommon'],
      ['All', true],
      ['Precious', 'isPrecious'],
      ['Magical', 'isMagical']
    ],
    items: [] as Material[]
  },
  textile: {
    category: 0,
    categories: [
      ['Common', 'isCommon'],
      ['All', true],
      ['Fabric', 'isFabric'],
      ['Fur', 'isFur']
    ],
    items: [] as Material[]
  }
})

const materialOrder: MaterialType[] = [
  'stone',
  'wood',
  'metal',
  'textile'
]

const initialized = ref(false)
const activeMaterial = ref<Material | null>(null)
const activeMaterialType = ref<MaterialType>('stone')

const materialTypeDimensions: Record<MaterialType, number> = {
  stone: 3,
  wood: 3,
  metal: 3,
  textile: 2
}

const isInInches = ref(true)

onMounted(() => {
  getMaterials()

  if (!menuSelections.materials) {
    const first = materials.stone.items[0]

    menuSelections.materials = {
      type: 'stone',
      name: first.name
    }

    select(first, 'stone')
  } else {
    const { type, name } = menuSelections.materials

    const list = materials[type].items

    const found = list.find(m => m.name === name)
    if (found) select(found, type)
  }

  switchUnits()
  initialized.value = true
})

function getMaterials() {
  materials.stone.items = data.materials.stones
  materials.wood.items = data.materials.woods
  materials.metal.items = data.materials.metals
  materials.textile.items = data.materials.textiles
}

function getFilteredMaterials(type: MaterialType) {
  const state = materials[type]

  return state.items.filter(material => {
    if (!material) return false

    const [, key] = state.categories[state.category]

    if (key === true) return true

    return Boolean(material[key])
  })
}

function select(material: Material, type: MaterialType) {
  activeMaterial.value = material
  activeMaterialType.value = type

  menuSelections.materials = {
    type,
    name: material.name
  }

  if (!material.attributes.units.includes(isInInches.value ? 'in' : 'ft')) {
    adjustMaterialUnits(materialTypeDimensions[type])
  }
}

function switchUnits() {
  isInInches.value = !isInInches.value
  adjustMaterialUnits(materialTypeDimensions[activeMaterialType.value])
}

function adjustMaterialUnits(dimension: number) {
  const mat = activeMaterial.value
  if (!mat?.attributes?.row1?.Weight) return

  if (isInInches.value) {
    mat.attributes.row1.Weight.value /= Math.pow(12, dimension)
  } else {
    mat.attributes.row1.Weight.value *= Math.pow(12, dimension)
  }

  const dimensionSuperscript = dimension === 3 ? '³' : '²'
  mat.attributes.units =
    (isInInches.value ? 'in' : 'ft') + dimensionSuperscript
}
</script>