<template>
  <div>
    <SimpleDescriptor :type="'qualityObject'" :a_an="true" :color="'#ef2e55'" />
    <Descriptor :type="'Color'" :color="'#3abb81'" />
    <FilteredDescriptor v-if="itemTypes.compiled" :filteredFormats="itemTypes.formats" :formatPicker="itemTypes.formatPicker" :color="'#3e8ed0'" />
  </div>
</template>

<script>
  export default {
    name: 'ObjectRow',
    props: {
      itemTypes: Object
    }
  }
</script>