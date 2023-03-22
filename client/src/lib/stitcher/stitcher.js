const AvsAnSimple = require('./../a-vs-an/avs-an-simple'),
      gerund = require('./../gerunds/gerunds'),
      plural = require('./../plural/plural'),
      tensify = require('./../tensify/inflector'),
      title = require('./../titleize/titleize'),
      verber = require('./../verber/verber')

/* this function is a travesty, maybe it'll get cleaned up some day */
function stitch(parts, data, priceOverride) {
  let name = ""
  let word
  let numWords = 1
  let a_an_flag = false
  let isTitle = false

  if (parts === null || parts === undefined) console.log(`Missing descriptor format!`)

  for (let part of parts) {
    if (part.length === 0) continue;
    switch (part[0]) {
      case 'pick':
        if (part.length !== 2) break;
        word = picker(part[1], data)
        name += do_a_an(word, a_an_flag)
        a_an_flag = false
        break;

      case 'pick-pluralize':
        if (part.length !== 2) break;
        if (a_an_flag) {
          name += "some "
          a_an_flag = false
        }
        name += plural(picker(part[1], data))
        break;

      case 'pick-pluralize-optional':
        if (part.length !== 2) break;
        word = picker(part[1], data)

        if (Math.random() >= 0.5) {
          if (a_an_flag) {
            name += "some "
            a_an_flag = false
          }
          name += plural(word)
          break;
        }

        name += do_a_an(word, a_an_flag)
        a_an_flag = false
        break;

      case 'pick-pastTense':
        if (part.length !== 2) break;
        name += tensify(picker(part[1], data))
        break;

      case 'pick-verber':
        if (part.length !== 2) break;
        name += verber(picker(part[1], data))
        break;

      case 'pick-pastTense-optional':
        if (part.length !== 2) break;
        if (Math.random() >= 0.5) {
          name += tensify(picker(part[1], data))
        } else {
          name += picker(part[1], data)
        }
        break;

      case 'pick-gerund':
        if (part.length !== 2) break;
        name += gerund(picker(part[1], data))
        break;

      case 'pick-gerund-optional':
        if (part.length !== 2) break;
        if (Math.random() >= 0.5) {
          name += gerund(picker(part[1], data))
        } else {
          name += picker(part[1], data)
        }
        break;

      case 'pick-multi':
        if (part.length !== 3) break;
        numWords = part[2] ? (Math.floor(Math.random() * part[2]) + 1) : 1
        word = picker(part[1], data)
        name += do_a_an(word, a_an_flag)
        a_an_flag = false
        numWords--

        while (numWords > 0) {
          name += ' ' + picker(part[1], data)
          numWords--
        }
        break;

      case 'static':
        if (part.length !== 2) break;
        name += part[1]
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
        const price = rollPrice(part, priceOverride)
        name += formatPrice(price)
        break;

      default:
        break;
    }
  }

  return isTitle ? title(name) : name
}

function do_a_an(word, a_an_flag) {
  return a_an_flag ? AvsAnSimple.query(word) + " " + word : word
}

function picker(category, data) {
  if (Object.hasOwn(data.groups, category)) {
    category = categoryPicker(category, data)
  }
  return wordPicker(category, data)
}

function wordPicker(category, data) {
  if (!data.categories[category])  console.log(`category ${category} does not exist`)
  return data.categories[category][Math.floor(Math.random() * data.categories[category].length)]
}

function categoryPicker(group, data) {
  const groupsize = data.groups[group].totalWords
  const grouproll = Math.floor(Math.random() * groupsize)
  let categoryCandidate = ''

  for (let categorySize of Object.keys(data.groups[group].categoryMap)) {
    categoryCandidate = data.groups[group].categoryMap[categorySize]
    if (categorySize >= grouproll) break
  }

  if (Object.hasOwn(data.groups, categoryCandidate)) {
    return categoryPicker(categoryCandidate, data)
  }

  return categoryCandidate
}

function rollPrice(params, priceOverride) {
  const lower = priceOverride ? Math.min(priceOverride.min, priceOverride.max) : Math.min(params[1], params[2])
  const higher = priceOverride ? Math.max(priceOverride.min, priceOverride.max) : Math.max(params[1], params[2])
  const min = priceOverride ? Math.ceil(priceOverride.min) : Math.ceil(lower)
  const max = priceOverride ? Math.floor(priceOverride.max) : Math.floor(higher)
  let denomination

  if (priceOverride || params.length === 4) {
    denomination = (priceOverride && priceOverride.denomination) ? priceOverride.denomination : params[3]
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

  return price
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

/* TODO: move this into unit tests */
function testCategoryStat(category, data, iterations) {
  let testMap = {}
  for (let i = 0; i < iterations; i++) {
    let testWord = picker(category, data)
    if (Object.hasOwn(testMap, testWord)) {
      testMap[testWord]++
    } else {
      testMap[testWord] = 1
    }
  }
  console.log(testMap)
}

module.exports = stitch