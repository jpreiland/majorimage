<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(magicSubpage, key, i) in data.templates.magic" :key="'magicSubpage-'+key" class="list-item" :class="{ 'selected': initialized && types[i].selected }" @click="select(magicSubpage, i)">
          {{ magicSubpage._displayName }}
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
  name: 'Magic',
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
    if (!this.menuSelections.magic) {
      this.menuSelections.magic = this.types[0].name
    }
    this.activeType = this.menuSelections.magic
    this.activePath = this.data.templates.magic[this.activeType]._path
    this.activeComponent = this.data.templates.magic[this.activeType]._component
    this.setSelected()
    this.initialized = true
  },
  methods: {
    loadTypes() { 
      for (let key of Object.keys(this.data.templates.magic)) {
        this.types.push({name: key, selected: false})
      }
    },
    setSelected() {
      for (let type of this.types) {
        type.selected = (type.name === this.menuSelections.magic)
      }
    },
    async select(magicSubpage, listIndex) {
      const pathParts = magicSubpage._path.split('/')
      this.menuSelections.magic = pathParts[pathParts.length-2]
      this.activePath = magicSubpage._path
      this.activeComponent = magicSubpage._component
      for (let i in this.types) {
        this.types[i].selected = (i == listIndex)
      }
    }
  }
}
</script>