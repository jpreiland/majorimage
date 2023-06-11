<template>
  <span>{{ descriptorText }}</span>
</template>

<script>
import stitch from '../../lib/descriptor-utils/stitcher'
import { mapFormats, pickFormat } from '../../lib/descriptor-utils/formats'

export default {
  name: 'StealthDescriptor',
  inject: ['data'],
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'black'
    },
    // eslint-disable-next-line vue/require-default-prop
    priceOverride: {
      type: Object
    },
    // eslint-disable-next-line vue/require-default-prop
    numRangeOverride: {
      type: Object
    }
  },
  data () {
    return {
      descriptorText: "Stealth Descriptor",
      formatMap: {},
      totalWeight: 0
    }
  },
  async mounted() {
    const res = mapFormats(this.data.dfMap[this.type])
    this.formatMap = res.formatMap
    this.totalWeight = res.totalWeight

    const format = pickFormat(this.formatMap, this.totalWeight)
    this.descriptorText = stitch(this.data.dfMap[this.type][format].format, this.data, this.priceOverride, this.numRangeOverride)
  }
}

</script>