<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.magic" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSubpage.slug }" @click="activate(subpage)">
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
  name: 'Magic',
  inject: ['data', 'menuSelections', 'subpages'],
  computed: {
    activeSlug() {
      return this.$route.params.subpage ?? this.subpages.magic[0]?.slug
    },
    activeSubpage() {
      return this.subpages.magic.find(
        s => s.slug === this.activeSlug
      ) || this.menuSelections.magic || this.subpages.magic[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    if (!this.$route.params.subpage && this.subpages.magic.length) {
      this.$router.replace(`/magic/${this.menuSelections.magic?.slug ? this.menuSelections.magic.slug : this.subpages.magic[0].slug}`)
    }
  },
  methods: {
    activate(subpage) {
      this.menuSelections.magic = subpage
      this.$router.replace(`/magic/${subpage.slug}`)
    }
  }
}
</script>