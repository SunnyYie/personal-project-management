"use client";

import { ComponentProps, useEffect, useState } from "react";
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
import { SidebarSkeleton } from "./sidebar-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { NavProjects } from "./nav-projects";
import TeamSwitcher from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

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

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const teams = useStore((state) => state.teams);
  const projects = useStore((state) => state.projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (teams.length && projects.length) {
      setLoading(false);
    }
  }, [teams, projects]);

  if (loading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <Skeleton className="h-10 w-[240px]" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarSkeleton />
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-10 w-[240px]" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
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
