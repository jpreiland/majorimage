<template>
  <span class="button descriptor name-descriptor" :style="setColor()" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import { stitch } from '../../lib/descriptor-utils/stitcher'
import { pickFormat } from '../../lib/descriptor-utils/formats'

export default {
  name: 'LinkedDescriptor',
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
    },
    link: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    linkedParser: {
      type: Function,
    }
  },
  emits: ['linkUpdate'],
  data () {
    return {
      descriptorText: "Linked Descriptor",
      linkValue: 0,
      formatMap: {},
      totalWeight: 0
    }
  },
  async mounted() {
    this.formatMap = this.data.dfMap[this.type].formatMap
    this.totalWeight = this.data.dfMap[this.type].totalWeight
    this.reroll()
  },
  methods: {
    async reroll() {
      const format = pickFormat(this.formatMap, this.totalWeight)
      this.descriptorText = stitch(this.data.formats[format], this.data, this.priceOverride, this.numRangeOverride)

      const linkResponse = {
        linkKey: this.link, 
        linkVal: this.linkedParser ? this.linkedParser(this.descriptorText) : this.descriptorText
      }
      this.$emit('linkUpdate', linkResponse)
    },
    setColor() {
      return `border-bottom-color: ${this.color};`
    }
  }
}

</script>