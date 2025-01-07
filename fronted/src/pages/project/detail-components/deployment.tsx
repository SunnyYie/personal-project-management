import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitCommit } from 'lucide-react'

interface DeploymentsProps {
  project: any
}

export function Deployments({ project }: DeploymentsProps) {
  // const handleDeploy = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setDeploying(true);
  //   try {
  //     const response = await fetch("/api/vercel", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ projectId, branch }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to create deployment");
  //     }
  //     toast.success("Deployment created successfully.");
  //     fetchDeployments();
  //     setBranch("");
  //   } catch (error) {
  //     console.error("Error creating deployment:", error);
  //     toast.error("Failed to create deployment. Please try again.");
  //   } finally {
  //     setDeploying(false);
  //   }
  // };

  return (
    <div className="space-y-6">
      {/* <Card>
        <CardHeader>
          <CardTitle>Create New Deployment</CardTitle>
          <CardDescription>
            Deploy a new version of your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeploy} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                placeholder="Enter branch name"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={deploying}>
              部署
            </Button>
          </form>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>部署记录</CardTitle>
          <CardDescription>查看项目的部署记录</CardDescription>
        </CardHeader>
        <CardContent>
          {!project.vercelProject.latestDeployments ? (
            <p>No deployments found.</p>
          ) : (
            <div className="space-y-4">
              {project.vercelProject.latestDeployments.map((deployment: any) => (
                <Card key={deployment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{deployment.name}</CardTitle>
                      <Badge variant={deployment.readyState === 'READY' ? 'default' : 'secondary'}>
                        {deployment.readyState}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Branch: {deployment.meta.githubCommitRef}</span>
                      <span>•</span>
                      <span>创建人: {deployment.creator.username}</span>
                      <span>•</span>
                      <span>Created: {new Date(deployment.createdAt).toLocaleString('zh-cn')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>代码更改记录:</span>
                      <div className="flex items-center">
                        <GitCommit className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm font-medium">{deployment.meta.githubCommitMessage}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>更改人:</span>
                      <div className="flex items-center">
                        <div className="text-sm font-medium">{deployment.meta.githubCommitAuthorName}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>更改账号:</span>
                      <div className="flex items-center">
                        <div className="text-sm font-medium">{deployment.meta.githubCommitOrg}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://vercel.com/sunnyyees-projects/${project.vercelProject.name}/deployments`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        查看部署信息
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
