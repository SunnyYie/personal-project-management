import apiClient from "./apiClient";

export enum CommonApi {
  sendCode = "/auth/send-code",
  confirmCode = "/auth/confirm-code",
  removeCode = "/auth/remove-code",
}

const sendCode = (data: { email: string }) =>
  apiClient.post({ url: CommonApi.sendCode, data });

const confirmCode = (data: {
  email: string;
  code: string;
  newPassword: string;
}) => apiClient.post({ url: CommonApi.confirmCode, data });

const removeCode = (data: { email: string }) =>
  apiClient.post({ url: CommonApi.removeCode, data });

export default {
  sendCode,
  confirmCode,
  removeCode,
};
