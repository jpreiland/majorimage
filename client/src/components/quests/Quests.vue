<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.key === activeKey }" @click="activate(subpage)">
          {{ subpage.name }}
        </li>
      </ul>
    </div>
    <div class="column right-info-card-holder">
      <div class="info-card right">
        <component :is="activeComponentDef" />
      </div>
    </div>
  </div>
</template>

<script>
const modules = import.meta.glob('./templates/*/*.vue', { eager: true })
import {buildSubpages} from './../../lib/page-util/page-utils.js'

export default {
  name: 'Quests',
  inject: ['data', 'menuSelections'],
  data() {
    return {
      subpages: [],
      activeKey: null,
      activeComponentDef: null,
    }
  },
  mounted() {
    this.subpages = buildSubpages(modules, 'quests', this.data)
    if (this.subpages.length) {
      const subpage = this.menuSelections.quests ? this.menuSelections.quests : this.subpages[0]
      this.activate(subpage)
    }
  },
  methods: {
    activate(subpage) {
      this.activeComponentDef = subpage.component
      this.activeKey = subpage.key
      this.menuSelections.quests = subpage

      for (const s of this.subpages) {
        s.selected = s === subpage
      }
    }
  }
}
</script>