<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(location, key, i) in data.templates.locations" :key="'location-'+key" class="list-item" :class="{ 'selected': initialized && types[i].selected }" @click="select(location, i)">
          {{ location._displayName }}
        </li>
      </ul>
    </div>
    <div class="column right-info-card-holder">
      <div class="info-card right">
        <component :is="computeType" v-if="initialized" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Locations',
  inject: ['data', 'menuSelections'],
  data() {
    return {
      types: [],
      activeType: {},
      activePath: "",
      activeComponent: "",
      initialized: false
    }
  },
  computed: {
    computeType () {
      if (this.activePath.includes('..')) return
      return defineAsyncComponent(() => import(`./templates/${this.activePath}/${this.activeComponent}.vue`))
    }
  },
  async mounted() {
    this.loadTypes()
    if (!this.menuSelections.locations) {
      this.menuSelections.locations = this.types[0].name
    }
    this.activeType = this.menuSelections.locations
    this.activePath = this.data.templates.locations[this.activeType]._path
    this.activeComponent = this.data.templates.locations[this.activeType]._component
    this.setSelected()
    this.initialized = true
  },
  methods: {
    loadTypes() { 
      for (let key of Object.keys(this.data.templates.locations)) {
        this.types.push({name: key, selected: false})
      }
    },
    setSelected() {
      for (let type of this.types) {
        type.selected = (type.name === this.menuSelections.locations)
      }
    },
    async select(locationSubpage, listIndex) {
      const pathParts = locationSubpage._path.split('/')
      this.menuSelections.locations = pathParts[pathParts.length-2]
      this.activePath = locationSubpage._path
      this.activeComponent = locationSubpage._component
      for (let i in this.types) {
        this.types[i].selected = (i == listIndex)
      }
    }
  }
}
</script>