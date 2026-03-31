<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.quests" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSubpage.slug }" @click="activate(subpage)">
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
    ?? subpages.quests[0]?.slug
})

const activeSubpage = computed<Subpage>(() => {
  return (
    subpages.quests.find(s => s.slug === activeSlug.value) ||
    menuSelections.quests ||
    subpages.quests[0]
  )
})

const activeComponentDef = computed(() => {
  return activeSubpage.value?.component ?? null
})

if (!route.params.subpage && subpages.quests.length) {
  router.replace(
    `/quests/${
      menuSelections.quests?.slug ??
      subpages.quests[0].slug
    }`
  )
}

function activate(subpage: Subpage) {
  menuSelections.quests = subpage
  router.replace(`/quests/${subpage.slug}`)
}
</script>