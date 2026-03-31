<template>
  <router-link :to="{ name: pageName }" custom v-slot="{ navigate }">
    <span
      class="button nav-btn" 
      :class="[{ 'nav-selected': isActive }, color]"
      @click="handleClick(navigate)"
    >
      {{ tabDisplayName }}
    </span>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NavigationFailure, useRoute } from 'vue-router'
import { useAppContext } from '../../composables/useAppContext'

interface Props {
  pageName: string
  color?: string
  tabDisplayName: string
}

const { menuSelections } = useAppContext()
const props = defineProps<Props>()
const route = useRoute()

const isActive = computed(() => {
  return route.name === props.pageName
})

function handleClick(navigate: (e?: MouseEvent | undefined) => Promise<void | NavigationFailure>) {
  if (isActive) menuSelections[props.pageName] = null
  navigate()
}
</script>