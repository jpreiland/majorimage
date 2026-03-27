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
        <router-link to="/" class="button nav-btn red" exact-active-class="nav-selected">Objects</router-link>
        <router-link to="/locations" class="button nav-btn orange" exact-active-class="nav-selected">Locations</router-link>
        <router-link to="/magic" class="button nav-btn yellow" exact-active-class="nav-selected">Magic</router-link>
        <router-link to="/shops" class="button nav-btn green" exact-active-class="nav-selected">Shops</router-link>
        <router-link to="/npcs" class="button nav-btn blue" exact-active-class="nav-selected">NPCs</router-link>
        <router-link to="/quests" class="button nav-btn indigo" exact-active-class="nav-selected">Quests</router-link>
        <router-link to="/materials" class="button nav-btn violet" exact-active-class="nav-selected">Materials</router-link>
      </div>
    </div>

    <main class="page-container">
      <router-view class="page" />
    </main>

    <div class="navigation">
      <router-link to="/about" class="button nav-btn">About</router-link>
      <router-link to="/acknowledgements" class="button nav-btn">Acknowledgements</router-link>
    </div>
  </div>
</template>