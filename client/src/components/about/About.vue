<template>
  <div class="info-card material info-panel-description" style="padding-left: 12px; padding-right: 12px;">
    <div class="attribute-key">What is this place?</div>
    <div class="no-descriptors">
      <p>
        There are <span style="font-weight: bold;">{{ uniqueWordCount.toLocaleString() }}</span> unique words in the Major Image data set, 
        which are randomly stitched together in an unimaginably large amount of combinations to create 
        all kinds of interesting descriptions to present to your players during a ttrpg session. 
        The goal of this site is to present a wide variety of options as quickly as possible so that you can 
        keep the pace of play flowing and focus your brainpower on more important things like critting the party's healer.
      </p>
    </div>

    <div class="attribute-key">How does it work?</div>
    <div class="no-descriptors">
      <p>
        The color-coded underlined bits of text you see around the site are called Descriptors. 
        If you click one, it'll reroll itself to show something different! There are many different kinds
        of Descriptors, each containing their own rules for which word lists to randomly pick words from 
        and how to stitch those words together into a single unit.
      </p>
    </div>

    <div class="attribute-key">Does Major Image use AI?</div>
    <div class="no-descriptors">
      <p>
        No.
      </p>
      <p>
        The word lists are typed by hand, as are the rules for randomly pulling from those lists. 
        You've probably noticed some combinations that make no sense, which is an indicator
        that there's no natural language processing going on here. This is a feature, not a bug!
        Getting nonsensical combinations of words helps spark the imagination.
      </p>
    </div>

    <div class="attribute-key"><hr /></div>

    <div style="text-align: center;">
      <p>
        Lovingly created by <a href="https://twitter.com/barcodedm" target="_blank">BarcodeDM</a> with help from 
      </p>
      <p>
        <Descriptor :type="'A(n)AmountGroupCreature'" :color="'red'" /> 
        of <Descriptor :type="'_AdjectivePersonality'" :color="'green'" />
        <Descriptor :type="'_Creatures'" :color="'blue'" />
      </p>
    </div>

    <div class="attribute-key"><hr /></div>
  </div>
</template>

<script>

export default {
  name: 'Objects',
  inject: ['wordData'],
  data() {
    return {
      uniqueWordCount: 9001
    }
  },
  async mounted() {
    let uniqueWords = new Set()
    for (let wordList of Object.keys(this.wordData.words)) {
      for (let word of this.wordData.words[wordList]) {
        uniqueWords.add(word)
      }
    }
    this.uniqueWordCount = uniqueWords.size
  },
  methods: {}
}
</script>