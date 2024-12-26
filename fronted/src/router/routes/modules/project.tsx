import { CircleLoading } from '@/components/Loading'
import SvgIcon from '@/components/svg-icon'

import { projectObj } from '@/locales/project'
import { AppRouteObject } from '@/router/types'

import { Navigate, Outlet } from 'react-router'
import { Suspense, lazy } from 'react'

const ProjectDetail = lazy(() => import('@/pages/project/detail'))
const ProjectList = lazy(() => import('@/pages/project/index'))

export const project: AppRouteObject = {
  order: 2,
  path: 'project',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: projectObj.name,
    icon: <SvgIcon icon='ic-analysis' size="24" />,
    key: '/project',
  },
  children: [
    {
      index: true,
      element: <Navigate to='/project/index' replace />,
    },
    {
      path: 'projectList',
      element: <ProjectList />,
      meta: { label: projectObj.projectList.name, key: '/project/index' },
    },
    {
      path: 'detail',
      element: <ProjectDetail />,
      meta: { label: projectObj.detail.name, key: '/project/detail/:id' },
    },
  ],
}
