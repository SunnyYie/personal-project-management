import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

interface DeploymentsProps {
  project: any;
}

export function Deployments({ project }: DeploymentsProps) {
  const [branch, setBranch] = useState("");
  const [deploying, setDeploying] = useState(false);

  // useEffect(() => {
  //   fetchDeployments();
  // }, [projectId]);

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
              {deploying ? "Deploying..." : "Deploy"}
            </Button>
          </form>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>
            View your project's deployment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!project.vercelProject ? (
            <p>No deployments found.</p>
          ) : (
            <div className="space-y-4">
              {/* {deployments.map((deployment) => (
                <Card key={deployment.uid}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {deployment.name}
                      </CardTitle>
                      <Badge
                        variant={
                          deployment.state === "READY" ? "default" : "secondary"
                        }
                      >
                        {deployment.state}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Branch: {deployment.meta.branch}</span>
                      <span>•</span>
                      <span>
                        Created: {new Date(deployment.created).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(deployment.state)}
                      <span className="text-sm font-medium">
                        {deployment.state}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={deployment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Deployment
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))} */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
