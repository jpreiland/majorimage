<template>
  <div class="info-panel-description">
    <p>
      <Descriptor :nameFormats="this.wordData.dnfMap['City']" />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      hendrerit, ligula vitae feugiat ullamcorper, velit <Descriptor :nameFormats="this.wordData.dnfMap['City']" /> placerat nisi, 
      sit <Descriptor :nameFormats="this.wordData.dnfMap['City']" :color="'green'"/> vestibulum <Descriptor :nameFormats="this.wordData.dnfMap['City']" /> enim et magna.Lorem <Descriptor :nameFormats="this.wordData.dnfMap['City']" /> dolor sit amet, consectetur adipiscing elit. Integer <Descriptor :nameFormats="this.wordData.dnfMap['City']" />, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien <Descriptor :nameFormats="this.wordData.dnfMap['City']" /> et magna.<Descriptor :nameFormats="this.wordData.dnfMap['City']" /> ipsum dolor sit <Descriptor :nameFormats="this.wordData.dnfMap['City']" />, consectetur adipiscing elit. <Descriptor :nameFormats="this.wordData.dnfMap['City']" /> hendrerit, 
      ligula vitae feugiat ullamcorper.
      Lorem ipsum dolor sit amet, consectetur adipiscing <Descriptor :nameFormats="this.wordData.dnfMap['City']" />. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, 
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
  inject: ['wordData'],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>