<template>
  <span class="button descriptor name-descriptor" :style="setColor()" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import stitch from '../../lib/descriptor-utils/stitcher'
import { mapFormats, pickFormat } from '../../lib/descriptor-utils/formats'

export default {
  name: "Linked",
  inject: ['data'],
  emits: ['linkUpdate'],
  props: {
    type: {
      type: String,
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
    },
    link: {
      type: String,
      required: true
    },
    linkedParser: {
      type: Function,
    }
  },
  data () {
    return {
      descriptorText: "default name",
      linkValue: 0,
      formatMap: {},
      totalWeight: 0
    }
  },
  async mounted() {
    const res = mapFormats(this.data.dfMap[this.type])
    this.formatMap = res.formatMap
    this.totalWeight = res.totalWeight
    this.reroll()
  },
  methods: {
    async reroll() {
      const format = pickFormat(this.formatMap, this.totalWeight)
      this.descriptorText = stitch(this.data.dfMap[this.type][format].format, this.data, this.priceOverride, this.numRangeOverride)

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