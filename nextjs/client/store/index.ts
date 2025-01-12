import { devtools } from "zustand/middleware";
import { create } from "zustand";

import settingSlice, { SettingState } from "./slices/settingSlice";
import userSlice, { UserState } from "./slices/userSlice";

const useStore = create<SettingState & UserState>()(
  devtools<SettingState & UserState>((set, get, api) => ({
    ...settingSlice(set, get, api),
    ...userSlice(set, get, api),
  })),
);

export default useStore;
