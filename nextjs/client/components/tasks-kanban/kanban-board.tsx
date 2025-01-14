"use client";

import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskWithRelations } from "@/actions/types";
import { taskStatuses } from "@/types/task.types";
import { DndProvider } from "react-dnd";
import { Task } from "@prisma/client";
import { debounce } from "lodash";
import { useState } from "react";

import { TaskColumn } from "./task-column";

interface KanbanBoardProps {
  initialTasks: TaskWithRelations[];
}

export default function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<TaskWithRelations[]>(initialTasks);

  const moveTask = async (taskId: string, newStatus: Task["status"]) => {
    try {
      // 调用更新状态的接口（会频繁的调用接口）
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
          operation: "updateStatus",
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      // 更新任务状态
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // 使用防抖函数包装 moveTask
  const debouncedMoveTask = debounce(moveTask, 300);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4 bg-slate-100 p-4 dark:bg-neutral-700 sm:flex-row">
        {taskStatuses.map((statusObj) => (
          <TaskColumn
            key={statusObj.key}
            status={statusObj.key}
            tasks={tasks.filter((task) => task.status === statusObj.key)}
            onTaskMove={(taskId, newStatus) =>
              debouncedMoveTask(taskId, newStatus)
            }
          />
        ))}
      </div>
    </DndProvider>
  );
}
