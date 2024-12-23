import projectRoutes from './modules/project'
import MainLayout from '@/layout/container'
import { AppRouteObject } from './types'
import taskRoutes from './modules/task'
import teamRoutes from './modules/team'
import { NavLink } from 'react-router'
import { lazy } from 'react'

const Login = lazy(() => import('@/pages/system/login'))

export const routes: AppRouteObject[] = [
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <NavLink to="/projects" replace />,
      },
      ...projectRoutes,
      ...taskRoutes,
      ...teamRoutes,
    ],
  },
  {
    path: '*',
    element: <NavLink to="/404" replace />,
  },
]

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
