export interface VercelDeployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  state: "READY" | "ERROR" | "BUILDING" | "CANCELED";
  meta: {
    branch: string;
  };
}

export interface VercelApiResponse {
  deployments: VercelDeployment[];
}
