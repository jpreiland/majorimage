<template>
  <div>
    <Descriptor :type="'_A(n)Quality'" :color="'#ef2e55'" :key="quality" />
    <Descriptor :type="'_Color'" :color="'#3abb81'" :key="color" />
    <FilteredDescriptor v-if="itemTypes.compiled" :filteredFormats="itemTypes.formats" :formatPicker="itemTypes.formatPicker" :color="'#3e8ed0'" :key="item" />
  </div>
</template>

<script>
  export default {
    name: 'ObjectRow',
    props: {
      itemTypes: Object
    },
    data() {
      return {
        quality: true,
        color: true,
        item: true
      }
    }
  }
</script>