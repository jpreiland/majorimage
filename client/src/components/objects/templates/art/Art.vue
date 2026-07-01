<template>
  <CollapsibleSection title="Art Description">
    <p>
      This work evokes themes of 
      <SimpleDescriptor type="virtuePositive" color="#65d1db" />
      and 
      <SimpleDescriptor type="virtueNegative" color="#8f2f34" />.
      <br>
      Lorem ipsum <Descriptor type="TestNum5-17" color="#00ffff" /> 
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      <Descriptor type="TestNum0-9-no" color="#ff00ff" /> incididunt ut labore et dolore magna aliqua. 
      Ut enim ad  minim veniam, quis nostrud exercitation ullamco laboris 
      <Descriptor type="TestNum5-17" color="#ff0000" :num-range-override="{min: 0, max: 3, zeroString: 'nothing!'}" /> 
      nisi ut aliquip ex ea commodo consequat. 
      Duis <Descriptor type="EnhancementBonus" color="#00ff00" /> 
      Sword aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </CollapsibleSection>

  <CollapsibleSection title="Art Pieces">
    <template v-for="art in artwork" :key="'Art-' + art.id + '-' + rerollToggle">
      <p>
        <Descriptor type="MartialManeuver" color="#EE3AA3" />
      </p>
    </template>
  </CollapsibleSection>

  <div class="center">
    <button class="button info-panel reroll-all" @click="rerollAll()">
      Reroll All
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import CollapsibleSection from '../../../layout/CollapsibleSection.vue'

const numArtwork = 10

const artwork = ref<{ id: number }[]>([])
const rerollToggle = ref(true)

onMounted(() => {
  artwork.value = Array.from(
    { length: numArtwork },
    (_, id) => ({ id })
  )
})

function rerollAll() {
  rerollToggle.value = !rerollToggle.value
}

</script>