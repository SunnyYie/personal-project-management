"use client";

import { ComponentProps, useEffect } from "react";
import useStore from "@/store";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Bot,
  Clock,
  Settings,
  SquareTerminal,
  User,
  Workflow,
} from "lucide-react";
import { NavProjects } from "./nav-projects";
import TeamSwitcher from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  // projects: Project[];
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "仪表盘",
      url: "/",
      icon: BookOpen,
    },
    {
      title: "团队",
      url: "/teams",
      icon: Workflow,
    },
    {
      title: "成员",
      url: "/members",
      icon: User,
    },
    {
      title: "项目",
      url: "/projects",
      icon: SquareTerminal,
    },
    {
      title: "任务",
      url: "/tasks",
      icon: Bot,
    },
    {
      title: "时间线",
      url: "/timeline",
      icon: Clock,
    },
    {
      title: "设置",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: AppSidebarProps) {
  const teams = useStore((state) => state.teams);
  const projects = useStore((state) => state.projects);

  useEffect(() => {
    console.log("userInfo", useStore.getState().userInfo);
  }, []);

  if (!teams.length) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
