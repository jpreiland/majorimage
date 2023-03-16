const specialGerunds = require('./special-gerunds'),
      symbols = require('symbols')

function ends_with_two_vowels(verb, last) {
  return symbols.is_vowel(verb[last])
      && symbols.is_vowel(verb[last - 1])
}

function ends_with_e(verb, last) {
  return verb[last].toLowerCase() === 'e'
}

function ingify(verb) {
  const last = verb.length - 1
  switch (true) {
    case ends_with_two_vowels(verb, last):
      return verb + 'ing'

    case ends_with_e(verb, last):
      return verb.slice(0, -1) + 'ing'

    default:
      return verb + 'ing'
  }
}

function gerund(verb) {
  if (!verb || verb.length < 1) return verb
  const special = specialGerunds[verb]

  return special ? special : ingify(verb)
}

module.exports = gerund
