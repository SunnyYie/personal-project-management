import { create } from 'zustand'

interface ProjectStore {
  projects: any[]
  setStoreProjects: (projects: any[]) => void
}

export const useProjectStore = create<ProjectStore>(set => ({
  projects: [],
  setStoreProjects: projects => set({ projects }),
}))
