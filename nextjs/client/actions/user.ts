import { UserTeam } from "./../node_modules/.prisma/client/index.d";
import { Role, Team, User } from "@prisma/client";
import { ResponseType } from "./types";
import prisma from "@/lib/prisma";

export type MemberWithTeam = User & {
  UserTeam: (UserTeam & { Team: Team })[]; // 确保 UserTeam 包含 Team 属性
};

// 获取全部用户列表
export const getUsers = async (): Promise<ResponseType<MemberWithTeam[]>> => {
  try {
    const users: MemberWithTeam[] = await prisma.user.findMany({
      // 指定返回值类型
      include: {
        UserTeam: {
          include: {
            Team: true, // 添加这一行以包含团队信息
          },
        },
      },
    });
    return {
      status: 200,
      data: {
        body: users,
      },
    };
  } catch (error) {
    console.error("获取用户列表时出错:", error);
    return {
      status: 500,
      data: {
        body: [],
      },
      error: "无法获取列表",
    };
  }
};

// 获取用户详情
export const getUser = async (
  email: string,
): Promise<ResponseType<User | null>> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return {
      status: 200,
      data: {
        body: user,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    console.error("获取用户详情时出错:", error);
    return {
      status: 500,
      data: {
        body: null,
      },
      error: "无法获取用户详情",
    };
  }
};

// 创建用户
export const createUser = async (
  data: User,
): Promise<ResponseType<User | null>> => {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        role: data.role === "ADMIN" ? Role.ADMIN : Role.USER,
        avatar: "",
        password: "123456",
        cognitoId: `${data.email}-cognito-id`,
      },
    });
    return {
      status: 200,
      data: {
        body: user,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    console.error("创建用户时出错:", error);
    return {
      status: 500,
      data: {
        body: null,
      },
      error: "无法创建用户",
    };
  }
};

// 更新用户
export const updateUser = async (
  userId: string,
  data: User,
): Promise<ResponseType<User | null>> => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return {
      status: 200,
      data: {
        body: user,
      },
    };
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error: ", e.stack);
    }
    console.error("更新用户时出错:", e);
    return {
      status: 500,
      data: {
        body: null,
      },
      error: "无法更新用户",
    };
  }
};
