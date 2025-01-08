import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Clock, GitCommit } from "lucide-react";
import { Project, ProjectStatusEnum } from "./types/project.type";
import { Link, useParams } from "react-router";
import { Deployments } from "./detail-components/deployment";
import { Analytics } from "./detail-components/analytic";
import { Logs } from "./detail-components/log";
import { GitOperation } from "./detail-components/git-operation";
import { getCommits, getRepository } from "@/api/actions/github";
import { getProjects } from "@/api/actions/vercel";
import { Input } from "@/components/ui/input";
import { useProjectStore } from "@/store/project";
import File from "./detail-components/file";

function BasicInfo({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-1">{project.name}</h1>
          <p className="text-muted-foreground">
            {project.description || "暂无描述"}
          </p>
        </div>
        <Badge variant="default" className="bg-blue-500">
          {project.status}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">进度</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">项目资金</CardTitle>
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
              ${project.budget?.toLocaleString() || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              已完成任务数/任务总数
            </CardTitle>
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
              {project.tasks?.completed || 0}/{project.tasks?.total || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">团队成员数</CardTitle>
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
            <div className="text-2xl font-bold">
              {project.members?.length || 0}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>项目详情</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">开始时间:</span>
              <span>
                {new Date(project.created_at).toLocaleString("zh-cn")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">结束时间:</span>
              <span>{project.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">技术栈:</span>
              <span>{project.framework}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">cloneURL:</span>
              <a
                href={project.clone_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline truncate"
              >
                {project.clone_url}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">downloads_url:</span>
              <a
                href={project.downloads_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline truncate"
              >
                {project.downloads_url}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">项目链接:</span>
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline truncate"
              >
                {project.homepage}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">html_url:</span>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline truncate"
              >
                {project.html_url}
              </a>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>团队成员</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.members?.map((member: any) => (
                <Avatar key={member.id} title={member.login}>
                  <AvatarImage src={member.avatar_url} alt={member.login} />
                  <AvatarFallback>{member.login.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>最新代码提交记录</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              {project.githubCommits?.slice(0, 5)?.map((commit: any) => {
                return (
                  <div
                    key={commit.sha}
                    className="flex items-center space-x-2 mb-1"
                  >
                    <GitCommit className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {commit.commit.message}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {commit.commit.author.name} on{" "}
                        {new Date(commit.commit.author.date).toLocaleString(
                          "zh-cn"
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>环境变量</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {project.vercelProject?.env?.map((env: any) => (
              <div
                key={env.id}
                className="flex items-center justify-between space-x-2"
              >
                <Input placeholder="Key" value={env.key} disabled />
                <Input placeholder="Value" value={env.value} disabled />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {project.domains?.map((domain: any) => (
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
  const { projectsDetail, setProjectDetail } = useProjectStore();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const USERNAME = import.meta.env.VITE_USERNAME;

      try {
        const projectId = params.id;
        if (!projectId) return;

        // 获取 GitHub 项目
        const githubProject = await getRepository(projectId);
        const githubCommits = await getCommits(USERNAME, projectId);

        // 获取 Vercel 项目
        const projects = await getProjects();
        const vercelProject = projects.find(
          (vercelProject: any) => vercelProject.link.repo === githubProject.name
        );

        // 拼接项目数据
        const combinedProject = {
          ...githubProject,
          githubCommits: githubCommits,
          vercelProject,
          status: ProjectStatusEnum.InProgress,
          progress: 0,
          framework: "React",
          members: [
            {
              ...githubProject.owner,
              role: "admin",
            },
          ],
        };

        setProject(combinedProject);
        setProjectDetail(combinedProject);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectsDetail[params.id as any]) {
      setProject(projectsDetail[params.id as any]);
      setLoading(false);
    } else {
      fetchProjectDetails();
    }
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Link to="/project/projectList" className="text-blue-600">
        <ArrowLeft className="h-4 w-4 inline-block -mt-1 mr-1" />
        返回项目列表
      </Link>
      <Tabs defaultValue="basic-info" className="space-y-4 mt-4">
        <TabsList>
          <TabsTrigger value="basic-info">项目基本信息</TabsTrigger>
          <TabsTrigger value="deployments">部署</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
          <TabsTrigger value="logs">日志</TabsTrigger>
          <TabsTrigger value="database">数据库</TabsTrigger>
          <TabsTrigger value="git-operations">代码提交记录</TabsTrigger>
          <TabsTrigger value="file">文件</TabsTrigger>
          <TabsTrigger value="configuration">配置</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <BasicInfo project={project} />
        </TabsContent>
        <TabsContent value="deployments">
          <Deployments project={project} />
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics project={project} />
        </TabsContent>
        <TabsContent value="logs">
          <Logs project={project} />
        </TabsContent>
        <TabsContent value="database">
          <Database />
        </TabsContent>
        <TabsContent value="git-operations">
          <GitOperation commits={project} />
        </TabsContent>
        <TabsContent value="file">
          <File projectId={project.id} />
        </TabsContent>
        <TabsContent value="configuration">
          <Configuration />
        </TabsContent>
      </Tabs>
    </div>
  );
}
