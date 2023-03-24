<template>
  <div>
    <div class="columns list left-scroll-menu">
      <div class="column left-scroll-menu">
        <ul>
          <li class="list-item" v-for="(magicSubpage, i) in data.templates.magic" @click="select(magicSubpage)" :key="'-magicSubpage-'+i">{{ magicSubpage._displayName }}</li>
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
  name: 'Magic',
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
    if (!this.menuSelections.magic) {
      this.menuSelections.magic = this.types[0]
    }
    this.activeType = this.menuSelections.magic
    this.activePath = this.data.templates.magic[this.activeType]._path
    this.initialized = true
  },
  methods: {
    loadTypes() { 
      for (let key of Object.keys(this.data.templates.magic)) {
        this.types.push(key)
      }
    },
    async select(magicSubpage) {
      const pathParts = magicSubpage._path.split('/')
      this.menuSelections.magic = pathParts[pathParts.length-2]
      this.activePath = magicSubpage._path
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