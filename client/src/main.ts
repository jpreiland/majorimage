import { createApp, markRaw, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import { buildSubpages } from './lib/page-util/page-utils'
import { AppContext, appContextKey } from './types/app-context'
import Descriptor from './components/descriptors/Descriptor.vue'
import FilteredDescriptor from './components/descriptors/FilteredDescriptor.vue'
import LinkedDescriptor from './components/descriptors/LinkedDescriptor.vue'
import SimpleDescriptor from './components/descriptors/SimpleDescriptor.vue'
import StealthDescriptor from './components/descriptors/StealthDescriptor.vue'

import './assets/app.css';

import type { AppData } from '../../shared/types'
import type { Subpage, VueModule } from './types/pages'

const objectModules = import.meta.glob<VueModule>('./components/objects/templates/*/*.vue', { eager: true })
const locationModules = import.meta.glob<VueModule>('./components/locations/templates/*/*.vue', { eager: true })
const magicModules = import.meta.glob<VueModule>('./components/magic/templates/*/*.vue', { eager: true })
const shopModules = import.meta.glob<VueModule>('./components/shops/templates/*/*.vue', { eager: true })
const npcModules = import.meta.glob<VueModule>('./components/npcs/templates/*/*.vue', { eager: true })
const questModules = import.meta.glob<VueModule>('./components/quests/templates/*/*.vue', { eager: true })

async function loadData(): Promise<AppData> {
  const CACHE_KEY = `app-data-${__APP_VERSION__}`
  const isDev = import.meta.env.DEV

  if (!isDev) {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      fetch('/api/data')
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data) {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data))
          }
        })
        .catch(() => {})

      return JSON.parse(cached)
    }
  }

  const res = await fetch('/api/data', {
    cache: isDev ? 'no-store' : 'default'
  })

  if (!res.ok) {
    throw new Error(`Failed to load data: ${res.status}`)
  }

  const data = await res.json()

  if (!isDev) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  }

  return data
}

async function buildAllSubpages(data: AppData): Promise<Record<string, Subpage[]>> {
  return {
    objects: buildSubpages(objectModules, 'objects', data),
    locations: buildSubpages(locationModules, 'locations', data),
    magic: buildSubpages(magicModules, 'magic', data),
    shops: buildSubpages(shopModules, 'shops', data),
    npcs: buildSubpages(npcModules, 'npcs', data),
    quests: buildSubpages(questModules, 'quests', data)
  }
}

async function getUniqueWordCount(data: AppData): Promise<number> {
  const uniqueWords = new Set()
    for (const category of Object.keys(data.categories)) {
      for (const word of data.categories[category]) {
        uniqueWords.add(word)
      }
    }
  return uniqueWords.size
}

async function bootstrap(): Promise<void> {
  const data = await loadData()
  const subpages = await buildAllSubpages(data)
  const uniqueWordCount = await getUniqueWordCount(data)

  const app = createApp(App)

  const appContext: AppContext = reactive({
    data: markRaw(data),
    subpages: markRaw(subpages),
    menuSelections: {},
    wordCount: uniqueWordCount
  })

  app.provide(appContextKey, appContext)

  app.use(router)

  app
    .component('Descriptor', Descriptor)
    .component('FilteredDescriptor', FilteredDescriptor)
    .component('LinkedDescriptor', LinkedDescriptor)
    .component('SimpleDescriptor', SimpleDescriptor)
    .component('StealthDescriptor', StealthDescriptor)

  app.mount('#app');
}

bootstrap()