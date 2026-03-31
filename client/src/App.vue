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
        <NavLink v-for="(page) in topNavPages" :key="page.name" :page-name="page.name" :color="page.meta.color" :tab-display-name="page.meta.navDisplayName" />
      </div>
    </div>

    <main class="page-container">
      <router-view class="page" />
    </main>

    <div class="navigation">
      <NavLink v-for="(page) in bottomNavPages" :key="page.name" :page-name="page.name" :tab-display-name="page.meta.navDisplayName" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NavLink from './components/navigation/NavLink.vue'
import { isTopNavRoute, isBottomNavRoute } from './types/routes'

const router = useRouter()

const topNavPages = computed(() => {
  return router.getRoutes().filter(isTopNavRoute)
})

const bottomNavPages = computed(() => {
  return router.getRoutes().filter(isBottomNavRoute)
})
</script>