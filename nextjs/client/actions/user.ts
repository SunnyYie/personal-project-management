import { ResponseType } from "./types";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

// 获取全部任务列表
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
