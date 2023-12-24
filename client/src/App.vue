<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script>
import { computed } from 'vue'
import About from './components/about/About.vue'
import Locations from './components/locations/Locations.vue'
import Magic from './components/magic/Magic.vue'
import Materials from './components/materials/Materials.vue'
import Npcs from './components/npcs/Npcs.vue'
import Objects from './components/objects/Objects.vue'
import Quests from './components/quests/Quests.vue'
import Shops from './components/shops/Shops.vue'
import NotFound from './components/notfound/NotFound.vue'
import precompiledData from './assets/data.json'

const routes = {
  '/': Objects,
  '/about': About,
  '/locations': Locations,
  '/magic': Magic,
  '/materials': Materials,
  '/npcs': Npcs,
  '/objects': Objects,
  '/quests': Quests,
  '/shops': Shops
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
      data: precompiledData,
      version: "0.1.0",
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
    // TODO: rework routing so that it isn't so horrendous
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
  async mounted() {
    // uncomment to load data from dev server
    // this.data = await this.loadData()
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
    },
    async loadData() {
      const wordsResponse = await fetch('/api/data')
      const data = await wordsResponse.json()
      return data?.version === this.version ? data : this.data
    }
  }
}
</script>

<template>
  <div>
    <div class="banner">
      <div class="header">
        <p>
          <img class="header-icon" src="./assets/icon.png">
          <span class="title-text">Major Image</span>
        </p>
      </div>
      <div class="navigation">
        <button key="objects" class="button nav-btn red" :class="{ 'nav-selected': nav.objects }" @click="navigate('#/', 'objects')">
          Objects
        </button>
        <button key="locations" class="button nav-btn orange" :class="{ 'nav-selected': nav.locations }" @click="navigate('#/locations', 'locations')">
          Locations
        </button> 
        <button key="magic" class="button nav-btn yellow" :class="{ 'nav-selected': nav.magic }" @click="navigate('#/magic', 'magic')">
          Magic
        </button> 
        <button key="shops" class="button nav-btn green" :class="{ 'nav-selected': nav.shops }" @click="navigate('#/shops', 'shops')">
          Shops
        </button> 
        <button key="npcs" class="button nav-btn blue" :class="{ 'nav-selected': nav.npcs }" @click="navigate('#/npcs', 'npcs')">
          NPCs
        </button> 
        <button key="quests" class="button nav-btn indigo" :class="{ 'nav-selected': nav.quests }" @click="navigate('#/quests', 'quests')">
          Quests
        </button> 
        <button key="materials" class="button nav-btn violet" :class="{ 'nav-selected': nav.materials }" @click="navigate('#/materials', 'materials')">
          Materials
        </button> 
        <button key="about" class="button nav-btn" @click="navigate('#/about')">
          About
        </button> 
      </div>
    </div>
    <component :is="currentView" v-if="data" class="page" />
  </div>
</template>