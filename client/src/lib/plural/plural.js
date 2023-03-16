const pluralize = require('pluralize')

const exceptions = {
  "cyclops": "cyclopes",
  "squid": "squid"
}

function plural(word) {
  return Object.hasOwn(exceptions, word) ? exceptions[word] : pluralize(word)
}

module.exports = plural