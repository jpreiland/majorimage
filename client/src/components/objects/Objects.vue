<template>
  <div>
    <div class="columns list left-scroll-menu">
      <div class="column left-scroll-menu">
        <ul>
          <li v-for="(objectSubpage, key, i) in data.templates.objects" :key="'objectSubpage-'+key" class="list-item" :class="{ 'selected': initialized && types[i].selected }" @click="select(objectSubpage, i)">
            {{ objectSubpage._displayName }}
          </li>
        </ul>
      </div>
      <div class="column right-info-card-holder">
        <div class="info-card right">
          <component :is="computeType" v-if="initialized" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Objects',
  inject: ['data', 'menuSelections'],
  data() {
    return {
      types: [],
      activeType: {},
      activePath: "",
      initialized: false
    }
  },
  computed: {
    computeType () {
      if (this.activePath.includes('..')) return
      return defineAsyncComponent(() => import(`${this.activePath}`))
    }
  },
  async mounted() {
    this.loadTypes()
    if (!this.menuSelections.objects) {
      this.menuSelections.objects = this.types[0].name
    }
    this.activeType = this.menuSelections.objects
    this.activePath = this.data.templates.objects[this.activeType]._path
    this.setSelected()
    this.initialized = true
  },
  methods: {
    loadTypes() { 
      for (let key of Object.keys(this.data.templates.objects)) {
        this.types.push({name: key, selected: false})
      }
    },
    setSelected() {
      for (let type of this.types) {
        type.selected = (type.name === this.menuSelections.objects)
      }
    },
    async select(objectSubpage, listIndex) {
      const pathParts = objectSubpage._path.split('/')
      this.menuSelections.objects = pathParts[pathParts.length-2]
      this.activePath = objectSubpage._path
      for (let i in this.types) {
        this.types[i].selected = (i == listIndex)
      }
    }
  }
}
</script>

<style>

</style>