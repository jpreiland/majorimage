<template>
  <router-link :to="{ name: pageName }" custom v-slot="{ navigate }">
    <span
      class="button nav-btn" 
      :class="[{ 'nav-selected': isActive }, color]"
      @click="handleClick(navigate)"
    >
      {{ tabDisplayName }}
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'NavLink',
  inject: ['menuSelections'],
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
  },
  methods: {
    handleClick(navigate) {
      if (this.isActive) this.menuSelections[this.pageName] = ''
      navigate()
    }
  }
}
</script>