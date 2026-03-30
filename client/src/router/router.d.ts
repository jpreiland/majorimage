import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    color?: string
    navDisplayName: string
    topNav?: boolean
    bottomNav?: boolean
  }
}