import { CircleLoading } from "@/components/Loading";
import { PanelsTopLeft } from "lucide-react";

import { workspaceObj } from "@/locales/workspace";
import { AppRouteObject } from "@/router/types";

import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

const Dashboard = lazy(() => import("@/pages/workspace/dashboard"));
const TodoList = lazy(() => import("@/pages/workspace/todoList"));
const Kanban = lazy(() => import("@/pages/workspace/kanban"));

const workspace: AppRouteObject = {
  order: 1,
  path: "workspace",
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    key: "/workspace",
    icon: <PanelsTopLeft />,
    label: workspaceObj.name,
    isActive: true,
  },
  children: [
    {
      index: true,
      element: <Navigate to="/workspace/dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      meta: {
        key: "/workspace/dashboard",
        label: workspaceObj.dashboard.name,
      },
    },
    {
      path: "todoList",
      element: <TodoList />,
      meta: {
        key: "/workspace/todoList",
        label: workspaceObj.todoList.name,
      },
    },
    {
      path: "kanban",
      element: <Kanban />,
      meta: {
        key: "/workspace/kanban",
        label: workspaceObj.kanban.name,
      },
    },
  ],
};

export default workspace;
