<template>
  <div>
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Magic Weapon Description
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      <p>
        Lorem ipsum <Descriptor :type="'TestNum5-17'" :color="'#00ffff'" /> 
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        <Descriptor :type="'TestNum0-9-no'" :color="'#ff00ff'" /> incididunt ut labore et dolore magna aliqua. 
        Ut enim ad  minim veniam, quis nostrud exercitation ullamco laboris 
        <Descriptor :type="'TestNum5-17'" :color="'#ff0000'" :num-range-override="{min: 0, max: 3, zeroString: 'nothing!'}" /> 
        nisi ut aliquip ex ea commodo consequat. 
        Duis <Descriptor :type="'EnhancementBonus'" :color="'#00ff00'" /> 
        Sword aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Modified Weapon
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      <p>
        <Descriptor :type="'ModifiedWeapon'" :color="'#8e1fde'" :key="rerollToggle" />
      </p>
    </div>
    <div class="card-header">
      <div class="card-header-left">
        <h2 class="card-title">
          Magic Weapon Names
        </h2>
      </div>
    </div>
    <div class="info-panel-description">
      <div>
        <template v-for="weapon in weapons" :key="'Weapon-'+weapon.id+'-'+rerollToggle">
          <p>
            <Descriptor :type="'CustomWeapon'" :color="'#EE3AA3'" />
          </p>
        </template>
      </div>
    </div>
    <div class="center">
      <button class="button info-panel reroll-all" @click="rerollAll()">
        Reroll All
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MagicWeapons1',
  inject: ['data'],
  data() {
    return {
      numWeapons: 10,
      weapons: [],
      rerollToggle: true
    }
  },
  mounted() {
    for (let i = 0; i < this.numWeapons; i++) {
      this.weapons.push({id: i})
    }
  },
  methods: {
    async rerollAll() {
      this.rerollToggle = !this.rerollToggle
    }
  }
}
</script>