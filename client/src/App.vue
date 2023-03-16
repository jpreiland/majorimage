<script>
import { computed } from 'vue'
import axios from "axios"
import ObjectsPage from './components/objects/ObjectsPage.vue'
import MaterialsPage from './components/materials/MaterialsPage.vue'
import LocationsPage from './components/locations/LocationsPage.vue'
import AboutPage from './components/about/AboutPage.vue'

const routes = {
  '/': ObjectsPage,
  '/materials': MaterialsPage,
  '/locations': LocationsPage,
  '/about': AboutPage
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
    <a href="#/about">About</a> |
  </div>
  <component :is="currentView" />
</template>