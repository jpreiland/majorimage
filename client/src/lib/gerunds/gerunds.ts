import specialGerundsJson from './special-gerunds.json'
import { is_vowel } from 'symbols'

function ends_with_two_vowels(verb: string, last: number): boolean {
  return is_vowel(verb[last])
      && is_vowel(verb[last - 1])
}

function ends_with_e(verb: string, last: number): boolean {
  return verb[last].toLowerCase() === 'e'
}

function ingify(verb: string): string {
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

function gerund(verb: string): string {
  if (typeof verb !== 'string' || verb.length < 1) return verb
  const specialGerunds: Record<string, string> = specialGerundsJson
  const special = specialGerunds[verb]

  return special ? special : ingify(verb)
}

export default gerund
