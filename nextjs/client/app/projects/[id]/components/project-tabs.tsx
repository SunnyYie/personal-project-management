"use client";

import { CommonTabs } from "@/components/common-tabs";
import { TaskList } from "./project-task-list";
import { Grid3X3, Home } from "lucide-react";
import { ProjectInfo } from "./project-info";

import { TaskWithRelations } from "@/actions/types";
import { Project } from "@prisma/client";
import { useState } from "react";

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
      children: <TaskList tasks={tasks} />,
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
