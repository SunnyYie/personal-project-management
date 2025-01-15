import { Team, Project } from "@prisma/client";
import { StateCreator } from "zustand";

export interface TeamState {
  teams: Team[];
  projects: Project[];
  activeTeam: Team | null;
  setTeams: (teams: Team[]) => void;
  setProjects: (projects: Project[]) => void;
  setActiveTeam: (team: Team) => void;
}

const teamSlice: StateCreator<TeamState> = (set, get) => ({
  teams: [],
  projects: [],
  activeTeam: null,
  setTeams: (teams) => set({ teams }),
  setProjects: (projects) => set({ projects }),
  setActiveTeam: (activeTeam) => set({ activeTeam }),
});

export default teamSlice;
