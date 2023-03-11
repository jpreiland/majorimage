<template>
  <div class="info-card location" >
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">icon</h2>
      </div>
      <div class="card-header-right" v-if="this.wordData">
        <div v-if="!this.wordData">Generating Location...</div>
        <template v-for="locationTitleType in locationTypes" v-bind:key="'location-name-'+locationTitleType.locationType">
          <Descriptor v-if="this.locationType === locationTitleType.locationType"  :type="locationTitleType.locationType"  />
        </template>
      </div>
    </div>
    <LocationTemplate v-if="this.wordData" :locationType="locationType" :locationTemplateType="locationTemplateType" />
  </div>
</template>

<script>
import LocationTemplate from "./templates/LocationTemplate.vue"
import Descriptor from '../descriptors/Descriptor.vue'

export default {
  name: 'LocationInfoPanel',
  components: {
    LocationTemplate,
    Descriptor
  },
  inject: ['wordData'],
  props: {
    locationType: {
      type: String,
      required: true
    },
    locationTemplateType: {
      type: String,
      required: true
    },
    locationTypes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      oneOrTwo: true,
      testDescriptor: "one descriptor",
      testDescriptor2: "another descriptor",
      locationName: "",
      locationNameFormats: {}
    }
  },
  async mounted() {
  },
  methods: {
    testRollDescriptor() {
      this.oneOrTwo = !this.oneOrTwo
    }
  }
}
</script>

<style scoped>
</style>
