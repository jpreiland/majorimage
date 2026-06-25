<template>
  <CollapsibleSection title="Dungeon Room">
    <p>
      (italics) This <SimpleDescriptor type="adjectiveSizeAndBasicLocation" color="blue" :key="'size'+rerollToggle" />
      <SimpleDescriptor type="roomAll" color="green" :key="'room'+rerollToggle" />
      is <Descriptor type="RoomLighting" color="orange" :key="'lighting'+rerollToggle" />.
      [atmosphere]. [furniture on the floor]. [things on the wall]. [interesting feature, furniture, or object]. [occupants].
    </p>
    <p>
      dungeon room variant 1
      <Descriptor type="Temple" color="green" :key="'lighting'+rerollToggle" />
      Lorem ipsum
    </p>
  </CollapsibleSection>
  <div class="center">
    <button class="button info-panel reroll-all" @click="rerollAll()">
      Reroll All
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CollapsibleSection from '../../../../layout/CollapsibleSection.vue'

const rerollToggle = ref(true)

function rerollAll() {
  rerollToggle.value = !rerollToggle.value
}

</script>