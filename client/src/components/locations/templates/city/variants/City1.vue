<template>
  <CollapsibleSection title="City">
    <CityOverview />
    <p>
      variant 1
      <Descriptor type="City" />
      Lorem ipsum 
      <LinkedDescriptor type="City" :color="'pink'" link="tlk" :linked-parser="tlkParser" @link-update="linkUpdate" />
      {{ linkedDescriptorTexts.tlk }} 
      dolor sit amet, consectetur adipiscing elit. 
      <Descriptor type="Book" color="red" />
      hendrerit, ligula vitae feugiat ullamcorper, velit 
      <Descriptor type="EventVerbing" color="gold" /> placerat nisi, sit 
      <Descriptor type="Temple" color="green" /> vestibulum 
      <Descriptor type="TestA(n)" color="orange" /> enim et magna.Lorem 
      <Descriptor type="City" /> 
      dolor sit amet, consectetur adipiscing elit. Integer 
      <Descriptor type="City" />, ligula vitae feugiat ullamcorper, 
      velit nulla placerat nisi, sit amet vestibulum sapien 
      <Descriptor type="CreatureVerbingMisc(s)" color="blue" /> et magna.
      <Descriptor type="City" /> 
      ipsum dolor sit <Descriptor type="City" />, consectetur adipiscing elit. 
      <Descriptor type="City" /> hendrerit, 
      ligula vitae feugiat ullamcorper.
      Lorem ipsum dolor sit amet, consectetur adipiscing 
      <Descriptor type="A(n)AdjectivePersonTradeNPC" color="silver" />. 
      Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet 
      <LinkedDescriptor type="City" color="pink" link="tlk2" @link-update="linkUpdate" />
      {{ linkedDescriptorTexts.tlk2 }} 
      vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, 
      ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna. 
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper.
    </p>
    <p>
      <StealthDescriptor type="Book" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, 
      ligula vitae feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum 
      dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit nulla placerat 
      nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, 
      ligula vitae feugiat ullamcorper.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper, velit 
      nulla placerat nisi, sit amet vestibulum sapien enim et magna. Lorem 
      <Descriptor type="City" /> ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula vitae 
      feugiat ullamcorper, velit nulla placerat nisi, sit amet vestibulum sapien enim et magna.Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit. Integer hendrerit, ligula vitae feugiat ullamcorper.
    </p>
  </CollapsibleSection>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CityOverview from './../overview/CityOverview.vue'
import CollapsibleSection from '../../../../layout/CollapsibleSection.vue'

import type { LinkResponse } from '../../../../descriptors/LinkedDescriptor.vue'

const linkedDescriptorTexts = ref<Record<string, string>>({
  tlk: 'default tlk',
  tlk2: 'default tlk2'
})

function linkUpdate(linkResponse: LinkResponse) {
  linkedDescriptorTexts.value[linkResponse.linkKey] = linkResponse.linkVal
}

function tlkParser(descriptorText: string) {
  let parts = descriptorText.split(' ')
  return parts[parts.length-1]
}

</script>