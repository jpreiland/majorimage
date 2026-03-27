<template>
  <router-link 
    :to="{ name: pageName }" 
    class="button nav-btn" 
    :class="[{ 'nav-selected': isActive }, color]"
  >
    {{ tabDisplayName }}
  </router-link>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    pageName: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    tabDisplayName: {
      type: String, 
      required: true
    }
  },
  computed: {
    isActive() {
      return this.$route.name === this.pageName
    }
  }
}
</script>