"use client";

import { Task, TaskType } from "gantt-task-react/dist/types/public-types";
import { TaskWithRelations } from "@/actions/types";
import { Gantt, ViewMode } from "gantt-task-react";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TimelineProps {
  tasks?: TaskWithRelations[];
  onTaskSelect?: (task: Task) => void;
  onAddTask?: () => void;
}

export default function TaskTimeline({
  tasks,
  onTaskSelect,
  onAddTask,
}: TimelineProps) {
  const [view, setView] = useState<ViewMode>(ViewMode.Month);

  const handleTaskSelect = (task: Task) => {
    if (onTaskSelect) {
      onTaskSelect(task);
    }
  };

  const handleViewChange = (viewMode: ViewMode) => {
    setView(viewMode);
  };

  const columnWidth = view === ViewMode.Month ? 150 : 100;
  const ganttTasks = tasks?.map((task) => ({
    ...task,
    start: new Date(task.startDate!),
    end: new Date(task.endDate!),
    name: task.title,
    type: "task" as TaskType,
    progress: task.points ? (task.points / 10) * 100 : 0,
    isDisabled: task.status === "done",
  }));

  return (
    <div className="ml-1 w-[80vw]">
      <h1 className="mb-2 me-2 text-lg font-bold dark:text-white">
        Project Tasks TimeLine
      </h1>

      <div className="mb-4 flex items-center">
        <Select
          value={view}
          onValueChange={(value) => handleViewChange(value as ViewMode)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ViewMode.Day}>Day</SelectItem>
            <SelectItem value={ViewMode.Week}>Week</SelectItem>
            <SelectItem value={ViewMode.Month}>Month</SelectItem>
            <SelectItem value={ViewMode.Year}>Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-neutral-800 dark:text-white">
        <div>
          <Gantt
            tasks={ganttTasks!}
            viewMode={view}
            onSelect={handleTaskSelect}
            columnWidth={columnWidth}
            listCellWidth="100px"
            rowHeight={40}
          />
        </div>
        <div className="pb-5 pt-1">
          <Button className="ml-2 bg-blue-500" onClick={onAddTask}>
            创建任务
          </Button>
        </div>
      </div>
    </div>
  );
}
