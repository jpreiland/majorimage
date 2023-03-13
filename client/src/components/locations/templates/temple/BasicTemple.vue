<template>
  here is the basic temple template 
  <Descriptor :type="'__Price'" :color="'purple'"/>
  <Descriptor :type="'__Price'" :color="'gold'"/>
  <Descriptor :type="'__Price'" :color="'silver'"/>
  <Descriptor :type="'__Price'" :color="'orange'"/>
  <Descriptor :type="'__Price'" :color="'gold'" :price-override="{min: 123, max: 555, denomination: 'gold'}"/>
</template>

<script>
import Descriptor from '../../../descriptors/Descriptor.vue'

export default {
  name: 'BasicTemple',
  components: {
    Descriptor
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>