export interface TemplateMeta {
  _displayName?: string
  _order?: number
}

export interface AppData {
  categories: any
  dfMap: any
  formats: any
  groups: any
  materials: MaterialsData
  templates: Record<
    string,
    Record<string, TemplateMeta>
  >
  version: string
}

export interface MaterialsData {
  stones: Material[]
  woods: Material[]
  metals: Material[]
  textiles: Material[]
}

export interface MaterialAttributes {
  row1: {
    Weight: {
      value: number
      units: string
    }
  }
  row2: Record<string, { value: number | string; units?: string }>
  unused?: Record<string, { value: number; units: string }>
  units: string
}

export interface BaseMaterial {
  name: string
  attributes: MaterialAttributes
  description: string
  uses?: string
  occurrence?: string
  component?: string
}

export type MaterialFlags = {
  [key: string]: boolean | string | number | undefined
}

export type Material = BaseMaterial & MaterialFlags

export type MaterialCategoryKey = string | true

export type MaterialCategory = [label: string, key: MaterialCategoryKey]