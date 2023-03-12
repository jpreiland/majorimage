<script>
import { computed } from 'vue'
import axios from "axios"
import ObjectsPage from './components/objects/ObjectsPage.vue'
import Materials from './components/materials/Materials.vue'
import Locations from './components/locations/Locations.vue'

const routes = {
  '/': ObjectsPage,
  '/materials': Materials,
  '/locations': Locations
}

export default {
  provide() {
    return {
      wordData: computed(() => this.wordData)
    }
  },
  data() {
    return {
      currentPath: window.location.hash,
      wordData: null
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  async beforeCreate() {
    const wordsResponse = await axios.get('api/words', { })
    this.wordData = wordsResponse.data
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
  <a href="#/">Objects</a> |
  <a href="#/materials">Materials</a> |
  <a href="#/locations">Locations</a> |
  <component :is="currentView" />
</template>