"use client";

import { CommonTabs } from "@/components/common-tabs";
import { TaskKanBan } from "./project-task-kanban";
import { Grid3X3, Home, List, Timer } from "lucide-react";
import { TaskList } from "./project-task-list";
import { ProjectInfo } from "./project-info";

import { TaskWithRelations } from "@/actions/types";
import { Project } from "@prisma/client";
import { useState } from "react";
import TaskTimeline from "@/components/task-timeline";

interface ProjectTabsProps {
  project: Project;
  tasks?: TaskWithRelations[];
}

export function ProjectTabs({ project, tasks }: ProjectTabsProps) {
  const [activeKey, setActiveKey] = useState("info");

  const items = [
    {
      key: "info",
      label: "基本信息",
      icon: Home,
      children: <ProjectInfo project={project} />,
    },
    {
      key: "tasks",
      label: "任务看板",
      icon: Grid3X3,
      children: <TaskKanBan tasks={tasks} />,
    },
    {
      key: "lists",
      label: "任务列表",
      icon: List,
      children: <TaskList tasks={tasks} />,
    },
    {
      key: "timeline",
      label: "任务时间线",
      icon: Timer,
      children: <TaskTimeline tasks={tasks} />,
    },
  ];

  return (
    <CommonTabs
      items={items}
      defaultActiveKey={activeKey}
      onChange={(key) => setActiveKey(key)}
    />
  );
}
