<template>
  <div class="info-panel-description">
    <p>
      temple variant 1
      <Descriptor :type="'Temple'" :color="'green'" />
      Lorem ipsum
    </p>
  </div>
</template>

<script>
export default {
  name: 'Temple1',
  inject: ['data']
}
</script>