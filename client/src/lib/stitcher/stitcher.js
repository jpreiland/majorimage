const pluralize = require('pluralize'),
      tensify = require('../../lib/tensify/inflector'),
      gerund = require('../../lib/gerunds/gerunds'),
      AvsAnSimple = require('../../lib/a-vs-an/avs-an-simple')

function stitch(parts, wordData) {
  let name = ""
  let word
  let numWords = 1
  let a_an_flag = false

  for (let part of parts) {
    switch (part[0]) {
      case 'pick':
        word = wordPicker(part[1], wordData)
        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        break;

      case 'pick-pluralize':
        if (a_an_flag) {
          name += "some "
          a_an_flag = false
        }
        name += pluralize(wordPicker(part[1], wordData))
        break;

      case 'pick-pluralize-optional':
        word = wordPicker(part[1], wordData)

        if (Math.random() >= 0.5) {
          if (a_an_flag) {
            name += "some "
            a_an_flag = false
          }
          name += pluralize(word)
          break;
        }

        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        break;

      case 'pick-pastTense':
        name += tensify(wordPicker(part[1], wordData))
        break;

      case 'pick-pastTense-optional':
        if (Math.random() >= 0.5) {
          name += tensify(wordPicker(part[1], wordData))
        } else {
          name += wordPicker(part[1], wordData)
        }
        break;

      case 'pick-gerund':
        name += gerund(wordPicker(part[1], wordData))
        break;

      case 'pick-gerund-optional':
        if (Math.random() >= 0.5) {
          name += gerund(wordPicker(part[1], wordData))
        } else {
          name += wordPicker(part[1], wordData)
        }
        break;

      case 'pick-group':
        word = groupWordPicker(part[1], wordData)
        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        break;

      case 'pick-group-pluralize':
        if (a_an_flag) {
          name += "some "
          a_an_flag = false
        }
        name += pluralize(groupWordPicker(part[1], wordData))
        break;

      case 'pick-group-pluralize-optional':
        word = groupWordPicker(part[1], wordData)

        if (Math.random() >= 0.5) {
          if (a_an_flag) {
            name += "some "
            a_an_flag = false
          }
          name += pluralize(word)
          break;
        }

        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        break;

      case 'pick-group-pastTense':
        name += tensify(groupWordPicker(part[1], wordData))
        break;

      case 'pick-group-pastTense-optional':
        if (Math.random() >= 0.5) {
          name += tensify(groupWordPicker(part[1], wordData))
        } else {
          name += groupWordPicker(part[1], wordData)
        }
        break;

      case 'pick-group-gerund':
        name += gerund(groupWordPicker(part[1], wordData))
        break;

      case 'pick-group-gerund-optional':
        if (Math.random() >= 0.5) {
          name += gerund(groupWordPicker(part[1], wordData))
        } else {
          name += groupWordPicker(part[1], wordData)
        }
        break;

      case 'pick-multi':
        numWords = part[2] ? (Math.floor(Math.random() * part[2]) + 1) : 1
        word = wordPicker(part[1], wordData)
        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        numWords--

        while (numWords > 0) {
          name += ' ' + wordPicker(part[1], wordData)
          numWords--
        }
        break;

      case 'pick-group-multi':
        numWords = part[2] ? (Math.floor(Math.random() * part[2]) + 1) : 1
        word = groupWordPicker(part[1], wordData)
        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        numWords--

        while (numWords > 0) {
          name += ' ' + groupWordPicker(part[1], wordData)
          numWords--
        }
        break;

      case 'static':
        name += part[1]
        break;

      case 'a(n)':
        name += " "
        a_an_flag = true
        break;

      default:
        break;
    }
  }

  return name
}

function do_a_an(word) {
  return AvsAnSimple.query(word) + " " + word
}

function wordPicker(category, wordData) {
  return wordData.words[category][Math.floor(Math.random() * wordData.words[category].length)]
}

function groupWordPicker(wordGroup, wordData) {
  // pick category from word group
  const groupsize = wordData.wordGroups[wordGroup].totalWords
  const grouproll = Math.floor(Math.random() * groupsize)
  let category = ''

  for (let categorySize of Object.keys(wordData.wordGroups[wordGroup].categoryMap)) {
    category = wordData.wordGroups[wordGroup].categoryMap[categorySize]
    if (categorySize >= grouproll) break
  }

  // pick word
  return wordData.words[category][Math.floor(Math.random() * wordData.words[category].length)]
}

module.exports = stitch