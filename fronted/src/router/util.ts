import { AppRouteObject } from './types'

// 获取菜单项
export const getMenuRoutes = (routes: AppRouteObject[]): AppRouteObject[] => {
  const menuRoutes: AppRouteObject[] = []

  const filterMenuRoutes = (routes: AppRouteObject[]) => {
    routes.forEach(route => {
      if (route.meta?.menu) {
        menuRoutes.push(route)
      }
      if (route.children) {
        filterMenuRoutes(route.children)
      }
    })
  }

  filterMenuRoutes(routes)
  return menuRoutes
}
