import { LoginFormType, RegisterFormType } from "./types";
import apiClient from "../apiClient";

export enum UserApi {
  Login = "/auth/login",
  Register = "/auth/register",
}

const login = (data: LoginFormType) =>
  apiClient.post({ url: UserApi.Login, data });

const register = (data: RegisterFormType) =>
  apiClient.post({ url: UserApi.Register, data });

export default {
  login,
  register,
};
