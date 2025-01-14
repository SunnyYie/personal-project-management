import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";
import PriorityTag from "./priority-tag";
import { Button } from "../ui/button";
import Image from "next/image";

import { TaskWithRelations } from "@/actions/types";
import { useDrag } from "react-dnd";

interface TaskCardProps {
  task: TaskWithRelations;
}

export function TaskCard({ task }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTags = task?.tags ? task.tags.split(",") : [];
  const numbeOfComments = (task.comments && task.comments.length) || 0;

  return (
    <Card
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 cursor-move rounded-md shadow ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <CardHeader>
        {task.attachments && task.attachments.length > 0 && (
          <Image
            className="h-auto w-full rounded-t-md"
            src={task.attachments[0].fileURL!}
            alt={task.attachments[0].filename}
            width={400}
            height={200}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTags.map((tag, index) => (
                <div
                  key={index}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <Button size="icon" variant="ghost">
            <EllipsisVertical />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
