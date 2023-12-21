import pluralize from 'pluralize'

const exceptions = {
  "avatar of death": "avatars of death",
  "cyclops": "cyclopes",
  "fae": "fae",
  "fey": "fey",
  "koi": "koi",
  "lens": "lenses",
  "man-at-arms": "men-at-arms",
  "marquis": "marquises",
  "mongoose": "mongeese",
  "pegasus": "pegasi",
  "remorhaz": "remorhazes",
  "rug of smothering": "rugs of smothering",
  "squid": "squid"
}

function plural(word) {
  if (typeof word !== 'string') return word
  return Object.hasOwn(exceptions, word) ? exceptions[word] : pluralize(word)
}

export default plural