<template>
  <div>
    <div class="info-card info-panel-description" style="padding-left: 12px; padding-right: 12px;">
      <div class="attribute key info">
        What is this place?
      </div>
      <div class="no-descriptors">
        <p>
          There are <span style="font-weight: bold;">{{ wordCount.toLocaleString() }}</span> 
          unique words in the Major Image data set, which are randomly stitched together in a
          variety of permutations to create ideas to kickstart your imagination or present to your players 
          during a ttrpg session. The goal of this site is to quickly generate names and descriptions so that you 
          can keep the pace of play flowing and focus your brainpower on more important things like 
          critting the party's healer.
        </p>
      </div>

      <div class="attribute key">
        How does it work?
      </div>
      <div class="no-descriptors">
        <p>
          The color-coded underlined bits of text you see around the site are called Descriptors. 
          If you click one, it'll reroll itself to show something different! There are many different kinds
          of Descriptors, each containing their own rules for which word lists to randomly pick words from 
          and how to stitch those words together into a single unit.
        </p>
      </div>

      <div class="attribute key">
        Does Major Image use AI?
      </div>
      <div class="no-descriptors">
        <p>
          No.
        </p>
        <p>
          The word lists are typed by hand, as are the rules for randomly pulling from those lists. 
          Sometimes the output is silly or nonsensical, but that can still be useful. If you find yourself asking
          how a given bit of output could have its existence justified, then this tool is working!
          Embrace the emergent worldbuilding.
        </p>
      </div>

      <div class="attribute key">
        <hr>
      </div>

      <div style="text-align: center;">
        <p>
          Lovingly created by <a href="https://bsky.app/profile/barcodedm.bsky.social" target="_blank">BarcodeDM</a> with help from
        </p>
        <p>
          <SimpleDescriptor :type="'amountGroupCreature'" :a_an="true" :color="'red'" /> 
          of <SimpleDescriptor :type="'adjectivePerson'" :color="'green'" />
          <SimpleDescriptor :type="'creature'" :pick-style="'pick-pluralize'" :color="'blue'" />
        </p>
      </div>

      <div class="attribute key">
        <hr>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppContext } from '../../composables/useAppContext'
const { wordCount } = useAppContext()
</script>