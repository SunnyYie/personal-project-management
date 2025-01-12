import { StateCreator } from "zustand";

export interface SettingState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSideBarCollapsed: boolean;
  toggleSideBar: () => void;
}

const settingSlice: StateCreator<SettingState> = (set, get) => ({
  isDarkMode: false,
  isSideBarCollapsed: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSideBar: () =>
    set((state) => ({ isSideBarCollapsed: !state.isSideBarCollapsed })),
});

export default settingSlice;
