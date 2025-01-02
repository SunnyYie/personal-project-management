import axios from "axios";

const VERCEL_TOKEN = import.meta.env.VITE_VERCEL_TOKEN;
const VERCEL_TEAM_ID = import.meta.env.VITE_VERCEL_TEAM_ID;

const vercelApi = axios.create({
  baseURL: "https://api.vercel.com",
  headers: {
    Authorization: `Bearer ${VERCEL_TOKEN}`,
  },
});

export async function getProjects() {
  try {
    const response = await vercelApi.get(
      `/v9/projects?teamId=${VERCEL_TEAM_ID}`
    );
    return response.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getDeployments(projectId: string) {
  try {
    const response = await vercelApi.get(
      `/v9/projects/${projectId}/deployments?teamId=${VERCEL_TEAM_ID}`
    );
    return response.data.deployments;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`Project with ID ${projectId} not found.`);
    } else {
      console.error(
        `Error fetching deployments for project ${projectId}:`,
        error
      );
    }
    return [];
  }
}
