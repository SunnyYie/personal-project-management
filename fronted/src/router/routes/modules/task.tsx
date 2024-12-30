import { CircleLoading } from "@/components/Loading";
import { ClipboardCheck } from "lucide-react";

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
    icon: <ClipboardCheck />,
    key: "/task",
  },
  children: [
    {
      index: true,
      element: <Navigate to="/task/taskList" replace />,
    },
    {
      path: "taskList",
      element: <TaskList />,
      meta: { label: taskObj.taskList.name, key: "/task/taskList" },
    },
    {
      path: "detail",
      element: <TaskDetail />,
      meta: { label: taskObj.detail.name, key: "/task/detail" },
    },
    {
      path: "projectTaskList",
      element: <ProjectTaskList />,
      meta: {
        label: taskObj.projectTaskList.name,
        key: "/task/projectTaskList",
      },
    },
    {
      path: "projectTaskDetail",
      element: <ProjectTaskDetail />,
      meta: {
        label: taskObj.projectTaskList.detail.name,
        key: "/task/projectTaskDetail",
      },
    },
  ],
};

export default task;
