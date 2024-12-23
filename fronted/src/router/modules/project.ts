import { FolderKanban } from 'lucide-react'
import { AppRouteObject } from '../types'
import { lazy } from 'react'

const ProjectDetail = lazy(() => import('@/pages/projects/detail'))
const ProjectList = lazy(() => import('@/pages/projects/index'))

const projectRoutes: AppRouteObject[] = [
  {
    path: 'projects',
    children: [
      {
        index: true,
        Component: ProjectList,
        meta: {
          title: '项目列表',
          icon: FolderKanban,
          menu: true,
        },
      },
      {
        path: '/detail/:id',
        Component: ProjectDetail,
        meta: {
          title: '项目详情',
          menu: false,
        },
      },
    ],
  },
]

export default projectRoutes
