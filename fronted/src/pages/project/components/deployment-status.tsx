import { Badge } from "@/components/ui/badge";
import { Deployment } from "../types/project.type";

interface DeploymentStatusProps {
  deployment?: Deployment;
}

export function DeploymentStatus({ deployment }: DeploymentStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      {deployment ? (
        <>
          <Badge className="bg-green-500">已部署</Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(deployment?.updatedAt || "").toLocaleString()}
          </span>
        </>
      ) : (
        <Badge className="bg-gray-300 text-gray-800">暂未部署</Badge>
      )}
    </div>
  );
}
