<template>
  <div class="info-panel-description">
    <p>
      variant 2
      <Descriptor :type="'Temple'" :color="'green'" />
      Lorem ipsum
    </p>
  </div>
</template>

<script>
export default {
  name: 'Temple2',
  inject: ['data']
}
</script>