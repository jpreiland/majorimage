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
        <input v-model="wordInput" type="text" /><button @click="updateWord(wordInput)">Test</button>
      </p>
      <select v-model="selectedGroupOrCategory" @change="updateGroupOrCategory(selectedGroupOrCategory)">
        <option v-for="groupOrCategoryEntry in groupsAndCategories" :value="groupOrCategoryEntry">
          {{ groupOrCategoryEntry }}
        </option>
      </select>
    </div>
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Formats that reference {{ groupOrCategory }}
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      <div>
        <template v-for="format in formats" :key="'Format-'+format.name+'-'+rerollToggle">
          <p>
            <FilteredDescriptor :filtered-formats="format.formats" :format-picker="format.formatPicker" :color="'#70c947'" />
            {{ format.name }}
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
import { ComputedRef, Ref, computed, ref } from 'vue'
import { useAppContext } from '../../../../../composables/useAppContext'
import { CategoryName, Format, FormatName, GroupName, NumericString } from '../../../../../../../shared/types';
import { ModelRef } from 'vue';

const { data } = useAppContext()

const categoriesSet = new Set(Object.keys(data.categories))
for (const categoryName of Object.keys(data.categories)) {
  // remove meta categories from set
  if (categoryName.startsWith('_')) categoriesSet.delete(categoryName)
}

const groupsSet = new Set(Object.keys(data.groups))
const groupsAndCategories = new Set([...categoriesSet, ...groupsSet])

const defaultCategory = 'nameAll'
const groupOrCategory: Ref<CategoryName | GroupName> = ref(defaultCategory)
const selectedGroupOrCategory: ModelRef<CategoryName | GroupName> = defineModel('selectedGroupOrCategory', { default: defaultCategory })

const defaultWord = 'mr. toad'
const word = ref(defaultWord)
const wordInput = defineModel('wordInput', { default: defaultWord })

const rerollToggle = ref(true)

const reverseIndex: ReverseIndex = buildReverseIndex()

const targetGroupsAndCategory: ComputedRef<Set<CategoryName | GroupName>> = computed(() => {
  const foundGroups = searchGroups(groupOrCategory.value, reverseIndex)
  return new Set([groupOrCategory.value, ...foundGroups])
})

const modifiedFormats = computed(() => {
  return searchFormats(word.value, targetGroupsAndCategory.value)
})

const formats = computed(() => {
  const newFormats = []

  for (const formatName of Object.keys(modifiedFormats.value)) {
    const formatPicker: FormatName[] = [formatName as FormatName]
    const filteredFormats: Record<string, {weight: number, format: Format}> = { }

    filteredFormats[formatName] = { weight: 1, format: modifiedFormats.value[formatName]}
    newFormats.push({name: formatName, formatPicker: formatPicker, formats: filteredFormats})
  }

  return newFormats
})

function updateWord(wordInput: string) {
  word.value = wordInput
  rerollAll()
}

function updateGroupOrCategory(selectedGroupOrCategory: (GroupName | CategoryName)) {
  groupOrCategory.value = selectedGroupOrCategory
}

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

// todo: account for formats that use 'format' instructions
function searchFormats(word: string, targets: Set<CategoryName | GroupName>): Record<string, Format> {
  const formats: Record<string, Format> = {}

  for (const formatName of Object.keys(data.formats) as FormatName[]) {
    const format = structuredClone(data.formats[formatName])
    let formatContainsTarget = false

    for (const instruction in format) {
      if (format[instruction][0].startsWith('pick') && targets.has(format[instruction][1] as (CategoryName | GroupName))) {
        formatContainsTarget = true      
        format[instruction][1] = '_WORDTESTER'
      }
    }

    if (formatContainsTarget) {
      formats[formatName] = format
      data.categories._WORDTESTER[0] = word
    }
  }

  return formats
}
</script>