<template>
  <div class="info-panel-description">
    <p>
      variant 1
    </p>
    <div v-for="_ in spells">
      <p>
        <Descriptor :type="'_Spell'" :color="'#ff91ad'"/>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spells1',
  inject: ['data'],
  data() {
    return {
      numSpells: 12,
      spells: [],
    }
  },
  mounted() {
    for (let i = 0; i < this.numSpells; i++) {
      this.spells.push({id: 1})
    }
  }
}
</script>