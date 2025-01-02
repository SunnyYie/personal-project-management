export type ProjectStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "On Hold";
export type DeploymentStatus = "Deployed" | "Building" | "Failed" | "Cancelled";

export interface Member {
  id: string;
  name: string;
  avatar: string;
}

export interface Deployment {
  id: string;
  status: DeploymentStatus;
  createdAt: string;
  url: string;
}

export interface EnvironmentVariable {
  key: string;
  value: string;
}

export interface Domain {
  name: string;
  status: "Active" | "Pending" | "Error";
}

export interface Activity {
  id: string;
  user: Member;
  action: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  members: Member[];
  link: string;
  description: string;
  startDate: string;
  endDate: string;
  tasks: { completed: number; total: number };
  latestDeployment: Deployment;
  environmentVariables: EnvironmentVariable[];
  domains: Domain[];
  framework: string;
  recentActivities: Activity[];
}
