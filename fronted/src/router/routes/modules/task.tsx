import { CircleLoading } from "@/components/Loading";
import SvgIcon from "@/components/svg-icon";

import { AppRouteObject } from "@/router/types";
import { taskObj } from "@/locales/task";

import { Navigate, Outlet } from "react-router";
import { Suspense, lazy } from "react";

const TaskDetail = lazy(() => import("@/pages/tasks/detail"));
const TaskList = lazy(() => import("@/pages/tasks/index"));
const ProjectTaskList = lazy(
  () => import("@/pages/tasks/projectTaskList/index")
);
const ProjectTaskDetail = lazy(
  () => import("@/pages/tasks/projectTaskList/detail")
);

const task: AppRouteObject = {
  order: 3,
  path: "task",
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: taskObj.name,
    icon: <SvgIcon icon="ic-analysis" size="24" />,
    key: "/task",
  },
  children: [
    {
      index: true,
      element: <Navigate to="/task/index" replace />,
    },
    {
      path: "taskList",
      element: <TaskList />,
      meta: { label: taskObj.taskList.name, key: "/task/index" },
    },
    {
      path: "detail",
      element: <TaskDetail />,
      meta: { label: taskObj.detail.name, key: "/task/detail/:id" },
    },
    {
      path: "projectTaskList",
      element: <ProjectTaskList />,
      meta: {
        label: taskObj.projectTaskList.name,
        key: "/task/projectTaskList/index",
      },
    },
    {
      path: "projectTaskDetail",
      element: <ProjectTaskDetail />,
      meta: {
        label: taskObj.projectTaskList.detail.name,
        key: "/task/projectTaskList/detail/:id",
      },
    },
  ],
};

export default task;
