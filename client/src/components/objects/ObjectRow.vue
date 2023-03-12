<template>
  <div>
    <span class="button is-info rerollRow" @click="">➔</span>
    <Descriptor v-if="displayedDescriptors.effect" :type="'_Effect'" :color="'#6800df'"/>
    <Descriptor v-if="displayedDescriptors.quality" :type="'_Quality'" :color="'#ef2e55'" />
    <Descriptor v-if="displayedDescriptors.color" :type="'_Color'" :color="'#3abb81'" />
    <Descriptor v-if="displayedDescriptors.material" :type="'_Material'" :color="'#ffe08a'" />
    <FilteredDescriptor v-if="itemTypes.compiled" :filteredFormats="itemTypes.formats" :formatPicker="itemTypes.formatPicker" :color="'#3e8ed0'" />
  </div>
</template>

<script>
  import Descriptor from '../descriptors/Descriptor.vue'
  import FilteredDescriptor from '../descriptors/FilteredDescriptor.vue'

  export default {
    name: 'ObjectRow',
    components: {
      Descriptor,
      FilteredDescriptor
    },
    props: {
      displayedDescriptors: Object,
      itemTypes: Object
    }
  }
</script>