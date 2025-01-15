import { ResponseType } from "./types";
import { Role, User } from "@prisma/client";
import prisma from "@/lib/prisma";

// 获取全部用户列表
export const getUsers = async (): Promise<ResponseType<User[]>> => {
  try {
    const users = await prisma.user.findMany();
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
        role: Role.ADMIN,
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
