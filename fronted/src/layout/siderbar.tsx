import { menuFilter, useFlattenedRoutes, useRouteToMenuFn } from '@/router/routes/util';
import { useLocation, useMatches, useNavigate } from 'react-router';
import { useState, useEffect, useMemo } from 'react';
import { routes } from '@/router/routes';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function AppSidebar() {
  const navigate = useNavigate();

  // 初始化选中菜单
  const { pathname } = useLocation();
  const matches = useMatches();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 返回路由转为菜单格式的函数
  const routeToMenuFn = useRouteToMenuFn();
  // 获取所有路由
  const permissionRoutes = routes;
  // 从路由中过滤出菜单
  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(permissionRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn]);

  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 初始化展示的菜单
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };
  // 菜单点击事件
  const onClick = ({ key }: { key: string }) => {
    // 从扁平化的路由信息里面匹配当前点击的那个
    const nextLink = flattenedRoutes?.find((el) => el.key === key);

    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }
    navigate(key);
  };

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  return (
    <Sidebar defaultValue={openKeys}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuList.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a onClick={() => onClick(item.key)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
