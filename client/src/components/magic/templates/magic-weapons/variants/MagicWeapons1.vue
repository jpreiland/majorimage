<template>
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
      numWeapons: 18,
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