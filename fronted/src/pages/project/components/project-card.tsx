import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Project } from "../types/project.type";
import { Link } from "react-router";
import { getStatusColor } from "../utils";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>
            <Link
              to={`/project/detail/${project.name}`}
              className="hover:underline"
            >
              {project.name}
            </Link>
          </CardTitle>
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent onClick={() => onSelect(project)}>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">项目进度</div>
          <div className="text-sm font-medium">{project.progress}%</div>
        </div>
        <Progress value={project.progress} className="mb-4" />
        <div className="flex justify-between items-center mb-4">
          <div className="flex -space-x-2">
            {project.members?.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="border-2 border-background">
                <AvatarImage src={member.avatar_url} alt={member.login} />
                <AvatarFallback>{member.login.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {project.members?.length && project.members?.length > 3 && (
              <Avatar className="border-2 border-background">
                <AvatarFallback>+{project.members.length - 3}</AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex flex-col">
            <Link
              to={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              项目仓库
            </Link>
            {project.vercelProject?.latestDeployments[0].url && (
              <a
                href={project.vercelProject?.latestDeployments[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                项目链接
              </a>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">最近代码提交记录</h4>
          {project.recentActivities?.slice(0, 2).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center text-sm text-muted-foreground"
            >
              <Clock className="mr-2 h-4 w-4" />
              <span>
                {activity.user.login} {activity.message}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
