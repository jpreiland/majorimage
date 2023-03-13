const AvsAnSimple = require('./../a-vs-an/avs-an-simple'),
      gerund = require('./../gerunds/gerunds'),
      pluralize = require('pluralize'),
      tensify = require('./../tensify/inflector')
      title = require('./../titleize/titleize')

/* this function is a travesty, maybe it'll get cleaned up some day */
function stitch(parts, wordData, priceOverride) {
  let name = ""
  let word
  let numWords = 1
  let a_an_flag = false
  let isTitle = false

  for (let part of parts) {
    if (part.length === 0) continue;
    switch (part[0]) {
      case 'pick':
        if (part.length !== 2) break;
        word = wordPicker(part[1], wordData)
        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        break;

      case 'pick-pluralize':
        if (part.length !== 2) break;
        if (a_an_flag) {
          name += "some "
          a_an_flag = false
        }
        name += pluralize(wordPicker(part[1], wordData))
        break;

      case 'pick-pluralize-optional':
        if (part.length !== 2) break;
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
        if (part.length !== 2) break;
        name += tensify(wordPicker(part[1], wordData))
        break;

      case 'pick-pastTense-optional':
        if (part.length !== 2) break;
        if (Math.random() >= 0.5) {
          name += tensify(wordPicker(part[1], wordData))
        } else {
          name += wordPicker(part[1], wordData)
        }
        break;

      case 'pick-gerund':
        if (part.length !== 2) break;
        name += gerund(wordPicker(part[1], wordData))
        break;

      case 'pick-gerund-optional':
        if (part.length !== 2) break;
        if (Math.random() >= 0.5) {
          name += gerund(wordPicker(part[1], wordData))
        } else {
          name += wordPicker(part[1], wordData)
        }
        break;

      case 'pick-group':
        if (part.length !== 2) break;
        word = groupWordPicker(part[1], wordData)
        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        break;

      case 'pick-group-pluralize':
        if (part.length !== 2) break;
        if (a_an_flag) {
          name += "some "
          a_an_flag = false
        }
        name += pluralize(groupWordPicker(part[1], wordData))
        break;

      case 'pick-group-pluralize-optional':
        if (part.length !== 2) break;
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
        if (part.length !== 2) break;
        name += tensify(groupWordPicker(part[1], wordData))
        break;

      case 'pick-group-pastTense-optional':
        if (part.length !== 2) break;
        if (Math.random() >= 0.5) {
          name += tensify(groupWordPicker(part[1], wordData))
        } else {
          name += groupWordPicker(part[1], wordData)
        }
        break;

      case 'pick-group-gerund':
        if (part.length !== 2) break;
        name += gerund(groupWordPicker(part[1], wordData))
        break;

      case 'pick-group-gerund-optional':
        if (part.length !== 2) break;
        if (Math.random() >= 0.5) {
          name += gerund(groupWordPicker(part[1], wordData))
        } else {
          name += groupWordPicker(part[1], wordData)
        }
        break;

      case 'pick-multi':
        if (part.length !== 3) break;
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
        if (part.length !== 3) break;
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
        if (part.length !== 2) break;
        word = part[1]
        if (a_an_flag) {
          name += do_a_an(word)
          a_an_flag = false
        } else {
          name += word
        }
        break;

      case 'a(n)':
        if (part.length !== 1) break;
        name += " "
        a_an_flag = true
        break;

      case 'title':
        if (part.length !== 1) break;
        isTitle = true
        break;

      case 'price':
        if (part.length < 3) break;
        const lower = Math.min(part[1], part[2])
        const higher = Math.max(part[1], part[2])
        const min = priceOverride ? Math.ceil(priceOverride.min) : Math.ceil(lower)
        const max = priceOverride ? Math.floor(priceOverride.max) : Math.floor(higher)
        let denomination

        if (priceOverride || part.length === 4) {
          denomination = (priceOverride && priceOverride.denomination) ? priceOverride.denomination : part[3]
        }

        let price = Math.floor(Math.random() * (max - min + 1) + min)

        switch (denomination) {
          case 'gold':
            price *= 100
            break;
          case 'silver':
            price *= 10
            break;
        
          default:
            break;
        }

        name += formatPrice(price)
        break;

      default:
        break;
    }
  }

  return isTitle ? title(name) : name
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

function formatPrice(price) {
  if (isNaN(price) || price <= 0) return "free"

  //copper
  const copper = price % 10
  price = (price - copper) / 10

  //silver
  const silver = price % 10
  price = (price - silver) / 10

  //gold
  gold = price

  return (gold > 0 ? gold.toLocaleString() + "g" : "") + (silver > 0 ? silver + "s" : "") + (copper > 0 ? copper + "c" : "")
}

module.exports = stitch