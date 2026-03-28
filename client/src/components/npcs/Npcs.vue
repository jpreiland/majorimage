<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSlug }" @click="activate(subpage)">
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
import {buildSubpages} from './../../lib/page-util/page-utils.js'

const modules = import.meta.glob('./templates/*/*.vue', { eager: true })

export default {
  name: 'Npcs',
  inject: ['data', 'menuSelections'],
  data() {
    return {
      subpages: []
    }
  },
  computed: {
    activeSlug() {
      return this.$route.params.subpage ?? this.subpages[0]?.slug
    },
    activeSubpage() {
      return this.subpages.find(
        s => s.slug === this.activeSlug
      ) || this.menuSelections.npcs || this.subpages[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    this.subpages = buildSubpages(modules, 'npcs', this.data)

    if (!this.$route.params.subpage && this.subpages.length) {
      this.$router.replace(`/npcs/${this.menuSelections.npcs?.slug ? this.menuSelections.npcs.slug : this.subpages[0].slug}`)
    }
  },
  methods: {
    activate(subpage) {
      this.menuSelections.npcs = subpage
      this.$router.replace(`/npcs/${subpage.slug}`)
    }
  }
}
</script>