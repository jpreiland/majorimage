<template>
  <div class="info-panel-description">
    <p>
      smalltown variant 2
      <Descriptor :type="'City'" />
      Lorem ipsum
    </p>
  </div>
</template>

<script>
export default {
  name: 'SmallTown2',
  inject: ['data']
}
</script>