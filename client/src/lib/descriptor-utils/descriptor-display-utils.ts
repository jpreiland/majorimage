export function getCssGradient(colors: string[], angle = 90) {
  // console.log('func')
  // console.log(colors)
  if (!colors || colors.length === 0) return ''
  if (colors.length === 1) return colors[0]

  const step = 100 / (colors.length - 1)
  // console.log(`step: ${step}`)
  
  const steps = colors.map((color, index) => {
    const percentage = (index * step).toFixed(2)
    return `${color} ${percentage}%`
  }).join(', ')

  // console.log(`linear-gradient(${angle}deg, ${steps})`)

  return `linear-gradient(${angle}deg, ${steps})`
}
