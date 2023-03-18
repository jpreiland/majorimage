<script>
import { computed } from 'vue'
import axios from "axios"
import AboutPage from './components/about/AboutPage.vue'
import LocationsPage from './components/locations/LocationsPage.vue'
import MagicPage from './components/magic/MagicPage.vue'
import MaterialsPage from './components/materials/MaterialsPage.vue'
import ObjectsPage from './components/objects/ObjectsPage.vue'

const routes = {
  '/': ObjectsPage,
  '/about': AboutPage,
  '/locations': LocationsPage,
  '/magic': MagicPage,
  '/materials': MaterialsPage
}

export default {
  provide() {
    return {
      data: computed(() => this.data)
    }
  },
  data() {
    return {
      currentPath: window.location.hash,
      data: null
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  async beforeCreate() {
    const wordsResponse = await axios.get('api/data', { })
    this.data = wordsResponse.data
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>

<template>
  <div class="title">Major Image</div>
  <div class="navigation">
    <a href="#/">Objects</a> |
    <a href="#/materials">Materials</a> |
    <a href="#/locations">Locations</a> |
    <a href="#/magic">Magic</a> |
    <a href="#/about">About</a> |
  </div>
  <component :is="currentView" />
</template>