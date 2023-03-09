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
        <NameDescriptor v-if="this.names" :nameFormats="nameFormats[locationType]" />
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
        City: {
          "color-geography": { weight: 1, parts: [[true, 'color'], [false, ' '], [true, 'geography']] },
          "creature-geography": { weight: 1, parts: [[true, 'creature'], [false, ' '], [true, 'geography']] },
          "givenName-geography": { weight: 1, parts: [[true, 'givenName'], [false, '\'s '], [true, 'geography']] },
        },
        Countryside: {
          "creature-geography": { weight: 1, parts: [[true, 'creature'], [false, ' '], [true, 'geography']] },
          "givenName-geography": { weight: 1, parts: [[true, 'givenName'], [false, '\'s '], [true, 'geography']] },
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
