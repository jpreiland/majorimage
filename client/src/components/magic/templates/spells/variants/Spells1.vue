<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">SRD Spells</h2>
    </div>
  </div>
  <div class="info-panel-description">
    <div>
      <template v-for="spell in spells" :key="'SRDspell-'+spell.id+'-'+rerollToggle">
        <p>
          <Descriptor :type="'_Spell'" :color="'#FF8C58'" />
        </p>
      </template>
    </div>
  </div>
  <div class="card-header" style="margin-top:2.5rem">
    <div class="card-header-left">
      <h2 class="card-title">Custom Spells</h2>
    </div>
  </div>
  <div class="info-panel-description">
    <div>
      <template v-for="spell in spells" :key="'CustomSpell-'+spell.id+'-'+rerollToggle">
        <p>
          <Descriptor :type="'CustomSpell'" :color="'#58CBFF'" />
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
  name: 'Spells1',
  inject: ['data'],
  data() {
    return {
      numSpells: 8,
      spells: [],
      rerollToggle: true
    }
  },
  mounted() {
    for (let i = 0; i < this.numSpells; i++) {
      this.spells.push({id: i})
    }
  },
  methods: {
    async rerollAll() {
      this.rerollToggle = !this.rerollToggle
    }
  }
}
</script>