import { getProjects } from "@/actions/project";
import { ComponentProps } from "react";
import dynamic from "next/dynamic";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";
import { NavProjects } from "./nav-projects";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  // projects: Project[];
}

const TeamSwitcher = dynamic(() => import("./team-switcher"));

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
      title: "项目",
      url: "/projects",
      icon: SquareTerminal,
    },
    {
      title: "任务",
      url: "/tasks",
      icon: Bot,
    },
  ],
};

export async function AppSidebar({ ...props }: AppSidebarProps) {
  const {
    data: { body: projects },
  } = await getProjects();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
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
