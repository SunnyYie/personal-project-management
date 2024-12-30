import { CircleLoading } from "@/components/Loading";
import { FolderKanban } from "lucide-react";

import { projectObj } from "@/locales/project";
import { AppRouteObject } from "@/router/types";

import { Navigate, Outlet } from "react-router";
import { Suspense, lazy } from "react";

const ProjectDetail = lazy(() => import("@/pages/project/detail"));
const ProjectList = lazy(() => import("@/pages/project/index"));

const project: AppRouteObject = {
  order: 2,
  path: "project",
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: projectObj.name,
    icon: <FolderKanban />,
    key: "/project",
  },
  children: [
    {
      index: true,
      element: <Navigate to="/project/projectList" replace />,
    },
    {
      path: "projectList",
      element: <ProjectList />,
      meta: { label: projectObj.projectList.name, key: "/project/projectList" },
    },
    {
      path: "detail",
      element: <ProjectDetail />,
      meta: { label: projectObj.detail.name, key: "/project/detail" },
    },
  ],
};

export default project;
