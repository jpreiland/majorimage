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
      names: computed(() => this.names)
    }
  },
  data() {
    return {
      currentPath: window.location.hash,
      names: null
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  async beforeCreate() {
    const namesResponse = await axios.get('api/names', { })
    this.names = namesResponse.data
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