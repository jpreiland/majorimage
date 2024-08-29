<template>
  <div class="info-card material">
    <div class="card-header" @click="$parent.switchUnits()">
      <div class="card-header-left">
        <h2 class="card-title">
          {{ material.name }}
        </h2>
        <ul class="card-attributes">
          <li v-for="(val, key) in material.attributes.row1" :key="key">
            <span class="attribute key">{{ key }}/{{ material.attributes.units }}:</span>
            <span class="attribute">{{ isNaN(val.value) ? val.value : Number(val.value.toFixed(2)).toLocaleString() }}{{ val.units }}</span>
          </li>
        </ul>
        <ul class="card-attributes">
          <li v-for="(val, key) in material.attributes.row2" :key="key">
            <span class="attribute key">{{ key }}:</span>
            <span class="attribute">{{ isNaN(val.value) ? val.value : Number(val.value.toFixed(2)).toLocaleString() }}{{ val.units }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="card-description">
      <p>
        <span class="attribute key">Description:</span> {{ material.description }}
      </p>
      <p v-if="material.occurrence">
        <span class="attribute key">Occurrence:</span> {{ material.occurrence }}
      </p>
      <p>
        <span class="attribute key">Common Uses:</span> {{ material.uses }}
      </p>
      <p v-if="material.component">
        <span class="attribute key">Component For:</span> {{ material.component }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialInfoCard',
  props: {
    material: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
