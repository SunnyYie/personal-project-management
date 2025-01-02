import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

import {
  getRoutesFromModules,
  menuFilter,
  useRouteToMenuFn,
} from "@/router/routes/util";

import { Link, useLocation } from "react-router";
import { useMemo } from "react";

export default function AppSidebar() {
  const { pathname } = useLocation();
  // 返回路由转为菜单格式的函数
  const routeToMenuFn = useRouteToMenuFn();
  // 获取所有路由
  const menuModuleRoutes = getRoutesFromModules();
  // 从路由中过滤出菜单
  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(menuModuleRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            <span>PPM-SYSTEM</span>
            <span>个人项目管理系统</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuList.map((item) => (
                <Collapsible
                  key={item.key}
                  asChild
                  open={pathname.includes(item.key)}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={item.key}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                    {item.children?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children?.map(
                              (subItem: { key: string; label: string }) => (
                                <SidebarMenuSubItem key={subItem.key}>
                                  <SidebarMenuSubButton asChild>
                                    <Link to={subItem.key}>
                                      {subItem.label}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
