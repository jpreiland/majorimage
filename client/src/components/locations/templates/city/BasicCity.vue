<template>
  <div class="info-panel-description">
    <p>
      <NameDescriptor :nameFormats="cityNameFormats" />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      hendrerit, ligula vitae feugiat ullamcorper, velit <NameDescriptor :nameFormats="cityNameFormats" /> placerat nisi, 
      sit <NameDescriptor :nameFormats="cityNameFormats" /> vestibulum <NameDescriptor :nameFormats="cityNameFormats" /> enim et magna.Lorem <NameDescriptor :nameFormats="cityNameFormats" /> dolor sit amet, consectetur adipiscing elit. Integer <NameDescriptor :nameFormats="cityNameFormats" />, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien <NameDescriptor :nameFormats="cityNameFormats" /> et magna.<NameDescriptor :nameFormats="cityNameFormats" /> ipsum dolor sit <NameDescriptor :nameFormats="cityNameFormats" />, consectetur adipiscing elit. <NameDescriptor :nameFormats="cityNameFormats" /> hendrerit, 
      ligula vitae feugiat ullamcorper.
      Lorem ipsum dolor sit amet, consectetur adipiscing <NameDescriptor :nameFormats="cityNameFormats" />. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, 
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
      cityNameFormats: {
          "monster-geography": { weight: 1, parts: [['pick-group', 'monster'], ['static', ' '], ['pick', 'geography']] },
          "humanoidCommon-geography": { weight: 1, parts: [['pick', 'humanoidCommon'], ['static', ' '], ['pick', 'geography']] },
          "color-geography": { weight: 1, parts: [['pick', 'color'], ['static', ' '], ['pick', 'geography']] },
        }
    }
  },
  methods: {
  }
}
</script>