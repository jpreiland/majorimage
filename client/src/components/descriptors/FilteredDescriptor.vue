<template>
  <span class="button descriptor name-descriptor" :style="setColor()" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import stitch from '../../lib/descriptor-utils/stitcher'

export default {
  name: "FilteredDescriptor",
  inject: ['data'],
  props: {
    filteredFormats: {
      type: Object,
      required: true
    },
    formatPicker: {
      type: Array,
      required: true
    },
    color: {
      type: String
    },
    priceOverride: {
      type: Object
    },
    numRangeOverride: {
      type: Object
    }
  },
  data () {
    return {
      descriptorText: "Filtered Descriptor"
    }
  },
  async mounted() {
    this.reroll()
  },
  methods: {
    async reroll() {
      const format = this.formatPicker[Math.floor(Math.random() * this.formatPicker.length)]
      this.descriptorText = stitch(this.filteredFormats[format].format, this.data, this.priceOverride, this.numRangeOverride)
    },
    setColor() {
      return `border-bottom-color: ${this.color};`
    }
  }
}

</script>