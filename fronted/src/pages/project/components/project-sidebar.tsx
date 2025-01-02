import { X, Edit, Trash, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeploymentStatus } from "./deployment-status";
import { EnvironmentVariables } from "./environment-variables";
import { DomainManagement } from "./domain-management";
import { Badge } from "@/components/ui/badge";
import { Project } from "../project.type";

interface ProjectSidebarProps {
  project: Project | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateProject: (updatedProject: Partial<Project>) => void;
}

export function ProjectSidebar({
  project,
  onClose,
  onEdit,
  onDelete,
  onUpdateProject,
}: ProjectSidebarProps) {
  if (!project) return null;

  const handleAddEnvVar = (variable: { key: string; value: string }) => {
    onUpdateProject({
      environmentVariables: [...project.environmentVariables, variable],
    });
  };

  const handleDeleteEnvVar = (key: string) => {
    onUpdateProject({
      environmentVariables: project.environmentVariables.filter(
        (v) => v.key !== key
      ),
    });
  };

  const handleAddDomain = (domain: {
    name: string;
    status: "Active" | "Pending" | "Error";
  }) => {
    onUpdateProject({
      domains: [...project.domains, domain],
    });
  };

  const handleDeleteDomain = (name: string) => {
    onUpdateProject({
      domains: project.domains.filter((d) => d.name !== name),
    });
  };

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
    <div className="fixed inset-y-0 right-0 w-[600px] bg-background border-l p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{project.name}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <Progress value={project.progress} className="w-full" />
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Latest Deployment</h3>
          <DeploymentStatus deployment={project.latestDeployment} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Framework</h3>
          <span className="text-sm">{project.framework}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Date Range</h3>
          <p className="text-sm text-muted-foreground">
            {project.startDate} - {project.endDate}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <p className="text-sm text-muted-foreground">
            {project.tasks.completed} / {project.tasks.total} completed
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          <div className="flex flex-wrap gap-2">
            {project.members.map((member) => (
              <Avatar key={member.id}>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
          <div className="space-y-2">
            {project.recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center text-sm text-muted-foreground"
              >
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {activity.user.name} {activity.action} -{" "}
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <EnvironmentVariables
          variables={project.environmentVariables}
          onAdd={handleAddEnvVar}
          onDelete={handleDeleteEnvVar}
        />
        <DomainManagement
          domains={project.domains}
          onAdd={handleAddDomain}
          onDelete={handleDeleteDomain}
        />
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
