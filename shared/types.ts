export interface TemplateMeta {
  _displayName?: string
  _order?: number
}

export interface AppData {
  categories: any
  dfMap: any
  formats: any
  groups: any
  materials: any
  templates: Record<
    string,
    Record<string, TemplateMeta>
  >
  version: string
}