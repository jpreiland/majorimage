<template>
  <div>
    <span class="button is-info rerollRow" @click="rerollRow()">➔</span>
    <Descriptor v-if="displayedDescriptors.effect" :type="'_Effect'" :color="'#6800df'" :key="effect" />
    <Descriptor v-if="displayedDescriptors.quality" :type="'_Quality'" :color="'#ef2e55'" :key="quality" />
    <Descriptor v-if="displayedDescriptors.color" :type="'_Color'" :color="'#3abb81'" :key="color" />
    <Descriptor v-if="displayedDescriptors.material" :type="'_Material'" :color="'#ffe08a'" :key="material" />
    <FilteredDescriptor v-if="itemTypes.compiled" :filteredFormats="itemTypes.formats" :formatPicker="itemTypes.formatPicker" :color="'#3e8ed0'" :key="item" />
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
    },
    data() {
      return {
        effect: true,
        quality: true,
        color: true,
        material: true,
        item: true
      }
    },
    methods: {
      async rerollRow() {
        this.effect = !this.effect
        this.quality = !this.quality
        this.color = !this.color
        this.material = !this.material
        this.item = !this.item
      }
    }
  }
</script>