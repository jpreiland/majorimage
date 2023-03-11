<template>
  <div class="info-panel-description">
    <p>
      <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      hendrerit, ligula vitae feugiat ullamcorper, velit <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" /> placerat nisi, 
      sit <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" :color="'green'"/> vestibulum <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" /> enim et magna.Lorem <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" /> dolor sit amet, consectetur adipiscing elit. Integer <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" />, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" /> et magna.<NameDescriptor :nameFormats="this.wordData.dnfMap['City']" /> ipsum dolor sit <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" />, consectetur adipiscing elit. <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" /> hendrerit, 
      ligula vitae feugiat ullamcorper.
      Lorem ipsum dolor sit amet, consectetur adipiscing <NameDescriptor :nameFormats="this.wordData.dnfMap['City']" />. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, 
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
import NameDescriptor from '../../../descriptors/NameDescriptor.vue'

export default {
  name: 'BasicCity',
  components: {
    NameDescriptor
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