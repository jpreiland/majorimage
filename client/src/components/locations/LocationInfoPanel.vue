<template>
  <div class="info-card location">
    <!-- title -->
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">icon</h2>
      </div>
      <div class="card-header-right">
        <h2 class="card-title">{{ locationName }}</h2>
      </div>
    </div>
    <!-- location template -->
    <LocationTemplate :locationType="locationType" :locationTemplateType="locationTemplateType" />
  </div>
</template>

<script>
import LocationTemplate from "./templates/LocationTemplate.vue"

export default {
  name: 'LocationInfoPanel',
  components: {
    LocationTemplate
  },
  inject: ['names'],
  props: {
    locationType: {
      type: String,
      required: true
    },
    locationTemplateType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      oneOrTwo: true,
      testDescriptor: "one descriptor",
      testDescriptor2: "another descriptor",
      locationName: ""
    }
  },
  mounted() {
    this.buildLocationName()
  },
  updated() {
    this.buildLocationName()
  },
  methods: {
    testRollDescriptor() {
      this.oneOrTwo = !this.oneOrTwo
    },
    buildLocationName() {
      this.locationName = this.locationType
    }
  }
}
</script>

<style scoped>
</style>
