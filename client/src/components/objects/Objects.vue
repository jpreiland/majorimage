<template>
  <div class="columns list left-scroll-menu">
    <div class="column list left-scroll-menu">
      <ul>
        <li v-for="(subpage) in subpages.objects" :key="subpage.key" class="list-item" :class="{ 'selected': subpage.slug === activeSlug }" @click="activate(subpage)">
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
  name: 'Objects',
  inject: ['data', 'menuSelections', 'subpages'],
  computed: {
    activeSlug() {
      return this.$route.params.subpage ?? this.subpages.objects[0]?.slug
    },
    activeSubpage() {
      return this.subpages.objects.find(
        s => s.slug === this.activeSlug
      ) || this.menuSelections.objects || this.subpages.objects[0]
    },
    activeComponentDef() {
      return this.activeSubpage?.component ?? null
    }
  },
  mounted() {
    if (!this.$route.params.subpage && this.subpages.objects.length) {
      this.$router.replace(`/objects/${this.menuSelections.objects?.slug ? this.menuSelections.objects.slug : this.subpages.objects[0].slug}`)
    }
  },
  methods: {
    activate(subpage) {
      this.menuSelections.objects = subpage
      this.$router.replace(`/objects/${subpage.slug}`)
    }
  }
}
</script>