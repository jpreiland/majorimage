<template>
  <div class="columns list left-scroll-menu">
    <div class="column left-scroll-menu">
      <ul>
        <li v-for="(questSubpage, key, i) in data.templates.quests" :key="'questSubpage-'+key" class="list-item" :class="{ 'selected': initialized && types[i].selected }" @click="select(questSubpage, i)">
          {{ questSubpage._displayName }}
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
  name: 'Quests',
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
    if (!this.menuSelections.quests) {
      this.menuSelections.quests = this.types[0].name
    }
    this.activeType = this.menuSelections.quests
    this.activePath = this.data.templates.quests[this.activeType]._path
    this.activeComponent = this.data.templates.quests[this.activeType]._component
    this.setSelected()
    this.initialized = true
  },
  methods: {
    loadTypes() { 
      for (let key of Object.keys(this.data.templates.quests)) {
        this.types.push({name: key, selected: false})
      }
    },
    setSelected() {
      for (let type of this.types) {
        type.selected = (type.name === this.menuSelections.quests)
      }
    },
    async select(questSubpage, listIndex) {
      const pathParts = questSubpage._path.split('/')
      this.menuSelections.quests = pathParts[pathParts.length-2]
      this.activePath = questSubpage._path
      this.activeComponent = questSubpage._component
      for (let i in this.types) {
        this.types[i].selected = (i == listIndex)
      }
    }
  }
}
</script>