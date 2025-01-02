import { CircleLoading } from "@/components/Loading";
import { BriefcaseBusiness } from "lucide-react";

import { manageObj } from "@/locales/manage";
import { AppRouteObject } from "@/router/types";

import { Navigate, Outlet } from "react-router";
import { Suspense, lazy } from "react";

const ManageRole = lazy(() => import("@/pages/manage/role"));
const ManagePermission = lazy(() => import("@/pages/manage/permission"));
const ManageProfile = lazy(() => import("@/pages/manage/profile"));

const manage: AppRouteObject = {
  order: 5,
  path: "manage",
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: manageObj.name,
    icon: <BriefcaseBusiness color="#000000" />,
    key: "/manage",
  },
  children: [
    {
      index: true,
      element: <Navigate to="/manage/permission" replace />,
    },
    {
      path: "permission",
      element: <ManagePermission />,
      meta: { label: manageObj.permission.name, key: "/manage/permission" },
    },
    {
      path: "role",
      element: <ManageRole />,
      meta: { label: manageObj.role.name, key: "/manage/role" },
    },
    {
      path: "profile",
      element: <ManageProfile />,
      meta: { label: manageObj.profile.name, key: "/manage/profile" },
    },
  ],
};

export default manage;
