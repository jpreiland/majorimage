<template>
  <div>
    {{  paramNumber }}
    <select v-model="selectedGroupOrCategory" @change="updateCategory(selectedGroupOrCategory)">
      <option v-for="groupOrCategoryEntry in groupsAndCategores" :value="groupOrCategoryEntry">
        {{ groupOrCategoryEntry }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppContext } from '../../../../../composables/useAppContext'

import type { CategoryName, GroupName } from '../../../../../../../shared/types'
import type { ModelRef, Ref } from 'vue'

interface Props {
  paramNumber: number
}

const props = defineProps<Props>()

const { data } = useAppContext()

const categoriesSet = new Set(Object.keys(data.categories))
for (const categoryName of Object.keys(data.categories)) {
  // remove meta categories from set
  if (categoryName.startsWith('_')) categoriesSet.delete(categoryName)
}

const groupsSet = new Set(Object.keys(data.groups))
const groupsAndCategores = new Set([...categoriesSet, ...groupsSet])

const defaultGroupOrCategory: CategoryName | GroupName = 'aberration'
const groupOrCategory: Ref<CategoryName | GroupName> = ref(defaultGroupOrCategory)
const selectedGroupOrCategory: ModelRef<CategoryName | GroupName> = defineModel('selectedGroupOrCategory', { default: defaultGroupOrCategory })

const emit = defineEmits({
  updatePartParam: ({ selectedGroupOrCategory, paramNumber }) => {
    // console.log(`validate updatePartParam emit: ${selectedGroupOrCategory}`)
    return true
  }
})

function updateCategory(selectedGroupOrCategory: CategoryName | GroupName) {
  groupOrCategory.value = selectedGroupOrCategory
  emit('updatePartParam', { value: selectedGroupOrCategory, paramNumber: props.paramNumber })
}

updateCategory(selectedGroupOrCategory.value)

</script>