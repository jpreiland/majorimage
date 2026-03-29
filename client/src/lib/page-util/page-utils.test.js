import { describe, it, expect } from 'vitest'
import { buildSubpages } from './page-utils'

const CompA = { name: 'CompA' }
const CompB = { name: 'CompB' }

describe('buildSubpages', () => {
  it('builds subpages from eager glob modules', () => {
    const modules = {
      './components/baz/templates/foo/PageA.vue': { default: CompA },
      './components/baz/templates/bar/PageB.vue': { default: CompB }
    }

    const data = {
      templates: {
        magic: {}
      }
    }

    const result = buildSubpages(modules, 'magic', data)

    expect(result).toHaveLength(2)

    expect(result[0]).toMatchObject({
      name: 'PageA',
      subpage: 'foo',
      component: CompA
    })
  })

  it('uses display name from metadata', () => {
    const modules = {
      './components/baz/templates/foo/PageA.vue': { default: CompA }
    }

    const data = {
      templates: {
        magic: {
          PageA: { _displayName: 'Page A' }
        }
      }
    }

    const result = buildSubpages(modules, 'magic', data)

    expect(result[0].name).toBe('Page A')
  })

  it('sorts by metadata order', () => {
    const modules = {
      './components/baz/templates/foo/PageA.vue': { default: CompA },
      './components/baz/templates/bar/PageB.vue': { default: CompB }
    }

    const data = {
      templates: {
        magic: {
          PageA: { _order: 2 },
          PageB: { _order: 1 }
        }
      }
    }

    const result = buildSubpages(modules, 'magic', data)

    expect(result.map(p => p.name)).toEqual(['PageB', 'PageA'])
  })

  it('falls back to alphabetical when order equal', () => {
    const modules = {
      './components/baz/templates/foo/Beta.vue': { default: CompB },
      './components/baz/templates/bar/Alpha.vue': { default: CompA }
    }

    const data = {
      templates: { magic: {} }
    }

    const result = buildSubpages(modules, 'magic', data)

    expect(result.map(p => p.name)).toEqual(['Alpha', 'Beta'])
  })

  it('handles missing metadata safely', () => {
    const modules = {
      './components/baz/templates/foo/PageA.vue': { default: CompA }
    }

    const result = buildSubpages(modules, 'magic', undefined)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('PageA')
  })

  it('handles missing or bad modules safely', () => {
    const modules = undefined

    const result = buildSubpages(modules, 'magic', undefined)

    expect(result).toHaveLength(0)
  })

  it('ignores modules without default export', () => {
    const modules = {
      './components/baz/templates/foo/PageA.vue': {},
      './components/baz/templates/bar/PageB.vue': { default: CompB }
    }

    const data = { templates: { magic: {} } }

    const result = buildSubpages(modules, 'magic', data)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('PageB')
  })

  it('ignores invalid paths', () => {
    const modules = {
      './bad/path.vue': { default: CompA },
      './components/baz/templates/foo/PageB.vue': { default: CompB }
    }

    const data = { templates: { magic: {} } }

    const result = buildSubpages(modules, 'magic', data)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('PageB')
  })
})