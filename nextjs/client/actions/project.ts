import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 获取项目列表
export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    console.error("获取项目列表时出错:", error);
    throw new Error("无法获取项目列表");
  } finally {
    await prisma.$disconnect();
  }
};
