import pluralize from 'pluralize'

const exceptions: Record<string, string> = {
  "avatar of death": "avatars of death",
  "cyclops": "cyclopes",
  "fae": "fae",
  "fey": "fey",
  "incubus": "incubi",
  "koi": "koi",
  "lens": "lenses",
  "man-at-arms": "men-at-arms",
  "marquis": "marquises",
  "mongoose": "mongeese",
  "pair of pants": "pairs of pants",
  "pair of shorts": "pairs of shorts",
  "pair of trousers": "pairs of trousers",
  "pegasus": "pegasi",
  "quartz": "quartz",
  "regalia": "regalia",
  "remorhaz": "remorhazes",
  "rug of smothering": "rugs of smothering",
  "sarcophagus": "sarcophagi",
  "squid": "squid",
  "succubus": "succubi"
}

function plural(word: string): string {
  if (typeof word !== 'string') return word
  // @ts-expect-error
  return Object.hasOwn(exceptions, word) ? exceptions[word] : pluralize(word)
}

export default plural