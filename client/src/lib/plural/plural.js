const pluralize = require('pluralize')

const exceptions = {
  "avatar of death": "avatars of death",
  "cyclops": "cyclopes",
  "fae": "fae",
  "fey": "fey",
  "koi": "koi",
  "man-at-arms": "men-at-arms",
  "mongoose": "mongeese",
  "pegasus": "pegasi",
  "rug of smothering": "rugs of smothering",
  "squid": "squid"
}

function plural(word) {
  return Object.hasOwn(exceptions, word) ? exceptions[word] : pluralize(word)
}

module.exports = plural