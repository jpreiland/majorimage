<template>
  <div>
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Word and Group/Category
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      <p>
        {{ word }}
      </p>
      <p>
        {{ groupOrCategory }}
      </p>
    </div>
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Formats that reference [group/category name]
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      <div>
        <template v-for="format in formats" :key="'Format-'+format.name+'-'+rerollToggle">
          <p>
            {{ format.name }}
            <FilteredDescriptor :filtered-formats="format.formats" :format-picker="format.formatPicker" :color="'#3e8ed0'" />
          </p>
        </template>
      </div>
    </div>
    <div class="center">
      <button class="button info-panel reroll-all" @click="rerollAll()">
        Reroll All
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAppContext } from '../../../../../composables/useAppContext'
import { CategoryName, Format, FormatName, GroupName, NumericString } from '../../../../../../../shared/types';

const { data } = useAppContext()

const word = 'flamberge'
const groupOrCategory = 'weaponMeleeBasic'
const formats = ref(new Array())
const rerollToggle = ref(true)

onMounted(() => {
  if (!data.categories[groupOrCategory]) {
    console.log('category does not exist')
  }

  const reverseIndex: ReverseIndex = buildReverseIndex()
  const foundGroups = searchGroups(groupOrCategory, reverseIndex)
  const modifiedFormats = searchFormats(word, foundGroups)

  for (const formatName of Object.keys(modifiedFormats)) {
    const formatPicker = [formatName]
    const filteredFormats: Record<string, {weight: number, format: Format}> = { }
    filteredFormats[formatName] = { weight: 1, format: modifiedFormats[formatName]}
    formats.value.push({name: formatName, formatPicker: formatPicker, formats: filteredFormats})
  }
})

function rerollAll() {
  rerollToggle.value = !rerollToggle.value
}

type ReverseIndex = Map<CategoryName | GroupName, Set<GroupName>>

function buildReverseIndex(): ReverseIndex {
  const reverse: ReverseIndex = new Map()

  for (const group of Object.keys(data.groups) as GroupName[]) {
    const { categoryMap } = data.groups[group]

    for (const key of Object.keys(categoryMap) as NumericString[]) {
      const child = categoryMap[key] as CategoryName | GroupName

      if (!reverse.has(child)) {
        reverse.set(child, new Set())
      }

      reverse.get(child)!.add(group)
    }
  }

  return reverse
}

function searchGroups(target: CategoryName | GroupName, reverseIndex: ReverseIndex): Set<GroupName> {
  const result = new Set<GroupName>()
  const queue: (CategoryName | GroupName)[] = [target]

  while (queue.length > 0) {
    const current = queue.shift()!

    const parents = reverseIndex.get(current)
    if (!parents) continue

    for (const parent of parents) {
      if (!result.has(parent)) {
        result.add(parent)
        queue.push(parent)
      }
    }
  }

  return result
}

function searchFormats(word: string, targets: Set<CategoryName | GroupName>): Record<string, Format> {
  const formats: Record<string, Format> = {}

  for (const formatName of Object.keys(data.formats) as FormatName[]) {
    const format = structuredClone(data.formats[formatName])
    let formatContainsTarget = false
    for (const instruction in format) {
      // TODO: modify word for cases pick-plural, pick-verber, etc
      if (format[instruction][0].startsWith('pick') && targets.has(format[instruction][1] as (CategoryName | GroupName))) {
        formatContainsTarget = true
        format[instruction] = ['static', word]
      }
    }
    if (formatContainsTarget) formats[formatName] = format
  }

  return formats
}
</script>