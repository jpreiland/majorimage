const exceptions = [
  "A",
  "About",
  "An",
  "And",
  "As",
  "At",
  "But",
  "By",
  "For",
  "From",
  "In",
  "Into",
  "Is",
  "Near",
  "Nor",
  "Of",
  "On",
  "Onto",
  "Or",
  "The",
  "To",
  "With"
]

function title(string) {
  if (typeof string !== 'string') return string

  string = string.replace(/([^\W_]+[^\s-]*) */g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    }
  )

  for (let exception of exceptions) {
    string = string.replace(new RegExp('\\s' + exception + '\\s', 'g'), 
      function(txt) {
        return txt.toLowerCase()
      }
    )
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default title