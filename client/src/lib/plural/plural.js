const pluralize = require('pluralize')

const exceptions = {
  "avatar of death": "avatars of death",
  "cyclops": "cyclopes",
  "koi": "koi",
  "man-at-arms": "men-at-arms",
  "pegasus": "pegasi",
  "squid": "squid"
}

function plural(word) {
  return Object.hasOwn(exceptions, word) ? exceptions[word] : pluralize(word)
}

module.exports = plural