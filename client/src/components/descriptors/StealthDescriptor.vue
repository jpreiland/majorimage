<template>
  <span>{{ descriptorText }}</span>
</template>

<script>
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { pickFormat } from '../../lib/descriptor-utils/formats'

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
    this.formatMap = this.data.dfMap[this.type].formatMap
    this.totalWeight = this.data.dfMap[this.type].totalWeight

    const format = pickFormat(this.formatMap, this.totalWeight)
    this.descriptorText = stitch(this.data.formats[format], this.data, this.priceOverride, this.numRangeOverride)
  }
}

</script>