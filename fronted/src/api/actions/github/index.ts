import axios from "axios";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const USERNAME = import.meta.env.VITE_USERNAME;

console.log(import.meta.env);

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export async function getRepositories() {
  try {
    const response = await githubApi.get(`/users/${USERNAME}/repos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

export async function getCommits(owner: string, repo: string) {
  try {
    const response = await githubApi.get(`/repos/${owner}/${repo}/commits`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching commits for ${repo}:`, error);
    return [];
  }
}
