<template>
  <div>
    <SimpleDescriptor :type="'qualityObject'" :a_an="true" :color="'#ef2e55'" />
    <Descriptor :type="'Color'" :color="'#3abb81'" />
    <FilteredDescriptor v-if="itemTypes.compiled" :filtered-formats="itemTypes.formats" :format-picker="itemTypes.formatPicker" :color="'#3e8ed0'" />
  </div>
</template>

<script>
  export default {
    name: 'ObjectRow',
    props: {
      // eslint-disable-next-line vue/require-default-prop
      itemTypes: Object
    }
  }
</script>