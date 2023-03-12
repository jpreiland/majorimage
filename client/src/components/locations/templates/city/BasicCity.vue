<template>
  <div class="info-panel-description">
    <p>
      <Descriptor :type="'City'" />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. <Descriptor :type="'Book'" :color="'red'"/>
      hendrerit, ligula vitae feugiat ullamcorper, velit <Descriptor  :type="'EventVerbing'" :color="'gold'" /> placerat nisi, sit <Descriptor :type="'Temple'" :color="'green'"/> vestibulum <Descriptor :type="'TestA(n)'" :color="'orange'" /> enim et magna.Lorem <Descriptor :type="'City'" /> dolor sit amet, consectetur adipiscing elit. Integer <Descriptor :type="'City'" />, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien <Descriptor :type="'CreatureVerbingMisc(s)'" :color="'blue'"/> et magna.<Descriptor :type="'City'" /> ipsum dolor sit <Descriptor :type="'City'" />, consectetur adipiscing elit. <Descriptor :type="'City'" /> hendrerit, 
      ligula vitae feugiat ullamcorper.
      Lorem ipsum dolor sit amet, consectetur adipiscing <Descriptor :type="'A(n)AdjectivePersonalityTradeNPC'" :color="'silver'"/>. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, 
      sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, 
      ligula vitae feugiat ullamcorper.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, 
      sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, 
      ligula vitae feugiat ullamcorper.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, 
      sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, 
      ligula vitae feugiat ullamcorper.
    </p>
  </div>
</template>

<script>
import Descriptor from '../../../descriptors/Descriptor.vue'

export default {
  name: 'BasicCity',
  components: {
    Descriptor
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>