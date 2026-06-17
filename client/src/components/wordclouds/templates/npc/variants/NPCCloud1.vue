<template>
  <div class="info-panel-description">
    <p>
      npc cloud variant 1 <br />
      <SimpleDescriptor :type="'nameAll'" :proper-noun="true" :color="'pink'"  /><br />
      <SimpleDescriptor :type="'colorAll'" :proper-noun="true" :color="['red', 'orange', 'yellow', 'green', 'blue', 'violet']"  /><br />
      <SimpleDescriptor :type="'adjectivePerson'" :proper-noun="true" :color="'green'"  /><br />
      <SimpleDescriptor :type="'tradeAll'" :proper-noun="true" :color="'blue'"  /><br />
      <SimpleDescriptor :type="'animal'" :proper-noun="true" :color="'orange'"  /><br />
      <SimpleDescriptor :type="'structure'" :proper-noun="true" :color="'red'"  /><br />
      <SimpleDescriptor :type="'itemAll'" :proper-noun="true" :color="'purple'"  />
    </p>
  </div>
</template>

<script lang="ts" setup>
</script>