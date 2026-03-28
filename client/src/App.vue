<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div>
    <div class="banner">
      <div class="header">
        <p>
          <img class="header-icon" src="./assets/icon.png">
          <span class="title-text">Major Image</span>
        </p>
      </div>
      <div class="navigation">
        <NavLink v-for="(page) in topNavPages" :page-name="page.name" :color="page.meta.color" :tab-display-name="page.meta.navDisplayName" />
      </div>
    </div>

    <main class="page-container">
      <router-view class="page" />
    </main>

    <div class="navigation">
      <NavLink v-for="(page) in bottomNavPages" :page-name="page.name" :tab-display-name="page.meta.navDisplayName" />
    </div>
  </div>
</template>

<script>
import NavLink from './components/navigation/NavLink.vue'

export default {
  components: {
    NavLink
  },
  computed: {
    topNavPages() {
      return this.$router.getRoutes().filter(page => page.meta.topNav)
    },
    bottomNavPages() {
      return this.$router.getRoutes().filter(page => page.meta.bottomNav)
    }
  }
}
</script>