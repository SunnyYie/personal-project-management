import { AppRouteObject } from '../types'
import { Users } from 'lucide-react'
import { lazy } from 'react'

const teamRoutes: AppRouteObject[] = [
  {
    path: 'team',
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/team/index')),
        meta: {
          title: '团队成员',
          icon: Users,
          menu: true,
        },
      },
      {
        path: ':id',
        Component: lazy(() => import('@/pages/team/detail')),
        meta: {
          title: '成员详情',
          menu: false,
        },
      },
    ],
  },
]

export default teamRoutes
