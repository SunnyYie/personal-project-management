import AvatarCircles from "@/components/ui/avatar-circles";
import { Card, CardContent } from "@/components/ui/card";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";
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

  const avatars = [
    {
      imageUrl: task.assignee?.avatar
        ? task.assignee?.avatar
        : "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: task.author?.avatar
        ? task.author?.avatar
        : "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
  ];

  return (
    <Card
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 cursor-move rounded-md p-1 shadow md:p-2 ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <CardContent>
        {task.attachments && task.attachments.length > 0 && (
          <Image
            className="h-auto w-full rounded-t-md"
            src={task.attachments[0].fileURL!}
            alt={task.attachments[0].filename}
            width={400}
            height={200}
          />
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTags.map((tag, index) => (
                <div
                  key={index}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs dark:text-gray-500"
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
        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {task.points && (
            <div className="text-sm font-semibold text-gray-500 dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {task.startDate && (
            <span>{new Date(task.startDate).toLocaleString()}</span>
          )}
          {task.endDate && (
            <span> - {new Date(task.endDate).toLocaleString()}</span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>

        {/* 分割 */}
        <hr className="my-4 border-gray-200 dark:border-gray-800" />

        <div className="mt-3 flex items-center justify-between">
          <AvatarCircles numPeople={10} avatarUrls={avatars} />
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore className="mr-1 h-4 w-4" />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numbeOfComments}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
