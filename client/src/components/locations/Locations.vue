<template>
  <div class="location-page">
    <div class="columns list locations">
      <div class="column locations" :key="'stone'">
        <ul>
          <li class="list-item location-list-item" v-for="(location, i) in locations" @click="select(location)" :key="'-location-'+i">{{ location.locationType }}</li>
        </ul>
      </div>
      <div class="column">
        <LocationInfoPanel :locationType="activeLocationType" :locationTemplateType="activeTemplate"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import LocationInfoPanel from "./LocationInfoPanel.vue"

export default {
  name: 'Locations',
  components: {
    LocationInfoPanel
  },
  data() {
    return {
      names: {
        adjective: ['default'],
        bit: ['default'],
        color: ['default'],
        creature: ['default'],
        epithet: ['default'],
        geography: ['default'],
        givenName: ['default'],
        surname: ['default']
      },
      locations: [],
      activeLocationType: 'City',
      activeTemplate: 'BasicCity'
    }
  },
  async beforeCreate() {
    const locationsResponse = await axios.get('api/locations', { })
    this.locations = locationsResponse.data
    if (this.locations) {
      this.activeLocationType = this.locations[0].locationType
      this.activeTemplate = this.locations[0].templates[0]
    }
  },
  methods: {
    async getLocationTypes() {
    },
    async select(location) {
      this.activeLocationType = location.locationType
      this.activeTemplate = location.templates[0]
    }
  },
}
</script>

<style>

</style>