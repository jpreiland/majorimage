<template>
  <div>
    <div class="card-header">
      <div class="control">
        <a class="button filter" :class="{ 'is-light': !params.isArmor }" @click="toggleItemType('isArmor')">Armor</a>
        <a class="button filter" :class="{ 'is-light': !params.isClothing }" @click="toggleItemType('isClothing')">Clothing</a>
        <a class="button filter" :class="{ 'is-light': !params.isContainer }" @click="toggleItemType('isContainer')">Container</a>
        <a class="button filter" :class="{ 'is-light': !params.isFurniture }" @click="toggleItemType('isFurniture')">Furniture</a>
        <br>
        <a class="button filter" :class="{ 'is-light': !params.isMisc }" @click="toggleItemType('isMisc')">Misc</a>
        <a class="button filter" :class="{ 'is-light': !params.isTreasure }" @click="toggleItemType('isTreasure')">Treasure</a>
        <a class="button filter" :class="{ 'is-light': !params.isWeapon }" @click="toggleItemType('isWeapon')">Weapon</a>
        <a class="button filter" :class="{ 'is-light': !params.isWriting }" @click="toggleItemType('isWriting')">Writing</a>
      </div>
    </div>

    <div>
      <template v-for="row in rows" :key="'item-' + row.id + '-' + rerollToggle">
        <ObjectRow :item-types="itemTypes" />
      </template>
    </div>

    <div class="center">
      <button class="button reroll-all" @click="rerollAll">
        Reroll All
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useAppContext } from '../../../../composables/useAppContext'

import ObjectRow from "./object-rows/ObjectRow.vue"

const { data } = useAppContext()

const params = reactive({
  isArmor: false,
  isClothing: false,
  isContainer: false,
  isFurniture: false,
  isMisc: false,
  isTreasure: false,
  isWeapon: false,
  isWriting: false,
})

const itemTypes = reactive({
  compiled: false,
  formatPicker: [] as string[],
  formats: {} as Record<string, any>,
})

const numRows = 12
const rows = ref<{ id: number }[]>([])
const itemFormats = ref<any[]>([])

const armorFormat = ["_armorShieldUntyped", 1]
const clothingFormat = ["_clothingHeadwear", 1]
const containerFormat = ["_container", 1]
const furnitureFormat = ["_furniture", 1]
const miscFormat = ["_misc", 1]
const treasureFormat = ["_treasure", 1]
const weaponFormat = ["_weapon", 1]
const writingFormat = ["_writing", 1]

const rerollToggle = ref(true)

onMounted(() => {
  compileItemTypes()
  for (let i = 0; i < numRows; i++) {
    rows.value.push({ id: i })
  }
})

function toggleItemType(itemType: keyof typeof params) {
  params[itemType] = !params[itemType]
  compileItemTypes()
}

async function compileItemTypes() {
  itemTypes.compiled = false

  itemFormats.value = await applyItemFilters()
  itemTypes.formats = await compileDescriptorFormats()
  itemTypes.formatPicker = await buildFormatPicker()

  itemTypes.compiled = true
}

async function applyItemFilters() {
  const formats: any[] = []

  for (const param of Object.keys(params)) {
    switch (param) {
      case 'isArmor':
        if (params[param]) formats.push(armorFormat)
        break
      case 'isClothing':
        if (params[param]) formats.push(clothingFormat)
        break
      case 'isContainer':
        if (params[param]) formats.push(containerFormat)
        break
      case 'isFurniture':
        if (params[param]) formats.push(furnitureFormat)
        break
      case 'isMisc':
        if (params[param]) formats.push(miscFormat)
        break
      case 'isTreasure':
        if (params[param]) formats.push(treasureFormat)
        break
      case 'isWeapon':
        if (params[param]) formats.push(weaponFormat)
        break
      case 'isWriting':
        if (params[param]) formats.push(writingFormat)
        break
    }
  }

  if (formats.length === 0) {
    formats.push(
      armorFormat,
      clothingFormat,
      containerFormat,
      furnitureFormat,
      miscFormat,
      treasureFormat,
      weaponFormat,
      writingFormat
    )
  }

  return formats
}

async function compileDescriptorFormats() {
  const compiled: Record<string, any> = {}

  for (const [name, weight] of itemFormats.value) {
    compiled[name] = {
      weight,
      format: data?.formats?.[name],
    }
  }

  return compiled
}

async function buildFormatPicker() {
  let picker: string[] = []

  for (const format of Object.keys(itemTypes.formats)) {
    picker = picker.concat(
      Array(itemTypes.formats[format].weight).fill(format)
    )
  }

  return picker
}

function rerollAll() {
  rerollToggle.value = !rerollToggle.value
}
</script>