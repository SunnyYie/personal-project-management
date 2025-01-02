import { Project, ProjectStatus } from "./project.type";
import { projects as initialProjects } from "./utils";
import { useState } from "react";

import { ProjectSidebar } from "./components/project-sidebar";
import { ProjectFilters } from "./components/project-filters";
import { ProjectCard } from "./components/project-card";
import { ProjectForm } from "./components/project-form";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

export default function ProjectHome() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">(
    "All"
  );
  const [sortBy, setSortBy] = useState<"name" | "status" | "progress">("name");

  const handleAddProject = (newProject: Partial<Project>) => {
    const projectToAdd = {
      ...newProject,
      id: (projects.length + 1).toString(),
      members: [],
      tasks: { completed: 0, total: 0 },
      latestDeployment: {
        id: "1",
        status: "Deployed",
        createdAt: new Date().toISOString(),
        url: "https://example.com",
      },
      environmentVariables: [],
      domains: [],
      framework: "Next.js",
      recentActivities: [],
    } as Project;
    setProjects([...projects, projectToAdd]);
    setIsAddingProject(false);
  };

  const handleUpdateProject = (updatedProject: Partial<Project>) => {
    setProjects(
      projects.map((p) =>
        p.id === selectedProject?.id ? { ...p, ...updatedProject } : p
      )
    );
    setSelectedProject((prev) =>
      prev ? { ...prev, ...updatedProject } : null
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    setSelectedProject(null);
  };

  const filteredProjects = projects
    .filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "All" || project.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return b.progress - a.progress;
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Project Management Dashboard</h1>
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => setIsAddingProject(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>
      <ProjectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>
      {selectedProject && (
        <ProjectSidebar
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={() => setIsAddingProject(true)}
          onDelete={() => handleDeleteProject(selectedProject.id)}
          onUpdateProject={handleUpdateProject}
        />
      )}
      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedProject ? "Edit Project" : "Add New Project"}
            </h2>
            <ProjectForm
              project={selectedProject || undefined}
              onSubmit={
                selectedProject ? handleUpdateProject : handleAddProject
              }
              onCancel={() => {
                setIsAddingProject(false);
                setSelectedProject(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
