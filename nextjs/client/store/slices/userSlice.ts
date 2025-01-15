import { StateCreator } from "zustand";

export interface UserState {
  name: string;
  userInfo: any;
  setName: (name: string) => void;
  setUserInfo: (userInfo: any) => void;
}

const userSlice: StateCreator<UserState> = (set, get) => ({
  name: "",
  userInfo: {},
  setName: (name) => set({ name }),
  setUserInfo: (userInfo) => set({ userInfo }),
});

export default userSlice;
