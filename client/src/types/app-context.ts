import type { InjectionKey } from "vue"
import type { AppData } from '../../../shared/types'
import type { Subpage } from './pages'

export interface AppContext {
  data: AppData
  subpages: Record<string, Subpage[]>
  menuSelections: Record<string, Subpage | null>
  wordCount: number
}

export const appContextKey: InjectionKey<AppContext> = Symbol('appContext')