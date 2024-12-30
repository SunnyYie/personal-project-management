import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface TaskListCardProps {
  projectTasks: {
    id: number;
    avatar: string;
    assignee: string;
    title: string;
    deadline: string;
    status: string;
    progress: number;
  }[];
}

export default function taskListCard({ projectTasks }: TaskListCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">最新任务</h2>
        <Button className="!rounded-button whitespace-nowrap">
          <Filter />
          筛选
        </Button>
      </div>
      <div className="space-y-4">
        {projectTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={task.avatar} />
                <AvatarFallback>{task.assignee.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  负责人：{task.assignee} | 截止日期：{task.deadline}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.status === "进行中"
                    ? "bg-blue-100 text-blue-600"
                    : task.status === "规划中"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {task.status}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <Button variant="ghost" className="!rounded-button">
                <i className="fas fa-ellipsis-h"></i>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
