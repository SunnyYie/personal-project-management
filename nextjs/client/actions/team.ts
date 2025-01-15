import { Project, Team, User } from "@prisma/client";
import { ResponseType } from "./types";
import prisma from "@/lib/prisma";

export type TeamWithProjectsAndMembers = Team & {
  projectTeams: { project: Project }[];
  UserTeam: { User: User }[];
};

export const getTeams = async (): Promise<
  ResponseType<TeamWithProjectsAndMembers[]>
> => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        projectTeams: {
          include: {
            project: true,
          },
        },
        UserTeam: {
          include: {
            User: true,
          },
        },
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

// 创建团队
export const createTeam = async (
  data: Team,
): Promise<ResponseType<Team | null>> => {
  try {
    const team = await prisma.team.create({
      data: {
        ...data,
      },
    });
    return {
      status: 200,
      data: {
        body: team,
      },
    };
  } catch (error) {
    console.error("创建团队时出错:", error);
    return {
      status: 500,
      data: {
        body: null,
      },
      error: "无法创建团队",
    };
  }
};

// 更新团队
export const updateTeam = async (
  teamId: string,
  data: {
    name: string;
  },
): Promise<ResponseType<Team | null>> => {
  try {
    const team = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        name: data.name,
      },
    });
    return {
      status: 200,
      data: {
        body: team,
      },
    };
  } catch (error) {
    console.error("更新团队时出错:", error);
    return {
      status: 500,
      data: {
        body: null,
      },
      error: "无法更新团队",
    };
  }
};
