<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.locations" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSubpage.slug }" @click="activate(subpage)">
          {{ subpage.name }}
        </li>
      </ul>
    </div>
    <div class="column right-info-card-holder">
      <div class="info-card right">
        <component :is="activeComponentDef" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppContext } from '../../composables/useAppContext';

import type { Subpage } from '../../types/pages'

const { subpages, menuSelections } = useAppContext()
const route = useRoute()
const router = useRouter()

const activeSlug = computed(() => {
  return (route.params.subpage as string | undefined)
    ?? subpages.locations[0]?.slug
})

const activeSubpage = computed<Subpage>(() => {
  return (
    subpages.locations.find(s => s.slug === activeSlug.value) ||
    menuSelections.locations ||
    subpages.locations[0]
  )
})

const activeComponentDef = computed(() => {
  return activeSubpage.value?.component ?? null
})

if (!route.params.subpage && subpages.locations.length) {
  router.replace(
    `/locations/${
      menuSelections.locations?.slug ??
      subpages.locations[0].slug
    }`
  )
}

function activate(subpage: Subpage) {
  menuSelections.locations = subpage
  router.replace(`/locations/${subpage.slug}`)
}
</script>