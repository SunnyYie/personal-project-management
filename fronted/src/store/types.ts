export interface UserToken {
  token?: string;
  refreshToken?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  name?: string;
  password?: string;
  avatar?: string;
  role?: Role;
}

export enum Role {
  Admin,
  User,
}
