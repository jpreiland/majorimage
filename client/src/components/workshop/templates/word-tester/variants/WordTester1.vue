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
        <input v-model="wordInput" type="text" @keydown.enter="updateWord(wordInput)" />
        <button @click="updateWord(wordInput)">Test</button>
      </p>
      <select v-model="selectedCategory" @change="updateCategory(selectedCategory)">
        <option v-for="groupOrCategoryEntry in categoriesSet" :value="groupOrCategoryEntry">
          {{ groupOrCategoryEntry }}
        </option>
      </select>
    </div>
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Formats that reference {{ category }}
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      <template v-for="format in formats" :key="'Format-'+format.name+'-'+rerollToggle">
        <p>
          <FilteredDescriptor :filtered-formats="format.formats" :format-picker="format.formatPicker" :color="'#70c947'" />
          {{ format.name }}
        </p>
      </template>
    </div>    
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Groups that contain {{ category }}
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      {{ containingGroupList }}
    </div>
    <div class="center">
      <button class="button info-panel reroll-all" @click="rerollAll()">
        Reroll All
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useAppContext } from '../../../../../composables/useAppContext'

import type { CategoryName, DFMapName, Format, FormatName, GroupName, NumericString } from '../../../../../../../shared/types';
import type { ComputedRef, ModelRef, Ref } from 'vue';

const { data, menuSelections } = useAppContext()

const categoriesSet = new Set(Object.keys(data.categories))
for (const categoryName of Object.keys(data.categories)) {
  // remove meta categories from set
  if (categoryName.startsWith('_')) categoriesSet.delete(categoryName)
}

const defaultWord = 'deadly'
const word = ref(defaultWord)
const wordInput = defineModel('wordInput', { default: defaultWord })

const defaultCategory = 'magicSpellPartElementPrefix'
const category: Ref<CategoryName> = ref(defaultCategory)
const selectedCategory: ModelRef<CategoryName> = defineModel('selectedGroupOrCategory', { default: defaultCategory })

const rerollToggle = ref(true)

const groupReverseIndex: GroupReverseIndex = buildGroupReverseIndex()
const formatReverseIndex = buildFormatReverseIndex()

const targetGroupsAndCategory: ComputedRef<Set<CategoryName | GroupName>> = computed(() => {
  const foundGroups = searchGroups(category.value, groupReverseIndex)
  return new Set([category.value, ...foundGroups])
})

const containingGroupList: ComputedRef<string> = computed(() => {
  let list = ''
  for (const entry of targetGroupsAndCategory.value) {
    if (entry !== category.value) list += entry + ", "
  }
  if (list.endsWith(", ")) list = list.substring(0, list.length-2)
  return list.length > 0 ? list : `No groups contain ${category.value}`
})

const formatsAndDfMaps = computed(() => {
  return findReferencingNodes(targetGroupsAndCategory.value, formatReverseIndex)
})

const allRelevantFormats = computed(() => {
  const { formats, dfMaps } = formatsAndDfMaps.value
  const dfFormats = expandDfMapsToFormats(dfMaps, formats)
  return new Set<FormatName>([...formats, ...dfFormats])
})

const modifiedFormats = computed(() => {
  return alterFormats(word.value, targetGroupsAndCategory.value, allRelevantFormats.value)
})

const formats = computed(() => {
  const newFormats = []

  for (const formatName of Object.keys(modifiedFormats.value) as FormatName[]) {
    const formatPicker: FormatName[] = [formatName]
    const filteredFormats: Record<string, {weight: number, format: Format}> = { }

    filteredFormats[formatName] = { weight: 1, format: modifiedFormats.value[formatName]}
    newFormats.push({name: formatName, formatPicker: formatPicker, formats: filteredFormats})
  }

  return newFormats
})

onMounted(() => {
  if (menuSelections.wordTesterWord && typeof menuSelections.wordTesterWord === 'string') {
    wordInput.value = menuSelections.wordTesterWord
  }

  if (menuSelections.wordTesterCategory && 
      typeof menuSelections.wordTesterCategory === 'string' &&
      categoriesSet.has(menuSelections.wordTesterCategory)) {
    selectedCategory.value = menuSelections.wordTesterCategory as CategoryName
    category.value = selectedCategory.value
  }

  rerollAll()
})

