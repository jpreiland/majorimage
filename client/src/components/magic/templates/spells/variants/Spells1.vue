<template>
  <div>
    <CollapsibleSection title="SRD Spells" :initially-open="true">
      <div>
        <template v-for="spell in srdSpells" :key="'SRDspell-' + spell.id + '-' + rerollToggle">
          <p>
            <SimpleDescriptor type="spellSRD" :proper-noun="true" color="#FF8C58" />
          </p>
        </template>
      </div>
    </CollapsibleSection>

    <CollapsibleSection title="Custom Spells" :initially-open="true" style="margin-top:2.5rem">
      <div>
        <template v-for="spell in customSpells" :key="'CustomSpell-' + spell.id + '-' + rerollToggle">
          <p>
            <Descriptor type="CustomSpell" color="#58CBFF" />
          </p>
        </template>
      </div>
    </CollapsibleSection>

    <div class="center">
      <button class="button info-panel reroll-all" @click="rerollAll">
        Reroll All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CollapsibleSection from '../../../../layout/CollapsibleSection.vue'

const numSRDSpells = 6
const numCustomSpells = 10

const srdSpells = ref<{ id: number }[]>([])
const customSpells = ref<{ id: number }[]>([])
const rerollToggle = ref(true)

onMounted(() => {
  srdSpells.value = Array.from(
    { length: numSRDSpells },
    (_, id) => ({ id })
  )

  customSpells.value = Array.from(
    { length: numCustomSpells },
    (_, id) => ({ id })
  )
})

function rerollAll() {
  rerollToggle.value = !rerollToggle.value
}

</script>