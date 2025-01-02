import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router";
import { projects } from "./utils";
import {
  ArrowLeft,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnvironmentVariables } from "./components/environment-variables";
import { DomainManagement } from "./components/domain-management";
import { DeploymentStatus } from "./components/deployment-status";

export default function ProjectDetails() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const getStatusColor = (status: string) => {
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
    <div className="container mx-auto p-4">
      <Link
        to="/project/projectList"
        className="text-blue-500 hover:underline mb-4 inline-flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回
      </Link>
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Status</div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Progress value={project.progress} className="w-full" />
                  <span className="text-sm font-medium">
                    {project.progress}%
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Description</div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Date Range</div>
                <p className="text-sm text-muted-foreground">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Tasks</div>
                <p className="text-sm text-muted-foreground">
                  {project.tasks.completed} / {project.tasks.total} completed
                </p>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Framework</div>
                <p className="text-sm text-muted-foreground">
                  {project.framework}
                </p>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Project Link</div>
                <Link
                  to={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {project.link}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Team Member
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={activity.user.avatar}
                      alt={activity.user.name}
                    />
                    <AvatarFallback>
                      {activity.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Deployment</CardTitle>
          </CardHeader>
          <CardContent>
            <DeploymentStatus deployment={project.latestDeployment} />
            <div className="mt-4">
              <Link
                to={project.latestDeployment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                View Deployment
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <EnvironmentVariables
              variables={project.environmentVariables}
              onAdd={() => {}}
              onDelete={() => {}}
            />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Domains</CardTitle>
          </CardHeader>
          <CardContent>
            <DomainManagement
              domains={project.domains}
              onAdd={() => {}}
              onDelete={() => {}}
            />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Project Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Team Size</p>
                  <p className="text-2xl font-bold">{project.members.length}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <GitCommit className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Commits</p>
                  <p className="text-2xl font-bold">152</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Pull Requests</p>
                  <p className="text-2xl font-bold">32</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Active Branches</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
