// created by Egor Gumenyuk (boo1ean)
// modified by Kujiy & JP Reiland
const find_irregular_verb = require('./verbs'),
      symbols = require('symbols')

const stress_dict = ['credit', 'deposit', 'exhibit', 'exit', 'inhabit', 'inherit', 'inhibit', 'limit', 'market', 'profit', 'target', 'ticket', 'trigger', 'visit']

function stress_at_the_end_of_the_word(word) {
  return stress_dict.indexOf(word) === -1
}

function ends_with_a_single_vowel_plus_a_consonant_and_not_wx(verb, last) {
  return symbols.is_consonant(verb[last])
      && symbols.is_vowel(verb[last - 1])
      && !symbols.is_vowel(verb[last - 2])
      && verb[last] !== 'w'
      && verb[last] !== 'x'
}

function ends_with_c(verb, last) {
  return verb[last].toLowerCase() === 'c'
}

function ends_with_consonant_plus_y(verb, last) {
  return verb[last].toLowerCase() === 'y'
      && symbols.is_consonant(verb[last - 1])
}

function ends_with_e(verb, last) {
  return verb[last].toLowerCase() === 'e'
}

function ends_with_two_vowels_plus_a_consonant(verb, last) {
  return symbols.is_consonant(verb[last])
      && symbols.is_vowel(verb[last - 1])
      && symbols.is_vowel(verb[last - 2])
}

function edify(verb) {
  const last = verb.length - 1
  switch (true) {
    case ends_with_c(verb, last):
      return verb + 'ked'

    case ends_with_consonant_plus_y(verb, last):
      return verb.slice(0, -1) + 'ied'

    case ends_with_e(verb, last):
      return verb + 'd'

    case ends_with_two_vowels_plus_a_consonant(verb, last):
      return verb + 'ed'

    case ends_with_a_single_vowel_plus_a_consonant_and_not_wx(verb, last) && stress_at_the_end_of_the_word(verb):
      return verb + verb[last] + 'ed'

    default:
      return verb + 'ed'
  }
}

function tensify(verb) {
  if (!verb || verb.length < 1) return verb
  const irregular = find_irregular_verb(verb)

  return irregular ? irregular[0] : edify(verb)
}

module.exports = tensify
