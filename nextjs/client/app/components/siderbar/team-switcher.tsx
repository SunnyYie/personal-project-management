"use client";

import {
  AudioWaveform,
  ChevronsUpDown,
  Command,
  GalleryVerticalEnd,
  LucideProps,
  Plus,
} from "lucide-react";
import { Team } from "@prisma/client";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import useStore from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface TeamSwitcherProps {
  teams: Team[];
}

export default function TeamSwitcher({ teams }: TeamSwitcherProps) {
  // 初始化团队数据
  const configedTeams = teams.map((team, index) => ({
    ...team,
    logo:
      index === 0 ? GalleryVerticalEnd : index === 1 ? AudioWaveform : Command,
    plan: index === 0 ? "Enterprise" : index === 1 ? "Startup" : "Free",
  }));
  const [activeTeam, setActiveTeamState] = useState(configedTeams[0]);

  const { isMobile } = useSidebar();
  const setActiveTeam = useStore((state) => state.setActiveTeam);
  const setProjects = useStore((state) => state.setProjects);

  const handleSwitchTeam = async (
    team: Team & {
      logo: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      plan: string;
    },
  ) => {
    try {
      setActiveTeamState(team);
      setActiveTeam(team);

      const projects = await fetch(`/api/projects?teamId=${team.id}`).then(
        (res) => res.json(),
      );
      setProjects(projects);
    } catch (e) {
      console.error("Failed to fetch team data", e);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              团队
            </DropdownMenuLabel>
            {configedTeams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => handleSwitchTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">添加团队</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
