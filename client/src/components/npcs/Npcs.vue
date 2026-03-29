<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.npcs" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSlug }" @click="activate(subpage)">
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
export default {
  name: 'Npcs',
  inject: ['data', 'menuSelections', 'subpages'],
  computed: {
    activeSlug() {
      return this.$route.params.subpage ?? this.subpages.npcs[0]?.slug
    },
    activeSubpage() {
      return this.subpages.npcs.find(
        s => s.slug === this.activeSlug
      ) || this.menuSelections.npcs || this.subpages.npcs[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    if (!this.$route.params.subpage && this.subpages.npcs.length) {
      this.$router.replace(`/npcs/${this.menuSelections.npcs?.slug ? this.menuSelections.npcs.slug : this.subpages.npcs[0].slug}`)
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