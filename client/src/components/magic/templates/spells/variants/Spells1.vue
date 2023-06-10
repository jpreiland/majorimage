<template>
  <div class="card-header">
    <div class="card-header-left">
      <h2 class="card-title">SRD Spells</h2>
    </div>
  </div>
  <div class="info-panel-description">
    <div>
      <template v-for="spell in srdSpells" :key="'SRDspell-'+spell.id+'-'+rerollToggle">
        <p>
          <SimpleDescriptor :type="'spellSRD'" :properNoun="true" :color="'#FF8C58'" />
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
      <template v-for="spell in customSpells" :key="'CustomSpell-'+spell.id+'-'+rerollToggle">
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
      numSRDSpells: 6,
      srdSpells: [],
      numCustomSpells: 10,
      customSpells: [],
      rerollToggle: true
    }
  },
  mounted() {
    for (let i = 0; i < this.numSRDSpells; i++) {
      this.srdSpells.push({id: i})
    }
    for (let i = 0; i < this.numCustomSpells; i++) {
      this.customSpells.push({id: i})
    }
  },
  methods: {
    async rerollAll() {
      this.rerollToggle = !this.rerollToggle
    }
  }
}
</script>