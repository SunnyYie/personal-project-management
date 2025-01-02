import {
  Navigate,
  RouteObject,
  RouterProvider,
  createHashRouter,
} from "react-router";
import { AppRouteObject } from "../types";
import MainLayout from "@/layout/container";
import { getRoutesFromModules } from "./util";
import { lazy } from "react";
import { ErrorRoutes } from "./error-routes";

const LoginRoute: AppRouteObject = {
  path: "/login",
  Component: lazy(() => import("@/pages/system/login/login")),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: "*",
  element: <Navigate to="/404" replace />,
};
const menuModuleRoutes = getRoutesFromModules();

export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/workspace/dashboard" replace />,
      },
      ...menuModuleRoutes,
    ],
  },
  LoginRoute,
  PAGE_NOT_FOUND_ROUTE,
  ErrorRoutes,
];

export default function Router() {
  const router = createHashRouter(routes as unknown as RouteObject[]);
  return <RouterProvider router={router} />;
}
