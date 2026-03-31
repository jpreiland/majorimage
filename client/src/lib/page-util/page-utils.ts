import { Component, InjectionKey, markRaw } from 'vue'
import type { ModuleMap, Subpage } from '../../types/pages'
import { AppData, TemplateMeta } from '../../../../shared/types'

export function buildSubpages(modules: ModuleMap, page: string, data: AppData) {
  if (!modules || typeof modules !== 'object') {
    console.warn('[buildSubpages] modules is invalid:', modules)
    return []
  }

  const templatesObj: Record<string, TemplateMeta> = data?.templates?.[page] ?? {}

  return Object.entries(modules)
    .map(([path, module]): Subpage | null => {
      // Expected: ./components/<page>/templates/<subpage>/<file>.vue
      const match = path.match(/^\.\/components\/[^/]+\/templates\/([^/]+)\/([^/]+)\.vue$/)
      if (!match) {
        console.warn('[buildSubpages] Unexpected path:', path)
        return null
      }

      const [, subpage, file] = match

      if (!module?.default) {
        console.warn('[buildSubpages] Missing default export:', path)
        return null
      }

      const component = markRaw(module.default) as Component

      const meta = templatesObj?.[file] ?? {}

      return {
        key: path,
        name: meta._displayName ?? file,
        slug: file.toLowerCase(),
        subpage,
        component,
        selected: false,
        order: meta._order ?? Infinity
      }
    })
    .filter((p): p is Subpage => p !== null)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.name.localeCompare(b.name)
    })
}

export const subpagesKey: InjectionKey<Record<string, Subpage[]>> = Symbol('subpages')