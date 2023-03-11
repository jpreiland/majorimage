<template>
  <span class="button descriptor name-descriptor" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import pluralize from 'pluralize'

export default {
  name: "NameDescriptor",
  inject: ['words'],
  props: {
    nameFormats: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      descriptorText: "default name",
      formatPicker: []
    }
  },
  async mounted() {
    for (let format of Object.keys(this.nameFormats)) {
      this.formatPicker = this.formatPicker.concat(Array(this.nameFormats[format].weight).fill(format))
    }
    this.reroll()
  },
  methods: {
    async reroll() {
      if (!this.words) return "(name)"
      const format = this.formatPicker[Math.floor(Math.random() * this.formatPicker.length)]

      this.descriptorText = this.buildName(this.nameFormats[format].parts)
    },
    buildName(formatParts) {
      let name = ""

      for (let part of formatParts) {
        switch (part[0]) {
          case 'pick':
            name += this.partPicker(part[1])
            break;
          case 'pick-pluralize':
            name += pluralize(this.partPicker(part[1]))
            break;
          case 'pick-pluralize-optional':
            if (Math.random() >= 0.5) {
              name += pluralize(this.partPicker(part[1]))
            } else {
              name += this.partPicker(part[1])
            }
            break;
          case 'static':
            name += part[1]
            break;

          default:
            break;
        }
      }

      return name
    },
    partPicker(part) {
      return this.words[part][Math.floor(Math.random() * this.words[part].length)]
    }
  }
}

</script>