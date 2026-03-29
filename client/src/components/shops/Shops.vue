<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.shops" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSlug }" @click="activate(subpage)">
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
  name: 'Shops',
  inject: ['data', 'menuSelections', 'subpages'],
  computed: {
    activeSlug() {
      return this.$route.params.subpage ?? this.subpages.shops[0]?.slug
    },
    activeSubpage() {
      return this.subpages.shops.find(
        s => s.slug === this.activeSlug
      ) || this.menuSelections.shops || this.subpages.shops[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    if (!this.$route.params.subpage && this.subpages.shops.length) {
      this.$router.replace(`/shops/${this.menuSelections.shops?.slug ? this.menuSelections.shops.slug : this.subpages.shops[0].slug}`)
    }
  },
  methods: {
    activate(subpage) {
      this.menuSelections.shops = subpage
      this.$router.replace(`/shops/${subpage.slug}`)
    }
  }
}
</script>