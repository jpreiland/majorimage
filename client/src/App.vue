<script>
import Objects from './components/objects/Objects.vue'
import Materials from './components/materials/Materials.vue'
import Locations from './components/locations/Locations.vue'

const routes = {
  '/': Objects,
  '/materials': Materials,
  '/locations': Locations
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
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