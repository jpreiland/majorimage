/* eslint-disable no-case-declarations */
import AvsAnSimple from '../a-vs-an/avs-an-simple'
import gerund from '../gerunds/gerunds'
import plural from '../plural/plural'
import tensify from '../tensify/inflector'
import title from '../titleize/titleize'
import verber from '../verber/verber'
import { pickFormat } from '../descriptor-utils/formats'

/* this function is a travesty, maybe it'll get cleaned up some day */
function stitcher(parts, data, priceOverride, numRangeOverride) {
  let name = ""
  let word
  let numWords = 0
  let a_an_flag = false
  let isTitle = false

  if (parts === null || parts === undefined) return "" 

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

      case 'pick-gerund':
        if (part.length !== 2) break;
        name += gerund(picker(part[1], data))
        break;

      case 'pick-multi':
        // 3rd, 4th params (required): [lower and upper bounds] integer range (inclusive) of amount of words attempted to be picked, equal chance of any result within range, skips duplicates
        // 5th param (optional, 0.01-0.99): [bonus chance] percent chance of each additional word beyond the initial amount picked from the lower/upper bounded range being added, skips duplicates
        // 6th param (optional, 0.01-0.99): [bonus decay] amount to reduce percent chance (5th param) on each subsequent roll
        // eg: "1, 3, 0.25" - between 1 and 3 words will be picked at least (equal chance of 1, 2, or 3), and then a repeating 25% chance of additional words being appended
        if (part.length < 4 || part.length > 6) break;
        const minWords = part[2]
        const maxWords = part[3]
        let bonusPct = part[4]
        const bonusDecay = part[5]
        if (isNaN(minWords) || isNaN(maxWords)) break;

        numWords = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
        if (numWords <= 0 && part.length === 4) {
          if (name[name.length-1] === ' ') {
            name = name.slice(0, name.length-1)
          }
          break;
        }

        while (numWords > 0) {
          word = picker(part[1], data)
          if (!name.includes(word)) {
            name += ' ' + do_a_an(word, a_an_flag)
            a_an_flag = false
          }
          numWords--
        }

        if (part.length > 4 && bonusPct >= 0.01 && bonusPct <= 0.99) {
          let rng = Math.random()
          while (rng <= bonusPct) {
            word = picker(part[1], data)
            if (!name.includes(word)) {
              name += ' ' + do_a_an(word, a_an_flag)
              a_an_flag = false
            }
            if (part.length === 6 && bonusDecay >= 0.01 && bonusDecay <= 0.99) {
              bonusPct -= bonusDecay
            }
            rng = Math.random()
          }
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

      case 'number': 
        if (part.length < 3) break;
        let numParts = [...part]
        if (numRangeOverride) {
          if (!isNaN(numRangeOverride.min)) numParts[1] = numRangeOverride.min
          if (!isNaN(numRangeOverride.max)) numParts[2] = numRangeOverride.max
          if (numRangeOverride.zeroString) numParts[3] = numRangeOverride.zeroString
        }
        const rng = Math.floor(Math.random() * (numParts[2] - numParts[1] + 1)) + numParts[1]
        name += (rng === 0 && numParts[3]) ? numParts[3] : rng
        break;

      case 'price':
        if (!(part.length === 3 || part.length === 4)) break;
        let priceParts = [...part]
        if (priceOverride) {
          if (!isNaN(priceOverride.min)) priceParts[1] = priceOverride.min
          if (!isNaN(priceOverride.max)) priceParts[2] = priceOverride.max
          if (priceOverride.denomination) priceParts[3] = priceOverride.denomination
        }
        const price = rollPrice(priceParts)
        name += formatPrice(price)
        break;

      case 'format':
        if (part.length !== 2) break;
        let formatParts

        // if descriptor type, roll for format
        if (Object.hasOwn(data.dfMap, part[1])) {
          const res = data.dfMap[part[1]]
          formatParts = data.formats[pickFormat(res.formatMap, res.totalWeight)]
        } else {
          formatParts = data.formats[part[1]]
        }

        if (formatParts) {
          name += stitch(formatParts, data, priceOverride, numRangeOverride)
        }
        break;

      default:
        break;
    }
  }

  return (isTitle ? title(name.trim()) : name.trim())
}

function do_a_an(word, a_an_flag) {
  return a_an_flag ? (AvsAnSimple.query(word) + " " + word) : word
}

function picker(category, data) {
  if (Object.hasOwn(data.groups, category)) {
    category = categoryPicker(category, data)
  }
  return wordPicker(category, data)
}

function wordPicker(category, data) {
  if (!data.categories[category]) {
    console.log(`category ${category} does not exist`)
    return ""
  }
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

function rollPrice(params) {
  const min = Math.ceil(Math.min(params[1], params[2]))
  const max = Math.floor(Math.max(params[1], params[2]))
  let denomination

  if (params.length === 4) {
    denomination = params[3]
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
  let gold = price

  return (gold > 0 ? gold.toLocaleString() + "g" : "") + (silver > 0 ? silver + "s" : "") + (copper > 0 ? copper + "c" : "")
}

export const pick = picker
export const stitch = stitcher