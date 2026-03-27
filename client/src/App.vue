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
        <NavLink :page-name="'objects'" :color="'red'" :tab-display-name="'Objects'" />
        <NavLink :page-name="'locations'" :color="'orange'" :tab-display-name="'Locations'" />
        <NavLink :page-name="'magic'" :color="'yellow'" :tab-display-name="'Magic'" />
        <NavLink :page-name="'shops'" :color="'green'" :tab-display-name="'Shops'" />
        <NavLink :page-name="'npcs'" :color="'blue'" :tab-display-name="'NPCs'" />
        <NavLink :page-name="'quests'" :color="'indigo'" :tab-display-name="'Quests'" />
        <NavLink :page-name="'materials'" :color="'violet'" :tab-display-name="'Materials'" />
      </div>
    </div>

    <main class="page-container">
      <router-view class="page" />
    </main>

    <div class="navigation">
      <NavLink :page-name="'about'" :tab-display-name="'About'" />
      <NavLink :page-name="'acknowledgements'" :tab-display-name="'Acknowledgements'" />
    </div>
  </div>
</template>

<script>
import NavLink from './components/navigation/NavLink.vue'

export default {
  components: {
    NavLink
  },
}
</script>