<template>
  <component :is="computeOverview"></component>
  <component :is="computeTemplateType"></component>
</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
  name: 'LocationTemplate',
  props: {
    locationTemplateType: {
      type: String,
      required: true
    },
    locationType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      oneOrTwo: true,
      testDescriptor: "one descriptor",
      testDescriptor2: "another descriptor",
      locationPathMap: {
        "City": { 
          "dir": "city",
          "templates": {
            "BasicCity": "BasicCity"
          },
          "overview": "CityOverview"
        },
        "Countryside": { 
          "dir": "countryside",
          "templates": {
            "BasicCountryside": "BasicCountryside"
          },
          "overview": "CountrysideOverview"
        },
        "Temple": { 
          "dir": "temple",
          "templates": {
            "BasicTemple": "BasicTemple"
          },
          "overview": "TempleOverview"
        },
        "Small Town": { 
          "dir": "small-town",
          "templates": {
            "BasicSmallTown": "BasicSmallTown"
          },
          "overview": "SmallTownOverview"
        },
        "Bazaar": { 
          "dir": "bazaar",
          "templates": {
            "BasicBazaar": "BasicBazaar"
          },
          "overview": "BazaarOverview"
        },
        "Ship": { 
          "dir": "ship",
          "templates": {
            "BasicShip": "BasicShip"
          },
          "overview": "ShipOverview"
        },
      }
    }
  },
  methods: {
    testRollDescriptor() {
      this.oneOrTwo = !this.oneOrTwo
    }
  },
  computed: {
    computeTemplateType () {
      const pathLocationType = this.locationPathMap[this.locationType].dir
      const pathTemplateName = this.locationPathMap[this.locationType].templates[this.locationTemplateType]

      if (pathLocationType.includes('..')) return

      return defineAsyncComponent(() => import(`./${pathLocationType}/${pathTemplateName}.vue`))
    },
    computeOverview () {
      const pathLocationType = this.locationPathMap[this.locationType].dir
      const pathOverviewName = this.locationPathMap[this.locationType].overview

      if (pathLocationType.includes('..')) return

      return defineAsyncComponent(() => import(`./${pathLocationType}/${pathOverviewName}.vue`))
    }
  }
}
</script>

<style>
</style>