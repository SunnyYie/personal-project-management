import { useState, useEffect } from "react";
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

interface Deployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  state: "READY" | "ERROR" | "BUILDING" | "CANCELED";
  meta: {
    branch: string;
  };
}

interface DeploymentsProps {
  projectId: string;
}

export function Deployments({ projectId }: DeploymentsProps) {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState("");
  const [deploying, setDeploying] = useState(false);

  // useEffect(() => {
  //   fetchDeployments();
  // }, [projectId]);

  const fetchDeployments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vercel?projectId=${projectId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch deployments");
      }
      const data = await response.json();
      setDeployments(data.deployments);
    } catch (error) {
      console.error("Error fetching deployments:", error);
      toast.error("Failed to fetch deployments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeploying(true);
    try {
      const response = await fetch("/api/vercel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, branch }),
      });
      if (!response.ok) {
        throw new Error("Failed to create deployment");
      }
      toast.success("Deployment created successfully.");
      fetchDeployments();
      setBranch("");
    } catch (error) {
      console.error("Error creating deployment:", error);
      toast.error("Failed to create deployment. Please try again.");
    } finally {
      setDeploying(false);
    }
  };

  const getStatusIcon = (state: Deployment["state"]) => {
    switch (state) {
      case "READY":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "ERROR":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "BUILDING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "CANCELED":
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
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
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>
            View your project's deployment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading deployments...</p>
          ) : deployments.length === 0 ? (
            <p>No deployments found.</p>
          ) : (
            <div className="space-y-4">
              {deployments.map((deployment) => (
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
