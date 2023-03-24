<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">Magic Weapon Description</h2>
    </div>
  </div>
  <div class="info-panel-description">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
  </div>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">Magic Weapons</h2>
    </div>
  </div>
  <div class="info-panel-description">
    <div>
      <template v-for="weapon in weapons" :key="'CustomSpell-'+weapon.id+'-'+rerollToggle">
        <p>
          <Descriptor :type="'CustomWeapon'" :color="'#EE3AA3'" />
        </p>
      </template>
    </div>
  </div>
  <div class="center">
    <button class="button info-panel reroll-all" @click="rerollAll()">Reroll All</button>
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