<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.locations" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSubpage.slug }" @click="activate(subpage)">
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
  name: 'Locations',
  inject: ['data', 'menuSelections', 'subpages'],
  computed: {
    activeSlug() {
      return this.$route.params.subpage ?? this.subpages.locations[0]?.slug
    },
    activeSubpage() {
      return this.subpages.locations.find(
        s => s.slug === this.activeSlug
      ) || this.menuSelections.locations || this.subpages.locations[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    if (!this.$route.params.subpage && this.subpages.locations.length) {
      this.$router.replace(`/locations/${this.menuSelections.locations?.slug ? this.menuSelections.locations.slug : this.subpages.locations[0].slug}`)
    }
  },
  methods: {
    activate(subpage) {
      this.menuSelections.locations = subpage
      this.$router.replace(`/locations/${subpage.slug}`)
    }
  }
}
</script>