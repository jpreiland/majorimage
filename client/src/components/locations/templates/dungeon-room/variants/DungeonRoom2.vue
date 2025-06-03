<template>
  <div class="info-panel-description">
    <p>
      (italics) This <SimpleDescriptor :type="'adjectiveSizeAndBasicLocation'" :color="'blue'" :key="rerollToggle" /> <SimpleDescriptor :type="'roomAll'" :color="'green'" :key="rerollToggle" /> is <Descriptor :type="'RoomLighting'" :color="'orange'" :key="rerollToggle" />. [atmosphere]. [furniture on the floor]. [things on the wall]. [interesting feature, furniture, or object]. [occupants].
    </p>
    <p>
      dungeon room variant 2
      <Descriptor :type="'Temple'" :color="'green'" />
      Lorem ipsum
    </p>
  </div>
  <div class="center">
      <button class="button info-panel reroll-all" @click="rerollAll()">
        Reroll All
      </button>
    </div>
</template>

<script>
export default {
  name: 'DungeonRoom2',
  inject: ['data'],
  data() {
    return {
      rerollToggle: true
    }
  },
  methods: {
    async rerollAll() {
      this.rerollToggle = !this.rerollToggle
    }
  }
}
</script>