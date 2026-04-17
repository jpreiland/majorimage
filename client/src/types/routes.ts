import { RouteRecordNormalized } from "vue-router"

export type RouteName =
  | 'objects'
  | 'locations'
  | 'magic'
  | 'shops'
  | 'npcs'
  | 'quests'
  | 'materials'
  | 'about'
  | 'acknowledgements'
  | 'workshop'

export type NavRoute = RouteRecordNormalized & {
  name: RouteName
  meta: {
    navDisplayName: string
    color?: string
    topNav?: boolean
    bottomNav?: boolean
  }
}

export function isTopNavRoute(
  route: RouteRecordNormalized
): route is NavRoute {
  return !!(
    route.name &&
    route.meta?.topNav &&
    route.meta?.navDisplayName
  )
}

export function isBottomNavRoute(
  route: RouteRecordNormalized
): route is NavRoute {
  return !!(
    route.name &&
    route.meta?.bottomNav &&
    route.meta?.navDisplayName
  )
}