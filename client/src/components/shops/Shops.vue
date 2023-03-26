<template>
  <div>
    <div class="columns list left-scroll-menu">
      <div class="column left-scroll-menu">
        <ul>
          <li class="list-item" :class="{ 'selected': this.initialized && types[i].selected }" v-for="(shopSubpage, key, i) in data.templates.shops" @click="select(shopSubpage, i)" :key="'shopSubpage-'+key">{{ shopSubpage._displayName }}</li>
        </ul>
      </div>
      <div class="column right-info-card-holder">
        <div class="info-card right">
          <component v-if="initialized" :is="computeType"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Shops',
  inject: ['data', 'menuSelections'],
  data() {
    return {
      types: [],
      activeType: {},
      activePath: "",
      initialized: false
    }
  },
  async mounted() {
    this.loadTypes()
    if (!this.menuSelections.shops) {
      this.menuSelections.shops = this.types[0].name
    }
    this.activeType = this.menuSelections.shops
    this.activePath = this.data.templates.shops[this.activeType]._path
    this.setSelected()
    this.initialized = true
  },
  methods: {
    loadTypes() { 
      for (let key of Object.keys(this.data.templates.shops)) {
        this.types.push({name: key, selected: false})
      }
    },
    setSelected() {
      for (let type of this.types) {
        type.selected = (type.name === this.menuSelections.shops)
      }
    },
    async select(shopSubpage, listIndex) {
      const pathParts = shopSubpage._path.split('/')
      this.menuSelections.shops = pathParts[pathParts.length-2]
      this.activePath = shopSubpage._path
      for (let i in this.types) {
        this.types[i].selected = (i == listIndex)
      }
    }
  },
  computed: {
    computeType () {
      if (this.activePath.includes('..')) return
      return defineAsyncComponent(() => import(`${this.activePath}`))
    }
  }
}
</script>

<style>

</style>