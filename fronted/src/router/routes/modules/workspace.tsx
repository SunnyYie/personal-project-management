import { CircleLoading } from "@/components/Loading";
import SvgIcon from "@/components/svg-icon";

import { workspaceObj } from "@/locales/workspace";
import { AppRouteObject } from "@/router/types";

import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

const Dashboard = lazy(() => import('@/pages/workspace/dashboard'))

export const workspace: AppRouteObject = {
    order: 1,
    path: 'workspace',
    element: (
        <Suspense fallback={<CircleLoading />}>
            <Outlet />
        </Suspense>
    ),
    meta: {
        key: 'workspace',
        icon: <SvgIcon icon="ic-analysis" size="24" />,
        label: workspaceObj.name
    },
    children: [
        {
            index: true,
            element: <Navigate to="/workspace/dashboard" replace />,
        },
        {
            path: 'dashboard',
            element: <Dashboard />,
            meta: {
                key: '/workspace/dashboard',
                label: workspaceObj.dashboard.name
            }
        }
    ]
}