<script>
import { computed } from 'vue'
import axios from "axios"
import AboutPage from './components/about/AboutPage.vue'
import LocationsPage from './components/locations/LocationsPage.vue'
import MagicPage from './components/magic/MagicPage.vue'
import MaterialsPage from './components/materials/MaterialsPage.vue'
import MerchantsPage from './components/merchants/MerchantsPage.vue'
import ObjectsPage from './components/objects/ObjectsPage.vue'
import NotFound from './components/notfound/NotFound.vue'

const routes = {
  '/': ObjectsPage,
  '/about': AboutPage,
  '/locations': LocationsPage,
  '/magic': MagicPage,
  '/materials': MaterialsPage,
  '/merchants': MerchantsPage,
  '/objects': ObjectsPage
}

export default {
  provide() {
    return {
      data: computed(() => this.data),
      menuSelections: computed(() => this.menuSelections)
    }
  },
  data() {
    return {
      currentPath: window.location.hash,
      data: null,
      menuSelections: {}
    }
  },
  computed: {
    currentView() {
      let urlParts = window.location.hash ? window.location.hash.split('/') : window.location.pathname.split('/')
      if (urlParts.length === 3) {
        this.menuSelections[urlParts[1]] = urlParts.pop()
        if (this.data && (!Object.hasOwn(this.data, 'templates') ||
        !Object.hasOwn(this.data.templates[urlParts[1]], this.menuSelections[urlParts[1]]))) return NotFound
      }
      if (!this.currentPath.includes('#')) {
        // no-op, mysterious requirement
      }
      return routes['/' + urlParts[1] || '/'] || NotFound
    }
  },
  async beforeCreate() {
    const wordsResponse = await axios.get('/api/data', { })
    this.data = wordsResponse.data
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
      window.location.pathname = '/'
		})
  }
}
</script>

<template>
  <div class="title">Major Image</div>
  <div class="navigation">
    <a href="#/">Objects</a> |
    <a href="#/locations">Locations</a> |
    <a href="#/magic">Magic</a> |
    <a href="#/merchants">Merchants</a> |
    <a href="#/materials">Materials</a> |
    <a href="#/about">About</a> |
  </div>
  <component :is="currentView" />
</template>