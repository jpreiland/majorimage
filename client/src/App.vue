<script>
import Objects from './components/objects/Objects.vue'
import Materials from './components/materials/Materials.vue'

const routes = {
  '/': Objects,
  '/materials': Materials
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
  <component :is="currentView" />
</template>