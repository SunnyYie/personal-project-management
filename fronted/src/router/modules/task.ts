import { CheckSquare } from 'lucide-react'
import { AppRouteObject } from '../types'
import { lazy } from 'react'

const taskRoutes: AppRouteObject[] = [
  {
    path: 'tasks',
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/tasks/index')),
        meta: {
          title: '任务列表',
          icon: CheckSquare,
          menu: true,
        },
      },
      {
        path: ':id',
        Component: lazy(() => import('@/pages/tasks/detail')),
        meta: {
          title: '任务详情',
          menu: false,
        },
      },
    ],
  },
]

export default taskRoutes
