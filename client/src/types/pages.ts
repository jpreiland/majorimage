import { Component, DefineComponent } from 'vue'

export type VueModule = {
  default: DefineComponent<any, any, any>
}

export type ModuleMap = Record<string, VueModule>

export interface Subpage {
  key: string
  name: string
  slug: string
  subpage: string
  component: Component
  selected: boolean
  order: number
}
