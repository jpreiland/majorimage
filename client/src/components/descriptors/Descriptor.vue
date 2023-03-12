<template>
  <span class="button descriptor name-descriptor" :style="setColor()" @click="reroll()">{{ descriptorText }}</span>
</template>

<script>
import pluralize from 'pluralize'
import tensify from '../../lib/tensify/inflector'
import gerund from '../../lib/gerunds/gerunds'
import AvsAnSimple from '../../lib/a-vs-an/avs-an-simple'

export default {
  name: "Descriptor",
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
    this.reroll()
  },
  methods: {
    async reroll() {
      if (!this.wordData) return "(name)"
      const format = this.formatPicker[Math.floor(Math.random() * this.formatPicker.length)]

      this.descriptorText = this.buildName(this.wordData.dfMap[this.type][format].format)
    },
    buildName(parts) {
      let name = ""
      let word
      let numWords = 1

      for (let part of parts) {
        switch (part[0]) {
          case 'pick':
            word = this.wordPicker(part[1])
            name += this.do_a_an(word)
            break;

          case 'pick-pluralize':
            if (this.a_an_flag) {
              name += "some "
              this.a_an_flag = false
            }
            name += pluralize(this.wordPicker(part[1]))
            break;

          case 'pick-pluralize-optional':
            word = this.wordPicker(part[1])

            if (Math.random() >= 0.5) {
              if (this.a_an_flag) {
                name += "some "
                this.a_an_flag = false
              }
              name += pluralize(word)
              break;
            }

            name += this.do_a_an(word)
            break;

          case 'pick-pastTense':
            name += tensify(this.wordPicker(part[1]))
            break;

          case 'pick-pastTense-optional':
            if (Math.random() >= 0.5) {
              name += tensify(this.wordPicker(part[1]))
            } else {
              name += this.wordPicker(part[1])
            }
            break;

          case 'pick-gerund':
            name += gerund(this.wordPicker(part[1]))
            break;

          case 'pick-gerund-optional':
            if (Math.random() >= 0.5) {
              name += gerund(this.wordPicker(part[1]))
            } else {
              name += this.wordPicker(part[1])
            }
            break;

          case 'pick-group':
            word = this.groupWordPicker(part[1])
            name += this.do_a_an(word)
            break;

          case 'pick-group-pluralize':
            if (this.a_an_flag) {
              name += "some "
              this.a_an_flag = false
            }
            name += pluralize(this.groupWordPicker(part[1]))
            break;

          case 'pick-group-pluralize-optional':
            word = this.groupWordPicker(part[1])

            if (Math.random() >= 0.5) {
              if (this.a_an_flag) {
                name += "some "
                this.a_an_flag = false
              }
              name += pluralize(word)
              break;
            }

            name += this.do_a_an(word)
            break;

          case 'pick-group-pastTense':
            name += tensify(this.groupWordPicker(part[1]))
            break;

          case 'pick-group-pastTense-optional':
            if (Math.random() >= 0.5) {
              name += tensify(this.groupWordPicker(part[1]))
            } else {
              name += this.groupWordPicker(part[1])
            }
            break;

          case 'pick-group-gerund':
            name += gerund(this.groupWordPicker(part[1]))
            break;

          case 'pick-group-gerund-optional':
            if (Math.random() >= 0.5) {
              name += gerund(this.groupWordPicker(part[1]))
            } else {
              name += this.groupWordPicker(part[1])
            }
            break;

          case 'pick-multi':
            numWords = part[2] ? (Math.floor(Math.random() * part[2]) + 1) : 1
            word = this.wordPicker(part[1])
            name += this.do_a_an(word)
            numWords--

            while (numWords > 0) {
              name += ' ' + this.wordPicker(part[1])
              numWords--
            }
            break;

          case 'pick-group-multi':
            numWords = part[2] ? (Math.floor(Math.random() * part[2]) + 1) : 1
            word = this.groupWordPicker(part[1])
            name += this.do_a_an(word)
            numWords--

            while (numWords > 0) {
              name += ' ' + this.groupWordPicker(part[1])
              numWords--
            }
            break;

          case 'static':
            name += part[1]
            break;

          case 'a(n)':
            name += " "
            this.a_an_flag = true
            break;

          default:
            break;
        }
      }

      return name
    },
    do_a_an(word) {
      if (!this.a_an_flag) return word
      this.a_an_flag = false
      return AvsAnSimple.query(word) + " " + word
    },
    wordPicker(category) {
      return this.wordData.words[category][Math.floor(Math.random() * this.wordData.words[category].length)]
    },
    groupWordPicker(wordGroup) {
      // pick category from word group
      const groupsize = this.wordData.wordGroups[wordGroup].totalWords
      const grouproll = Math.floor(Math.random() * groupsize)
      let category = ''

      for (let categorySize of Object.keys(this.wordData.wordGroups[wordGroup].categoryMap)) {
        category = this.wordData.wordGroups[wordGroup].categoryMap[categorySize]
        if (categorySize >= grouproll) break
      }

      // pick word
      return this.wordData.words[category][Math.floor(Math.random() * this.wordData.words[category].length)]
    },
    setColor() {
      return `border-bottom-color: ${this.color};`
    }
  }
}

</script>