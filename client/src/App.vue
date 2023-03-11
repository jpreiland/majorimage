<script>
import { computed } from 'vue'
import axios from "axios"
import Objects from './components/objects/Objects.vue'
import Materials from './components/materials/Materials.vue'
import Locations from './components/locations/Locations.vue'

const routes = {
  '/': Objects,
  '/materials': Materials,
  '/locations': Locations
}

export default {
  provide() {
    return {
      words: computed(() => this.words)
    }
  },
  data() {
    return {
      currentPath: window.location.hash,
      words: null
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  async beforeCreate() {
    const wordsResponse = await axios.get('api/words', { })
    this.words = wordsResponse.data
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