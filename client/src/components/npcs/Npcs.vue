<template>
  <div class="columns list left-scroll-menu">
    <div class="column left-scroll-menu">
      <ul>
        <li v-for="(npcSubpage, key, i) in data.templates.npcs" :key="'npcSubpage-'+key" class="list-item" :class="{ 'selected': initialized && types[i].selected }" @click="select(npcSubpage, i)">
          {{ npcSubpage._displayName }}
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
  name: 'Npcs',
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
    if (!this.menuSelections.npcs) {
      this.menuSelections.npcs = this.types[0].name
    }
    this.activeType = this.menuSelections.npcs
    this.activePath = this.data.templates.npcs[this.activeType]._path
    this.activeComponent = this.data.templates.npcs[this.activeType]._component
    this.setSelected()
    this.initialized = true
  },
  methods: {
    loadTypes() { 
      for (let key of Object.keys(this.data.templates.npcs)) {
        this.types.push({name: key, selected: false})
      }
    },
    setSelected() {
      for (let type of this.types) {
        type.selected = (type.name === this.menuSelections.npcs)
      }
    },
    async select(npcSubpage, listIndex) {
      const pathParts = npcSubpage._path.split('/')
      this.menuSelections.npcs = pathParts[pathParts.length-2]
      this.activePath = npcSubpage._path
      this.activeComponent = npcSubpage._component
      for (let i in this.types) {
        this.types[i].selected = (i == listIndex)
      }
    }
  }
}
</script>

<style>

</style>