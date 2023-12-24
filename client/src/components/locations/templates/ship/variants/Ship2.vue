<template>
  <div class="info-panel-description">
    <p>
      ship variant 2
      <Descriptor :type="'City'" />
      Lorem ipsum
    </p>
  </div>
</template>

<script>
export default {
  name: 'Ship2',
  inject: ['data']
}
</script>