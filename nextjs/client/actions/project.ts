import { ProjectData } from "./schemas/project.schema";
import { Prisma, Project } from "@prisma/client";
import { ResponseType } from "./types";
import prisma from "@/lib/prisma";

// 获取全部项目列表
export const getProjects = async (): Promise<ResponseType<Project[]>> => {
  try {
    const projects = await prisma.project.findMany();
    return {
      status: 200,
      data: {
        body: projects,
      },
    };
  } catch (error) {
    console.error("获取项目列表时出错:", error);
    return {
      status: 500,
      data: {
        body: [],
      },
      error: "无法获取项目列表",
    };
  }
};

// 获取分页项目列表
export const getProjectsByPage = async (
  page: number,
  pageSize: number,
  query?: string,
): Promise<ResponseType<Project[]>> => {
  const skip = (page - 1) * pageSize;

  const where: Prisma.ProjectWhereInput = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }
    : {};

  try {
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { startDate: "desc" },
        include: { tasks: true, projectTeams: true },
      }),
      prisma.project.count({ where }),
    ]);

    return {
      status: 200,
      data: {
        body: projects,
        totalCount,
      },
      message: "获取项目列表成功",
    };
  } catch (error) {
    console.error("获取项目列表时出错:", error);
    return {
      status: 500,
      data: {
        body: [],
      },
      error: "无法获取项目列表",
    };
  }
};

// 创建项目
export const createProject = async (
  values: ProjectData,
): Promise<ResponseType<Project | null>> => {
  try {
    const project = await prisma.project.create({
      data: values,
    });
    return {
      status: 200,
      data: {
        body: project,
      },
    };
  } catch (error) {
    console.error("创建项目时出错:", error);
    return {
      status: 500,
      data: {
        body: null,
      },
      error: "无法创建项目",
    };
  }
};
