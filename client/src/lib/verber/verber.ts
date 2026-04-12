import exceptionsJson from './exceptions.json'
import { is_vowel, is_consonant } from 'symbols'

function ends_vowel_consonant_not_ywnr_not_doublevowel(verb: string, last: number): boolean {
  return is_vowel(verb[last - 1])
      && is_consonant(verb[last])
      && !'ywnr'.includes(verb[last])
      && (verb.length > 2 && is_consonant(verb[last-2]))
}

function ends_with_e(verb: string, last: number): boolean {
  return verb[last].toLowerCase() === 'e'
}

function ends_consonant_y(verb: string, last: number): boolean {
  return is_consonant(verb[last - 1])
      && verb[last].toLowerCase() === 'y'
}

function erer(verb: string): string {
  const last = verb.length - 1
  switch (true) {
    case ends_consonant_y(verb, last):
      return verb.slice(0, -1) + 'ier'

    case ends_vowel_consonant_not_ywnr_not_doublevowel(verb, last):
      return verb + verb[last] + 'er'

    case ends_with_e(verb, last):
      return verb + 'r'

    default:
      return verb + 'er'
  }
}

function verber(verb: string): string {
  if (typeof verb !== 'string' || verb.length < 2) return verb
  const exceptions: Record<string, string> = exceptionsJson
  const special: string | undefined = exceptions[verb]

  return special ? special : erer(verb)
}

export default verber
