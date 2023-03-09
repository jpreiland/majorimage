<template>
  <div class="info-card material">
    <div class="card-header" @click="this.$parent.switchUnits()">
      <div class="card-header-left">
        <img :src="material.image" class="card-image">
      </div>
      <div class="card-header-right">
        <h2 class="card-title">{{ material.name }}</h2>
        <ul class="card-attributes">
          <li v-for="(val, key) in material.attributes.weightCost" :key="key">
            <span class="attribute-key">{{ key }}/{{ material.attributes.units }}:</span>
            <span class="attribute-value">{{ isNaN(val.value) ? val.value : Number(val.value.toFixed(2)).toLocaleString() }}{{ val.units }}</span>
          </li>
        </ul>
        <ul class="card-attributes">
          <li v-for="(val, key) in material.attributes.other" :key="key">
            <span class="attribute-key">{{ key }}:</span>
            <span class="attribute-value">{{ isNaN(val.value) ? val.value : Number(val.value.toFixed(2)).toLocaleString() }}{{ val.units }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <p class="card-description"><span class="attribute-key">Description:</span> {{ material.description }}</p>
      <p class="card-description"><span class="attribute-key">Common Uses:</span> {{ material.uses }}</p>
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
