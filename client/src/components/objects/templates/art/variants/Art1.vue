<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">Artwork Description</h2>
    </div>
  </div>
  <div class="info-panel-description">
      <p>
        The work evokes themes of 
        <Descriptor :type="'_VirtuePositive'" :color="'#65d1db'"/>
        and 
        <Descriptor :type="'_VirtueNegative'" :color="'#8f2f34'"/>
        . <br />
        Lorem ipsum <Descriptor :type="'TestNum5-17'" :color="'#00ffff'"/> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <Descriptor :type="'TestNum0-9-no'" :color="'#ff00ff'"/> incididunt ut labore et dolore magna aliqua. 
        Ut enim ad  minim veniam, quis nostrud exercitation ullamco laboris <Descriptor :type="'TestNum5-17'" :color="'#ff0000'" :numRangeOverride="{min: 0, max: 3, zeroString: 'nothing!'}"/> nisi ut aliquip ex ea commodo consequat. 
        Duis <Descriptor :type="'EnhancementBonus'" :color="'#00ff00'"/> Sword aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
  </div>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">Art Pieces</h2>
    </div>
  </div>
  <div class="info-panel-description">
    <div>
      <template v-for="art in artwork" :key="'Art-'+art.id+'-'+rerollToggle">
        <p>
          <Descriptor :type="'MartialManeuver'" :color="'#EE3AA3'" />
        </p>
      </template>
    </div>
  </div>
  <div class="center">
    <button class="button info-panel reroll-all" @click="rerollAll()">Reroll All</button>
  </div>
</template>

<script>
import Descriptor from '@/components/descriptors/Descriptor.vue';

export default {
    name: "Blacksmith1",
    inject: ["data"],
    data() {
        return {
            numArtwork: 10,
            artwork: [],
            rerollToggle: true
        };
    },
    mounted() {
        for (let i = 0; i < this.numArtwork; i++) {
            this.artwork.push({ id: i });
        }
    },
    methods: {
        async rerollAll() {
            this.rerollToggle = !this.rerollToggle;
        }
    },
    components: { Descriptor }
}
</script>