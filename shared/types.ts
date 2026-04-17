import CategoriesJson from '../server/data/words/categories.json'
import DescriptorFormatsMapJson from '../server/data/descriptor-formats/descriptor-formats-map.json'
import GroupsJson from '../server/data/words/groups.json'
import FormatsJson from '../server/data/descriptor-formats/formats.json'

export type NumericString = `${number}` | number

export interface AppData {
  categories: Record<CategoryName, string[]>
  dfMap: DFMap
  formats: Record<FormatName, Format>
  groups: GroupsCompiled
  materials: MaterialsData
  templates: Record<
    string,
    Record<string, TemplateMeta>
  >
  version: string
}

// Categories
export type CategoryName = keyof typeof CategoriesJson

// Formats
export type DFMapName = keyof typeof DescriptorFormatsMapJson
export type FormatName = keyof typeof FormatsJson
export type DFMapJsonEntry = [FormatName, number][]

export interface DFEntry {
  formatMap: Record<NumericString, FormatName>
  totalWeight: number
}

export type DFMap = Record<DFMapName, DFEntry>

export type FormatInstruction =
| ['pick', (CategoryName | GroupName)]
| ['pick-pluralize', (CategoryName | GroupName)]
| ['pick-pluralize-optional', (CategoryName | GroupName)]
| ['pick-pastTense', (CategoryName | GroupName)]
| ['pick-verber', (CategoryName | GroupName)]
| ['pick-gerund', (CategoryName | GroupName)]
| ['pick-multi', (CategoryName | GroupName), number, number]
| ['pick-multi', (CategoryName | GroupName), number, number, number]
| ['pick-multi', (CategoryName | GroupName), number, number, number, number]
| ['static', string]
| ['a(n)']
| ['title']
| NumberFormatInstruction
| PriceFormatInstruction
| FormatTypeFormatInstruction

export type NumberFormatInstruction = ['number', number, number, string?]
export type PriceFormatInstruction = ['price', number, number, string?]
export type FormatTypeFormatInstruction =  ['format', FormatName]

export type Format = FormatInstruction[]

// Groups
export type GroupName = keyof typeof GroupsJson
export type CompiledGroup = {
  categoryMap: Record<NumericString, CategoryName | GroupName>
  totalWords: number
}

export type GroupsCompiled = Record<string, CompiledGroup>

// Materials
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

// Templates
export interface TemplateMeta {
  _displayName?: string
  _order?: number
}

// Misc
export interface NumRangeOverride {
  min: number
  max: number
  zeroString: string
}

export interface PriceOverride {
  min: number 
  max: number
  denomination?: string
}