<template>
  <span class="button descriptor name-descriptor" :style="setColor()" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import stitch from '../../lib/stitcher/stitcher'

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
      formatPicker: [],
      linkValue: 0
    }
  },
  async mounted() {
    for (let format of Object.keys(this.data.dfMap[this.type])) {
      this.formatPicker = this.formatPicker.concat(Array(this.data.dfMap[this.type][format].weight).fill(format))
    }
    this.reroll()
  },
  methods: {
    async reroll() {
      const format = this.formatPicker[Math.floor(Math.random() * this.formatPicker.length)]
      this.descriptorText = stitch(this.data.dfMap[this.type][format].format, this.data, this.priceOverride)

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