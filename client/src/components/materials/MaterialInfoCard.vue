<template>
  <div class="material-info-card">
    <div class="card-header">
      <div class="card-header-left">
        <img :src="material.image" class="card-image">
      </div>
      <div class="card-header-right">
        <h2 class="card-title">{{ material.name }}</h2>
        <ul class="card-attributes">
          <li v-for="(value, key) in material.attributes" :key="key">
            <span class="attribute-key">{{ key }}:</span>
            <span class="attribute-value">{{ value }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <p class="card-description"><span class="attribute-key">Description:</span> {{ material.description }}</p>
      <p class="card-description"><span class="attribute-key">Common uses:</span> {{ material.uses }}</p>
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
.material-info-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin: 10px;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header-left {
  margin-right: 1rem;
}

.card-image {
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}

.card-header-right {
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  margin: 0;
}

.card-attributes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.attribute-key {
  margin-right: 0.5rem;
  font-weight: bold;
}

.attribute-value {
  margin-right: 0.5rem;
}

.card-description {
  margin: 0;
  font-size: 0.875rem;
}
</style>