function updateWord(wordInput: string) {
  word.value = wordInput
  menuSelections.wordTesterWord = wordInput
  rerollAll()
}

function updateCategory(selectedCategory: CategoryName) {
  category.value = selectedCategory
  menuSelections.wordTesterCategory = selectedCategory
}

function rerollAll() {
  if (wordInput.value !== word.value) word.value = wordInput.value
  rerollToggle.value = !rerollToggle.value
}

type GroupReverseIndex = Map<CategoryName | GroupName, Set<GroupName>>

function buildGroupReverseIndex(): GroupReverseIndex {
  const reverse: GroupReverseIndex = new Map()

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

function searchGroups(target: CategoryName, reverseIndex: GroupReverseIndex): Set<GroupName> {
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

type NodeName = CategoryName | GroupName | FormatName | DFMapName
type FormatReverseIndex = Map<NodeName, Set<NodeName>>

function buildFormatReverseIndex(): FormatReverseIndex {
  const reverse: FormatReverseIndex = new Map()

  function addEdge(child: NodeName, parent: NodeName) {
    if (!reverse.has(child)) reverse.set(child, new Set())
    reverse.get(child)!.add(parent)
  }

  for (const formatName of Object.keys(data.formats) as FormatName[]) {
    const format = data.formats[formatName]

    for (const instruction of format) {
      const [type, value] = instruction

      if (type.startsWith('pick')) {
        addEdge(value as CategoryName | GroupName, formatName)
      }

      if (type === 'format') {
        addEdge(value as FormatName | DFMapName, formatName)
      }
    }
  }

  for (const dfName of Object.keys(data.dfMap) as DFMapName[]) {
    const { formatMap } = data.dfMap[dfName]

    for (const key of Object.keys(formatMap) as NumericString[]) {
      const formatName = formatMap[key] as FormatName

      addEdge(formatName, dfName)
    }
  }

  return reverse
}

function findReferencingNodes(targets: Set<CategoryName | GroupName>, reverse: FormatReverseIndex) {
  const resultFormats = new Set<FormatName>()
  const resultDfMaps = new Set<DFMapName>()

  const visited = new Set<NodeName>()
  const queue: NodeName[] = [...targets]

  while (queue.length > 0) {
    const current = queue.shift()!

    if (visited.has(current)) continue
    visited.add(current)

    const parents = reverse.get(current)
    if (!parents) continue

    for (const parent of parents) {
      queue.push(parent)

      if (parent in data.formats) {
        resultFormats.add(parent as FormatName)
      } else if (parent in data.dfMap) {
        resultDfMaps.add(parent as DFMapName)
      }
    }
  }

  return { formats: resultFormats, dfMaps: resultDfMaps }
}

function expandDfMapsToFormats(dfMaps: Set<DFMapName>, reachableFormats: Set<FormatName>): Set<FormatName> {
  const result = new Set<FormatName>()

  for (const dfName of dfMaps) {
    const { formatMap } = data.dfMap[dfName]

    for (const key of Object.keys(formatMap) as NumericString[]) {
      const formatName = formatMap[key] as FormatName

      if (reachableFormats.has(formatName)) {
        result.add(formatName)
      }
    }
  }

  return result
}

function alterFormats(word: string, targets: Set<CategoryName | GroupName>, formatNames: Set<FormatName>): Record<string, Format> {
  const result: Record<string, Format> = {}

  for (const formatName of formatNames) {
    let format = structuredClone(data.formats[formatName])
    let insPtr = 0

    while (insPtr < format.length) {
      const [type, value] = format[insPtr]

      if (type === 'format' && typeof value === 'string' && !(/[A-Z]/.test(value[0]))) {
        const expansion = structuredClone(data.formats[value])
        format.splice(insPtr, 1, ...expansion)
        insPtr--
      } else if (type.startsWith('pick') && targets.has(value as any)) {
        format[insPtr][1] = '_WORDTESTER'
      }

      insPtr++
    }

    result[formatName] = format
  }

  if (result && Object.keys(result).length > 0) {
    data.categories._WORDTESTER[0] = word
  }

  return result
}

</script>