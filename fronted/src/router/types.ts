import { RouteObject, Params } from "react-router";
import { ReactNode } from "react";

export interface RouteMeta {
  /**
   * antd menu selectedKeys
   */
  key: string;
  /**
   * menu label, i18n
   */
  label: string;
  /**
   * menu prefix icon
   */
  icon?: ReactNode;
  /**
   * menu suffix icon
   */
  suffix?: ReactNode;
  /**
   * hide in menu
   */
  hideMenu?: boolean;
  /**
   * hide in multi tab
   */
  hideTab?: boolean;
  /**
   * disable in menu
   */
  disabled?: boolean;
  /**
   * react router outlet
   */
  outlet?: any;
  /**
   * use to refresh tab
   */
  timeStamp?: string;
  /**
   * external link and iframe need
   */
  frameSrc?: string;
  /**
   * dynamic route params
   *
   * @example /user/:id
   */
  params?: Params<string>;
  /**
   * active menu
   */
  isActive?: boolean;
}

export type AppRouteObject = {
  order?: number;
  meta?: RouteMeta;
  children?: AppRouteObject[];
} & Omit<RouteObject, "children">;
