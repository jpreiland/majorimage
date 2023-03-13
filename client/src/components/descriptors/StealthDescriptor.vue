<template>
  <span>{{ descriptorText }}</span>
</template>

<script>
import stitch from '../../lib/stitcher/stitcher'

export default {
  name: "StealthDescriptor",
  inject: ['wordData'],
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
  },
  data () {
    return {
      descriptorText: "default name",
      formatPicker: [],
      a_an_flag: false
    }
  },
  async mounted() {
    for (let format of Object.keys(this.wordData.dfMap[this.type])) {
      this.formatPicker = this.formatPicker.concat(Array(this.wordData.dfMap[this.type][format].weight).fill(format))
    }
    this.roll()
  },
  methods: {
    async roll() {
      if (!this.wordData) return "(name)"
      const format = this.formatPicker[Math.floor(Math.random() * this.formatPicker.length)]

      this.descriptorText = stitch(this.wordData.dfMap[this.type][format].format, this.wordData)
    }
  }
}

</script>