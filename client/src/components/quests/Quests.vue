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
  name: 'Quests',
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
      ) || this.menuSelections.quests || this.subpages[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    this.subpages = buildSubpages(modules, 'quests', this.data)

    if (!this.$route.params.subpage && this.subpages.length) {
      this.$router.replace(`/quests/${this.menuSelections.quests?.slug ? this.menuSelections.quests.slug : this.subpages[0].slug}`)
    }
  },
  methods: {
    activate(subpage) {
      this.menuSelections.quests = subpage
      this.$router.replace(`/quests/${subpage.slug}`)
    }
  }
}
</script>