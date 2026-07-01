<template>
  <div>
    <SimpleDescriptor type="qualityObject" :a_an="true" color="#ef2e55" />
    <Descriptor type="Color" color="#3abb81" />
    <FilteredDescriptor v-if="itemTypes.compiled" :filtered-formats="itemTypes.formats" :format-picker="itemTypes.formatPicker" color="#3e8ed0" />
  </div>
</template>

<script lang="ts" setup>
import { ItemTypes } from '../SetDressing.vue';

interface Props {
  itemTypes: ItemTypes
}

const props = defineProps<Props>()

</script>