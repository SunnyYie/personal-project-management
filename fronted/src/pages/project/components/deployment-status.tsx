import { Badge } from "@/components/ui/badge";
import { Deployment } from "../types/project.type";

interface DeploymentStatusProps {
  deployment: Deployment;
}

export function DeploymentStatus({ deployment }: DeploymentStatusProps) {
  const getStatusColor = (status: Deployment["status"]) => {
    switch (status) {
      case "Deployed":
        return "bg-green-500";
      case "Building":
        return "bg-yellow-500";
      case "Failed":
        return "bg-red-500";
      case "Cancelled":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Badge className={getStatusColor(deployment.status)}>
        {deployment.status}
      </Badge>
      <span className="text-sm text-muted-foreground">
        {new Date(deployment.createdAt).toLocaleString()}
      </span>
    </div>
  );
}
