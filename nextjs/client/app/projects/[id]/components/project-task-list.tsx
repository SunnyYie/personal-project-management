"use client";

import { TaskWithRelations } from "@/actions/types";
import { format } from "date-fns";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PriorityTag from "@/components/tasks-kanban/priority-tag";
import { taskStatuses } from "@/types/task.types";

interface TaskListProps {
  tasks?: TaskWithRelations[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks) {
    return <div>No tasks found</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>任务名</TableHead>
            <TableHead>任务描述</TableHead>
            <TableHead>任务状态</TableHead>
            <TableHead>任务优先级</TableHead>
            <TableHead>任务标签</TableHead>
            <TableHead>开始时间</TableHead>
            <TableHead>持续时间</TableHead>
            <TableHead>任务创建人</TableHead>
            <TableHead>任务分配人</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="mr-1"
                  style={{
                    backgroundColor: taskStatuses.find(
                      (item) => item.key == task.status,
                    )?.color,
                  }}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <PriorityTag priority={task.priority!} />
              </TableCell>
              <TableCell>
                {task.tags?.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary" className="mr-1">
                    {tag.trim()}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                {task.startDate
                  ? new Date(task.startDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>{task?.author?.name}</TableCell>
              <TableCell>{task.assignee?.name ?? "Unassigned"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
