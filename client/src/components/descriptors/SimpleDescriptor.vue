<template>
  <span class="button descriptor name-descriptor" :style="setColor()" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import stitch from '../../lib/descriptor-utils/stitcher'

export default {
  name: "SimpleDescriptor",
  inject: ['data'],
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    a_an: {
      type: Boolean
    },
    properNoun: {
      type: Boolean
    },
    pickStyle: {
      type: String
    }
  },
  data () {
    return {
      descriptorText: "Simple Descriptor",
      pickStyles: [
        "pick",
        "pick-pluralize",
        "pick-pluralize-optional",
        "pick-pastTense",
        "pick-verber",
        "pick-gerund"
      ],
      format: []
    }
  },
  async mounted() {
    if (this.properNoun) this.format.push(["title"])
    if (this.a_an) this.format = [["a(n)"]].concat(this.format)

    if (this.pickStyle && this.pickStyles.indexOf(this.pickStyle) >= 0) {
      this.format.push([this.pickStyle, this.type])
    } else {
      this.format.push(["pick", this.type])
    }

    this.reroll()
  },
  methods: {
    async reroll() {
      if (this.type) this.descriptorText = stitch(this.format, this.data, null, null)
    },
    setColor() {
      return `border-bottom-color: ${this.color};`
    }
  }
}

</script>