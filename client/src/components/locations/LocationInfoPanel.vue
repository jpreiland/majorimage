<template>
  <div class="info-card location">
    <!-- title -->
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">icon</h2>
      </div>
      <div class="card-header-right">
        <div v-if="!this.names">Generating Location...</div>
        <!-- TODO: computed component, different descriptors for each location type, larger size, static nameFormats -->
        <template v-for="locationTitleType in locationTypes" v-bind:key="'location-name-'+locationTitleType.locationType">
          <NameDescriptor  v-if="this.names && this.locationType === locationTitleType.locationType"  :nameFormats="nameFormats[locationTitleType.locationType]"  />
        </template>
      </div>
    </div>
    <!-- location template -->
    <LocationTemplate v-if="this.names" :locationType="locationType" :locationTemplateType="locationTemplateType" />
  </div>
</template>

<script>
import LocationTemplate from "./templates/LocationTemplate.vue"
import NameDescriptor from './../descriptors/NameDescriptor.vue'

export default {
  name: 'LocationInfoPanel',
  components: {
    LocationTemplate,
    NameDescriptor
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
      locationNameFormats: {},
      nameFormats: {
        "City": {
          "color-geography": { weight: 1, parts: [['pick', 'color'], ['static', ' '], ['pick', 'geography']] },
          "creature-geography": { weight: 1, parts: [['pick', 'creature'], ['static', ' '], ['pick', 'geography']] },
          "givenName-geography": { weight: 1, parts: [['pick', 'givenName'], ['static', '\'s '], ['pick', 'geography']] },
        },
        "Countryside": {
          "creature-geography": { weight: 1, parts: [['pick', 'creature'], ['static', ' '], ['pick', 'geography']] },
          "givenName-geography": { weight: 1, parts: [['pick', 'givenName'], ['static', '\'s '], ['pick', 'geography']] },
        },
        "Temple": {
          "temple-givenName": { weight: 1, parts: [['static', 'temple of '], ['pick', 'givenName']] },
          "temple-epithet": { weight: 2, parts: [['static', 'temple of the '], ['pick', 'epithet']] },
          "temple-adjectivePersonality-trade(s)": { weight: 3, parts: [['static', 'temple of the '], ['pick', 'adjectivePersonality'], ['static', ' '], ['pick-pluralize-optional', 'trade']] },
        },
        "Small Town": {
          "creature-geography": { weight: 1, parts: [['pick', 'creature'], ['static', ' '], ['pick', 'geography']] },
          "givenName-geography": { weight: 1, parts: [['pick', 'givenName'], ['static', '\'s '], ['pick', 'geography']] },
        },
        "Bazaar": {
          "creature-geography": { weight: 1, parts: [['pick', 'creature'], ['static', ' '], ['pick', 'geography']] },
          "givenName-geography": { weight: 1, parts: [['pick', 'givenName'], ['static', '\'s '], ['pick', 'geography']] },
        },
        "Ship": {
          "creature-geography": { weight: 1, parts: [['pick', 'creature'], ['static', ' '], ['pick', 'geography']] },
          "givenName-geography": { weight: 1, parts: [['pick', 'givenName'], ['static', '\'s '], ['pick', 'geography']] },
        }
      }
    }
  },
  async beforeMount() {

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
