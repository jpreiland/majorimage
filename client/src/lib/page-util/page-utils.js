import { markRaw } from 'vue'

export function buildSubpages(modules, page, data) {
  if (!modules || typeof modules !== 'object') {
    console.warn('[buildSubpages] modules is invalid:', modules)
    return []
  }

  const templatesObj = data?.templates?.[page] ?? {}

  return Object.entries(modules)
    .map(([path, module]) => {
      // Expected: ./templates/<category>/<file>.vue
      const match = path.match(/^\.\/templates\/([^/]+)\/([^/]+)\.vue$/)

      if (!match) {
        console.warn('[buildSubpages] Unexpected path:', path)
        return null
      }

      const [, category, file] = match

      const component = markRaw(module?.default)

      if (!component) {
        console.warn('[buildSubpages] Missing default export:', path)
        return null
      }

      const meta = templatesObj?.[file] ?? {}

      return {
        key: path,
        name: meta._displayName ?? file,
        category,
        component,
        selected: false,
        order: meta._order ?? Infinity
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.name.localeCompare(b.name)
    })
}