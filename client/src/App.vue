<script>
import { computed } from 'vue'
import axios from "axios"
import AboutPage from './components/about/AboutPage.vue'
import LocationsPage from './components/locations/LocationsPage.vue'
import MagicPage from './components/magic/MagicPage.vue'
import MaterialsPage from './components/materials/MaterialsPage.vue'
import NpcsPage from './components/npcs/NpcsPage.vue'
import ObjectsPage from './components/objects/ObjectsPage.vue'
import ShopsPage from './components/shops/ShopsPage.vue'
import NotFound from './components/notfound/NotFound.vue'

const routes = {
  '/': ObjectsPage,
  '/about': AboutPage,
  '/locations': LocationsPage,
  '/magic': MagicPage,
  '/materials': MaterialsPage,
  '/npcs': NpcsPage,
  '/objects': ObjectsPage,
  '/shops': ShopsPage
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
      menuSelections: {},
      nav: {
        objects: true,
        locations: false,
        magic: false,
        shops: false,
        npcs: false,
        quests: false,
        materials: false
      }
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
      for (let navKey of Object.keys(this.nav)) {
        this.nav[navKey] = urlParts[1] === navKey ? true : false
      }
      this.nav.objects = (urlParts[1] === '' || urlParts[1] === 'objects')

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
  },
  methods: {
    async navigate(path, key) {
      window.location.hash = path
      for (let navKey of Object.keys(this.nav)) {
        this.nav[navKey] = key === navKey ? true : false
      }
    }
  }
}
</script>

<template>
  <div class="banner">
    <div class="header">
      <p>
        <img class="header-icon" src="../public/apple-touch-icon.png" />
        <span class="title-text">Major Image</span>
      </p>
    </div>
    <div class="navigation">
      <button class="button nav-btn red" :class="{ 'nav-selected': nav.objects }" @click="navigate('#/', 'objects')" key="objects">Objects</button>
      <button class="button nav-btn orange" :class="{ 'nav-selected': nav.locations }"  @click="navigate('#/locations', 'locations')" key="locations">Locations</button> 
      <button class="button nav-btn yellow" :class="{ 'nav-selected': nav.magic }" @click="navigate('#/magic', 'magic')" key="magic">Magic</button> 
      <button class="button nav-btn green" :class="{ 'nav-selected': nav.shops }" @click="navigate('#/shops', 'shops')" key="shops">Shops</button> 
      <button class="button nav-btn blue" :class="{ 'nav-selected': nav.npcs }" @click="navigate('#/npcs', 'npcs')" key="npcs">NPCs</button> 
      <button class="button nav-btn indigo" key="quests">Quests</button> 
      <button class="button nav-btn violet" :class="{ 'nav-selected': nav.materials }" @click="navigate('#/materials', 'materials')" key="more">Materials</button> 
      <button class="button nav-btn" @click="navigate('#/about')" key="about">About</button> 
    </div>
  </div>
  <component class="page" :is="currentView" />
</template>