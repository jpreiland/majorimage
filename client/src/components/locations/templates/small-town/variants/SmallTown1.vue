<template>
  <CollapsibleSection title="Small Town">
    <p>
      smalltown variant 1
      <Descriptor :type="'City'" />
      Lorem ipsum
    </p>
  </CollapsibleSection>
</template>

<script lang="ts" setup>
import CollapsibleSection from '../../../../layout/CollapsibleSection.vue'
</script>