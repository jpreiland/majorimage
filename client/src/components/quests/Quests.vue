<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.quests" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSubpage.slug }" @click="activate(subpage)">
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
  name: 'Quests',
  inject: ['data', 'menuSelections', 'subpages'],
  computed: {
    activeSlug() {
      return this.$route.params.subpage ?? this.subpages.quests[0]?.slug
    },
    activeSubpage() {
      return this.subpages.quests.find(
        s => s.slug === this.activeSlug
      ) || this.menuSelections.quests || this.subpages.quests[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    if (!this.$route.params.subpage && this.subpages.quests.length) {
      this.$router.replace(`/quests/${this.menuSelections.quests?.slug ? this.menuSelections.quests.slug : this.subpages.quests[0].slug}`)
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