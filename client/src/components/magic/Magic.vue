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

function buildSubpages(modules, data) {
  return Object.entries(modules).map(([path, module]) => {
    const parts = path.split('/')
    const file = parts.pop().replace('.vue', '')
    const category = parts.pop()

    return {
      key: path,
      name: data.templates.magic[file]?._displayName?
        data.templates.magic[file]._displayName : file,
      category,
      component: module.default,
      selected: false
    }
  })
}

export default {
  name: 'Magic',
  inject: ['data', 'menuSelections'],
  data() {
    return {
      subpages: [],
      activeKey: null,
      activeComponentDef: null,
    }
  },
  mounted() {
    this.subpages = buildSubpages(modules, this.data)
    if (this.subpages.length) {
      const subpage = this.menuSelections.magic ? this.menuSelections.magic : this.subpages[0]
      this.activate(subpage)
    }
  },
  methods: {
    activate(subpage) {
      this.activeComponentDef = subpage.component
      this.activeKey = subpage.key
      this.menuSelections.magic = subpage

      for (const s of this.subpages) {
        s.selected = s === subpage
      }
    }
  }
}
</script>