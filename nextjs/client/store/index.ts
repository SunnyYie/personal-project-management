import { devtools } from "zustand/middleware";
import { create } from "zustand";

import settingSlice, { SettingState } from "./slices/settingSlice";
import userSlice, { UserState } from "./slices/userSlice";
import teamSlice, { TeamState } from "./slices/teamSlice";

const useStore = create<SettingState & UserState & TeamState>()(
  devtools<SettingState & UserState & TeamState>((set, get, api) => ({
    ...settingSlice(set, get, api),
    ...userSlice(set, get, api),
    ...teamSlice(set, get, api),
  })),
);

export default useStore;
