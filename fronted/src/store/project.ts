import { create } from "zustand";

interface ProjectStore {
  projects: any[];
  projectsDetail: { [key: string]: any };
  setStoreProjects: (projects: any[]) => void;
  setProjectDetail: (project: any) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  projectsDetail: {},
  setStoreProjects: (projects) => set({ projects }),
  setProjectDetail: (project) =>
    set((state) => ({
      projectsDetail: { ...state.projectsDetail, [project.name]: project },
    })),
}));
