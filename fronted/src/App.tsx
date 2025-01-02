import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/routes";
import { useEffect } from "react";
import { getCommits, getRepositories } from "./api/actions/github";
import { getProjects } from "./api/actions/vercel";

export default function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    // test
    const testGithub = async () => {
      const USERNAME = import.meta.env.VITE_USERNAME;
      const repos = await getRepositories();
      console.log("Repositories:", repos);

      if (repos.length > 0) {
        const repo = repos[0];
        const commits = await getCommits(USERNAME, repo.name);
        console.log(`Commits for ${repo.name}:`, commits);
      }
    };
    testGithub();

    // test
    const testVercel = async () => {
      const projects = await getProjects();
      console.log("Vercel projects:", projects);

      // if (projects.length > 0) {
      //   const deployments = await getDeployments(projects[0].id);
      //   console.log(`Deployments for ${projects[0].name}:`, deployments);
      // }
    };
    testVercel();
  }, []);

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
