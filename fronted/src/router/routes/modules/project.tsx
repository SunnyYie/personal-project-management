import { CircleLoading } from "@/components/Loading";
import { FolderKanban } from "lucide-react";

import { projectObj } from "@/locales/project";
import { AppRouteObject } from "@/router/types";

import { Navigate, Outlet } from "react-router";
import { Suspense, lazy } from "react";

const ProjectDetail = lazy(() => import("@/pages/project/detail"));
const ProjectList = lazy(() => import("@/pages/project/index"));
const FileList = lazy(() => import("@/pages/project/file-list"));

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
      path: "detail/:id",
      element: <ProjectDetail />,
      meta: {
        label: projectObj.detail.name,
        key: `/project/detail/:id`,
        hideMenu: true,
      },
    },
    {
      path: "file",
      element: <FileList />,
      meta: {
        label: projectObj.file.name,
        key: "/project/file",
      },
    },
  ],
};

export default project;
