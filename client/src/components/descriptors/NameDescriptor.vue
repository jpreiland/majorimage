<template>
  <span class="button descriptor name-descriptor" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>

export default {
  name: "NameDescriptor",
  inject: ['names'],
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
      if (!this.names) return "(name)"
      const format = this.formatPicker[Math.floor(Math.random() * this.formatPicker.length)]

      this.descriptorText = this.buildName(this.nameFormats[format].parts)
    },
    buildName(formatParts) {
      let name = ""

      for (let part of formatParts) {
        // if this is a dynamic part, concatenate value from appropriate part picker function otherwise, concatenate static part
        if (part[0]) {
          switch (part[1]) {
            case 'color':
              name += this.pickColor()
              break;
            case 'creature': 
              name += this.pickCreature()
              break;
            case 'geography':
              name += this.pickGeography()
              break;
            case 'givenName':
              name += this.pickGivenName()
              break;
          
            default:
              break;
          }
        } else {
          name += part[1]
        }
      }

      return name
    },
    pickColor() {
      return this.names.color[Math.floor(Math.random() * this.names.color.length)]
    },
    pickCreature() {
      return this.names.creature[Math.floor(Math.random() * this.names.creature.length)]
    },
    pickGeography() {
      return this.names.geography[Math.floor(Math.random() * this.names.geography.length)]
    },
    pickGivenName() {
      return this.names.givenName[Math.floor(Math.random() * this.names.givenName.length)]
    }
  }
}

</script>