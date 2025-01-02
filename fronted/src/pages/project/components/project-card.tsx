import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Project } from "../project.type";
import { Link } from "react-router";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-500";
      case "In Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      case "On Hold":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>
            <Link
              to={`/project/detail/${project.id}`}
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
          <div className="text-sm text-muted-foreground">Progress</div>
          <div className="text-sm font-medium">{project.progress}%</div>
        </div>
        <Progress value={project.progress} className="mb-4" />
        <div className="flex justify-between items-center mb-4">
          <div className="flex -space-x-2">
            {project.members.map((member) => (
              <Avatar key={member.id} className="border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Link
            to={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline"
          >
            Project Link
          </Link>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Activities</h4>
          {project.recentActivities.slice(0, 2).map((activity) => (
            <div
              key={activity.id}
              className="flex items-center text-sm text-muted-foreground"
            >
              <Clock className="mr-2 h-4 w-4" />
              <span>
                {activity.user.name} {activity.action}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
