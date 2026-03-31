import { inject } from 'vue'
import { appContextKey } from  '../types/app-context'

export function useAppContext() {
  const ctx = inject(appContextKey)

  if (!ctx) {
    throw new Error('AppContext not provided')
  }

  return ctx
}