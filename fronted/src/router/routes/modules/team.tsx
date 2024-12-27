import { CircleLoading } from "@/components/Loading";
import SvgIcon from "@/components/svg-icon";

import { AppRouteObject } from "@/router/types";

import { Navigate, Outlet } from "react-router";
import { Suspense, lazy } from "react";
import { teamObj } from "@/locales/team";

const TeamManage = lazy(() => import("@/pages/team/team-manage"));
const ProjectManage = lazy(() => import("@/pages/team/project-manage"));
const UserManage = lazy(() => import("@/pages/team/user-manage"));

const team: AppRouteObject = {
  order: 4,
  path: "team",
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: teamObj.name,
    icon: <SvgIcon icon="ic-analysis" size="24" />,
    key: "/team",
  },
  children: [
    {
      index: true,
      element: <Navigate to="/team/team-manage" replace />,
    },
    {
      path: "team-manage",
      element: <TeamManage />,
      meta: { label: teamObj.teamManage.name, key: "/team/team-manage" },
    },
    {
      path: "project-manage",
      element: <ProjectManage />,
      meta: { label: teamObj.projectManage.name, key: "/team/project-manage" },
    },
    {
      path: "user-manage",
      element: <UserManage />,
      meta: { label: teamObj.userManage.name, key: "/team/user-manage" },
    },
  ],
};

export default team;
