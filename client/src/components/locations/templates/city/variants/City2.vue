<template>
  <div>
    <div class="card-header">
      <div class="card-header-left">
        <LinkedDescriptor :type="'City'" :link="'cityName'" :color="'purple'" @link-update="linkUpdate" />
      </div>
    </div>
    <CityOverview />
    <div class="info-panel-description">
      <p>
        {{ links.cityName }} is
        <SimpleDescriptor :type="'adjectiveSizeBasic'" :a_an="true" :color="'#c42b68'" /> city located 
        <Descriptor :type="'DistanceLarge'" :color="'#61d0ff'" /> <SimpleDescriptor :type="'direction'" :color="'#2b7fc4'" /> 
        of <Descriptor :type="'GeographicFeature'" :color="'brown'" />. 
      </p>
      <p>
        variant 2
        <Descriptor :type="'City'" />
        Lorem ipsum 
        <LinkedDescriptor :type="'City'" :color="'pink'" :link="'tlk'" :linked-parser="tlkParser" @link-update="linkUpdate" /> {{ links.tlk }} 
        dolor sit amet, consectetur adipiscing elit. 
        <Descriptor :type="'Book'" :color="'red'" />
        hendrerit, ligula vitae feugiat ullamcorper, velit 
        <Descriptor :type="'EventVerbing'" :color="'gold'" /> placerat nisi, sit 
        <Descriptor :type="'Temple'" :color="'green'" /> vestibulum 
        <Descriptor :type="'TestA(n)'" :color="'orange'" /> enim et magna.Lorem 
        <Descriptor :type="'City'" /> 
        dolor sit amet, consectetur adipiscing elit. Integer 
        <Descriptor :type="'City'" />, ligula vitae feugiat ullamcorper, 
        velit nulla placerat nisi, sit amet vestibulum sapien 
        <Descriptor :type="'CreatureVerbingMisc(s)'" :color="'blue'" /> et magna.
        <Descriptor :type="'City'" /> 
        ipsum dolor sit <Descriptor :type="'City'" />, consectetur adipiscing elit. 
        <Descriptor :type="'City'" /> hendrerit, 
        ligula vitae feugiat ullamcorper.
        Lorem ipsum dolor sit amet, consectetur adipiscing 
        <Descriptor :type="'A(n)AdjectivePersonTradeNPC'" :color="'silver'" />. 
        Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet 
        <LinkedDescriptor :type="'City'" :color="'pink'" :link="'tlk2'" @link-update="linkUpdate" /> {{ links.tlk2 }} 
        vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, 
        ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper.
      </p>
    </div>
  </div>
</template>

<script>
import CityOverview from "./../CityOverview.vue"

export default {
  name: 'City2',
  components: {
    CityOverview
  },
  inject: ['data'],
  data() {
    return {
      links: {
        cityName: 'the city',
        tlk2: 'the other thing'
      }
    }
  },
  methods: {
    async linkUpdate(linkResponse) {
      this.links[linkResponse.linkKey] = linkResponse.linkVal
    },
    cityNameParser(descriptorText) {
      return descriptorText
    }
  }
}
</script>