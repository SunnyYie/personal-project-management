import { TaskData } from "./schemas/task.schema";
import { ResponseType } from "./types";
import { Task } from "@prisma/client";
import prisma from "@/lib/prisma";

// 获取全部任务列表
export const getTasks = async (): Promise<ResponseType<Task[]>> => {
  try {
    const taskss = await prisma.task.findMany();
    return {
      status: 200,
      data: {
        body: taskss,
      },
    };
  } catch (error) {
    console.error("获取任务列表时出错:", error);
    return {
      status: 500,
      data: {
        body: [],
      },
      error: "无法获取任务列表",
    };
  }
};

// 获取分页任务列表
export const getTasksByPage = async (
  page: number,
  pageSize: number,
): Promise<ResponseType<Task[]>> => {
  const skip = (page - 1) * pageSize;
  try {
    const [tasks, totalCount] = await Promise.all([
      prisma.task.findMany({
        skip,
        take: pageSize,
        orderBy: { startDate: "desc" },
      }),
      prisma.task.count(),
    ]);

    return {
      status: 200,
      data: {
        body: tasks,
        totalCount,
      },
      message: "获取任务列表成功",
    };
  } catch (error) {
    console.error("获取任务列表时出错:", error);
    return {
      status: 500,
      data: {
        body: [],
      },
      error: "无法任务项目列表",
    };
  }
};

// 创建任务
export const createTask = async (
  values: TaskData,
): Promise<ResponseType<Task | null>> => {
  if (typeof values !== "object" || values === null) {
    throw new TypeError(
      'The "payload" argument must be of type object. Received null',
    );
  }
  try {
    console.log("values", values);

    const task = await prisma.task.create({
      data: {
        ...values,
        attachments: {
          create: [],
        },
        comments: {
          create: [],
        },
        taskAssignment: {
          create: [],
        },
      },
      include: {
        project: { select: { name: true } },
        author: { select: { name: true } },
        assignee: { select: { name: true } },
      },
    });
    return {
      status: 200,
      data: {
        body: task,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    console.error("创建任务时出错:", error);
    return {
      status: 500,
      data: {
        body: null,
      },
      error: "无法创建任务",
    };
  }
};
