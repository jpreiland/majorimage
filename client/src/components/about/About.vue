<template>
  <div>
    <div class="info-card material info-panel-description" style="padding-left: 12px; padding-right: 12px;">
      <div class="attribute key">What is this place?</div>
      <div class="no-descriptors">
        <p>
          There are <span style="font-weight: bold;">{{ uniqueWordCount.toLocaleString() }}</span> 
          unique words in the Major Image data set, which are randomly stitched together in a wide
          variety of permutations to create all kinds of interesting ideas to present to your players 
          during a ttrpg session. The goal of this site is to quickly generate descriptions so that you 
          can keep the pace of play flowing and focus your brainpower on more important things like 
          critting the party's healer.
        </p>
      </div>

      <div class="attribute key">How does it work?</div>
      <div class="no-descriptors">
        <p>
          The color-coded underlined bits of text you see around the site are called Descriptors. 
          If you click one, it'll reroll itself to show something different! There are many different kinds
          of Descriptors, each containing their own rules for which word lists to randomly pick words from 
          and how to stitch those words together into a single unit.
        </p>
      </div>

      <div class="attribute key">Does Major Image use AI?</div>
      <div class="no-descriptors">
        <p>
          No.
        </p>
        <p>
          The word lists are typed by hand, as are the rules for randomly pulling from those lists. 
          You've probably noticed some output that makes no sense, which is a side effect of 
          this approach. However, since this site is meant to be a supplement rather than a replacement
          for the imagination, the nonsensical output can still be useful. If you find yourself asking
          how a given bit of output could have its existence justified, then this tool is working!
          Embrace the emergent worldbuilding.
        </p>
      </div>

      <div class="attribute key"><hr /></div>

      <div style="text-align: center;">
        <p>
          Lovingly created by <a href="https://twitter.com/barcodedm" target="_blank">BarcodeDM</a> with help from 
        </p>
        <p>
          <Descriptor :type="'A(n)AmountGroupCreature'" :color="'red'" /> 
          of <Descriptor :type="'_AdjectivePerson'" :color="'green'" />
          <Descriptor :type="'_Creatures'" :color="'blue'" />
        </p>
      </div>

      <div class="attribute key"><hr /></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Objects',
  inject: ['data'],
  data() {
    return {
      uniqueWordCount: 9001
    }
  },
  async mounted() {
    let uniqueWords = new Set()
    for (let category of Object.keys(this.data.categories)) {
      for (let word of this.data.categories[category]) {
        uniqueWords.add(word)
      }
    }
    this.uniqueWordCount = uniqueWords.size
  },
  methods: {}
}
</script>