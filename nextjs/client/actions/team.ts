import { Team } from "@prisma/client";
import { ResponseType } from "./types";
import prisma from "@/lib/prisma";

export const getTeams = async (): Promise<ResponseType<Team[]>> => {
  try {
    const teams = await prisma.team.findMany();
    return {
      status: 200,
      data: {
        body: teams,
      },
    };
  } catch (error) {
    console.error("获取团队列表时出错:", error);
    return {
      status: 500,
      data: {
        body: [],
      },
      error: "无法获取团队列表",
    };
  }
};

// 获取当前用户的团队列表
export const getTeamsByUser = async (
  userId: string,
): Promise<ResponseType<Team[]>> => {
  try {
    const teams = await prisma.team.findMany({
      where: {
        projectManagerUserId: userId,
      },
    });
    return {
      status: 200,
      data: {
        body: teams,
      },
    };
  } catch (error) {
    console.error("获取团队列表时出错:", error);
    return {
      status: 500,
      data: {
        body: [],
      },
      error: "无法获取团队列表",
    };
  }
};
