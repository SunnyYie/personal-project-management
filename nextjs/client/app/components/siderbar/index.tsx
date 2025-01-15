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
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import TeamSwitcher from "./team-switcher";

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
  const setTeams = useStore((state) => state.setTeams);
  const setProjects = useStore((state) => state.setProjects);

  const userInfo = useStore((state) => state.userInfo);
  const teams = useStore((state) => state.teams);
  const projects = useStore((state) => state.projects);

  useEffect(() => {
    console.log("userInfo", userInfo);

    async function fetchData() {
      const teams = await fetch(`/api/teams?userId=mcgdg001`).then((res) =>
        res.json(),
      );

      if (!teams.length) {
        return;
      }

      setTeams(teams);

      const projects = await fetch(`/api/projects?teamId=${teams[0].id}`).then(
        (res) => res.json(),
      );

      setProjects(projects);
    }

    fetchData();
  }, [setTeams, setProjects]);

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
