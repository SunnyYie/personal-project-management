import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Clock,
  GitBranch,
  GitCommit,
  GitPullRequest,
} from "lucide-react";
import { Project } from "./types/project.type";
import { Link, useParams } from "react-router";
import { projects } from "./utils";
import { Deployments } from "./detail-components/deployment";
import { Analytics } from "./detail-components/analytic";
import { Logs } from "./detail-components/log";
import { GitOperation } from "./detail-components/git-operation";

function BasicInfo({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <Badge
          variant={project.status === "Completed" ? "default" : "secondary"}
        >
          {project.status}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${project.budget.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.tasks.completed}/{project.tasks.total}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.members.length}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Client:</span>
              <span>{project.client}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Start Date:</span>
              <span>{project.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">End Date:</span>
              <span>{project.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Framework:</span>
              <span>{project.framework}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.members.map((member) => (
                <Avatar key={member.id} title={member.name}>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Latest Code Operation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {project.latestCodeOperation.type === "commit" && (
                <GitCommit className="h-4 w-4" />
              )}
              {project.latestCodeOperation.type === "pull_request" && (
                <GitPullRequest className="h-4 w-4" />
              )}
              {project.latestCodeOperation.type === "branch" && (
                <GitBranch className="h-4 w-4" />
              )}
              <span className="font-medium">
                {project.latestCodeOperation.title}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              by {project.latestCodeOperation.author} on{" "}
              {project.latestCodeOperation.date}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {project.domains.map((domain) => (
              <div
                key={domain.name}
                className="flex items-center justify-between"
              >
                <span>{domain.name}</span>
                <Badge
                  variant={domain.status === "Active" ? "default" : "secondary"}
                >
                  {domain.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Database() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Database</h2>
      <p>
        Database information will be displayed here, similar to Vercel's
        interface.
      </p>
    </div>
  );
}

function Configuration() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configuration</h2>
      <p>
        Project configuration, including environment variables, will be managed
        here.
      </p>
    </div>
  );
}

export default function ProjectDetails() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchedProject = projects.find((p) => p.id === params.id);
    setProject(fetchedProject || null);
  }, [params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Link to="/project/projectList" className="text-blue-600">
        <ArrowLeft className="h-4 w-4 inline-block -mt-1 mr-1" />
        Back to Projects
      </Link>
      <Tabs defaultValue="basic-info" className="space-y-4 mt-4">
        <TabsList>
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="git-operations">Git Operations</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <BasicInfo project={project} />
        </TabsContent>
        <TabsContent value="deployments">
          <Deployments projectId={project.id} />
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics projectId={project.id} />
        </TabsContent>
        <TabsContent value="logs">
          <Logs projectId={project.id} />
        </TabsContent>
        <TabsContent value="database">
          <Database />
        </TabsContent>
        <TabsContent value="git-operations">
          <GitOperation
            owner={project.repository.split("/")[0]}
            repo={project.repository.split("/")[1]}
          />
        </TabsContent>
        <TabsContent value="configuration">
          <Configuration />
        </TabsContent>
      </Tabs>
    </div>
  );
}
