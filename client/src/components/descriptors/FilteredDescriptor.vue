<template>
  <span class="button descriptor name-descriptor" :style="setColor()" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import stitch from '../../lib/stitcher/stitcher'

export default {
  name: "FilteredDescriptor",
  inject: ['wordData'],
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
    }
  },
  data () {
    return {
      descriptorText: "default name"
    }
  },
  async mounted() {
    this.reroll()
  },
  methods: {
    async reroll() {
      const format = this.formatPicker[Math.floor(Math.random() * this.formatPicker.length)]
      this.descriptorText = stitch(this.filteredFormats[format].format, this.wordData, this.priceOverride)
    },
    setColor() {
      return `border-bottom-color: ${this.color};`
    }
  }
}

</script>