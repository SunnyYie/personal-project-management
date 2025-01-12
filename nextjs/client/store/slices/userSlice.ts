import { StateCreator } from "zustand";

export interface UserState {
  name: string;
  setName: (name: string) => void;
}

const userSlice: StateCreator<UserState> = (set, get) => ({
  name: "",
  setName: (name) => set({ name }),
});

export default userSlice;
