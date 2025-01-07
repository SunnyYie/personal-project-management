export type ProjectStatus =
  | "NotStarted"
  | "InProgress"
  | "Completed"
  | "OnHold";
export enum ProjectStatusEnum {
  All = "全部状态",
  NotStarted = "未开始",
  InProgress = "进行中",
  Completed = "已完成",
  OnHold = "暂停",
}
export type DeploymentStatus = "Deployed" | "Building" | "Failed" | "Cancelled";
export enum DeploymentStatusEnum {
  Deployed = "已部署",
  Building = "构建中",
  Failed = "失败",
  Cancelled = "已取消",
}

export interface Member {
  id: string;
  login: string;
  email: string;
  role: string;
  avatar_url: string;
}

export interface Deployment {
  id: string;
  status?: DeploymentStatusEnum;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface EnvironmentVariable {
  id: string;
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
  message: string;
  date: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: "pdf" | "doc" | "sheet" | "other";
}

export interface CodeOperation {
  id: string;
  type: string;
  message: string;
  author: {
    name: string;
    date: string;
  };
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatusEnum;
  progress: number;
  members?: Member[];
  html_url: string;
  description: string;
  created_at: string;
  endDate: string;
  tasks?: { completed: number; total: number };
  latestDeployment?: Deployment;
  environmentVariables?: EnvironmentVariable[];
  domains?: Domain[];
  // 技术栈
  framework: string;
  recentActivities?: Activity[];
  documents?: Document[];
  budget?: number;
  client?: string;
  repository?: string;
  latestCodeOperation?: CodeOperation;
  vercelProject?: any;
}
