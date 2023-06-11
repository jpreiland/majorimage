<template>
  <div class="info-panel-description">
    <p>
      variant 1
      <Descriptor :type="'City'" />
      Lorem ipsum
    </p>
  </div>
</template>

<script>
export default {
  name: 'Ship1',
  inject: ['data']
}
</script>