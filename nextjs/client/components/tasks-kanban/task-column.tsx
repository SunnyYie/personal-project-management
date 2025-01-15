import { EllipsisVertical, Plus } from "lucide-react";
import { TaskCard } from "./task-card";
import { Button } from "../ui/button";

import { TaskWithRelations } from "@/actions/types";
import { taskStatuses } from "@/types/task.types";
import { Task } from "@prisma/client";
import { useDrop } from "react-dnd";

interface TaskColumnProps {
  status: Task["status"];
  tasks: TaskWithRelations[];
  onTaskMove: (taskId: string, newStatus: Task["status"]) => void;
}

export function TaskColumn({ status, tasks, onTaskMove }: TaskColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string; status: Task["status"] }) => {
      if (item.status !== status) {
        onTaskMove(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 flex-1 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-900" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 rounded-s-lg`}
          style={{
            backgroundColor: taskStatuses.find((item) => item.key == status)
              ?.color,
          }}
        />
        <div className="flex flex-grow items-center justify-between rounded-e-lg bg-white p-5 dark:bg-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {taskStatuses.find((item) => item.key == status)?.label}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm dark:bg-gray-800"
              style={{ height: "1.5rem", width: "1.5rem", lineHeight: "16px" }}
            >
              {tasks.length}
            </span>
          </h3>

          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost">
              <EllipsisVertical />
            </Button>
            <Button
              className="bg-gray-200 dark:bg-gray-700"
              size="icon"
              variant="ghost"
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
