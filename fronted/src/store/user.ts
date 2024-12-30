import { getItem, setItem, StorageEnum } from "@/utils/storage";

import userService from "@/api/user/userService";
import { LoginFormType } from "@/api/user/types";
import { UserInfo, UserToken } from "./types";

import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";

type User = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    setUserRefreshToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserAuthStore = create<User>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.UserInfo) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.UserInfo, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    setUserRefreshToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.RefreshToken, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
    },
  },
}));

export const useUserInfo = () => useUserAuthStore((state) => state.userInfo);
export const useUserToken = () => useUserAuthStore((state) => state.userToken);
export const setUserRefreshToken = () =>
  useUserAuthStore((state) => state.userToken);
export const useUserActions = () => useUserAuthStore((state) => state.actions);

export const useSignIn = () => {
  const { setUserToken, setUserInfo, setUserRefreshToken } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: userService.login,
  });

  const signIn = async (data: LoginFormType) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { userInfo, token, refreshToken } = res;

      setUserToken({ token });
      setUserRefreshToken({ refreshToken });
      setUserInfo(userInfo);
    } catch (err) {
      throw new Error((err as any)?.message || "请求错误，请稍后重试");
    }
  };

  return signIn;
};

export default useUserAuthStore;
