import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'
import Descriptor from './components/descriptors/Descriptor.vue'
import FilteredDescriptor from './components/descriptors/FilteredDescriptor.vue'
import LinkedDescriptor from './components/descriptors/LinkedDescriptor.vue'
import SimpleDescriptor from './components/descriptors/SimpleDescriptor.vue'
import StealthDescriptor from './components/descriptors/StealthDescriptor.vue'
import './assets/app.css';

async function loadData() {
  const CACHE_KEY = 'app-data-v1'

  const cached = localStorage.getItem(CACHE_KEY)
  // comment out for convenience during development
  if (cached) return JSON.parse(cached)

  const res = await fetch('/api/data')
  const data = await res.json()
  localStorage.setItem(CACHE_KEY, JSON.stringify(data))

  return data
}

async function bootstrap() {
  const data = await loadData()
  const app = createApp(App)
  
  app.provide('data', data)
  app.provide('menuSelections', {})
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