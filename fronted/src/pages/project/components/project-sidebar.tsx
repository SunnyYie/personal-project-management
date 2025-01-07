import { X, Edit, Trash, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeploymentStatus } from "./deployment-status";
import { EnvironmentVariables } from "./environment-variables";
import { DomainManagement } from "./domain-management";
import { Badge } from "@/components/ui/badge";
import { Project } from "../types/project.type";
import { getStatusColor } from "../utils";

interface ProjectSidebarProps {
  project: Project | null;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProjectSidebar({
  project,
  onClose,
  onEdit,
  onDelete,
}: ProjectSidebarProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-background border-l p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{project.name}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">项目进度</h3>
          <div className="flex items-center space-x-2">
            <Badge className={`${getStatusColor(project.status)} w-[70px]`}>
              {project.status}
            </Badge>
            <Progress value={project.progress} className="w-full" />
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">最近部署</h3>
          <DeploymentStatus
            deployment={project.vercelProject.latestDeployments[0]}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">技术栈</h3>
          <span className="text-sm">{project.framework}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">项目描述</h3>
          <p className="text-sm text-muted-foreground">
            {project.description || "暂无描述"}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">计划时间</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(project.created_at).toLocaleString("zh-CN")}-
            {new Date(project.endDate).toLocaleString("zh-CN")}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {project.tasks?.completed || 0} / {project.tasks?.total || 0}{" "}
            任务完成数
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">团队成员</h3>
          <div className="flex flex-wrap gap-2">
            {project.members?.map((member) => (
              <Avatar key={member.id}>
                <AvatarImage src={member.avatar_url} alt={member.login} />
                <AvatarFallback>{member.login.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">最近代码提交记录</h3>
          <div className="space-y-2">
            {project.recentActivities?.slice(0, 3)?.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center text-sm text-muted-foreground"
              >
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {activity.user.login} {activity.message} -{" "}
                  {new Date(activity.date).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <EnvironmentVariables variables={project.vercelProject.env} />
        <DomainManagement domains={project.domains} />
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" size="sm" disabled>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" disabled>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
