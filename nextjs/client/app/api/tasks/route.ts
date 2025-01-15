import { createTask, updateTask, updateTaskStatus } from "@/actions/task";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const taskData = JSON.parse(req.body);
      console.log("Received task data:", taskData);

      const result = await createTask(taskData);
      if (result.error) {
        throw new Error(result.error);
      }

      res.status(201).json(result.data);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export async function GET() {
  return new NextResponse(null, {
    status: 200,
  });
}

export async function POST(request: Request) {
  console.log("data", request);
  try {
    const data = await request.json();

    const task = await createTask(data);
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("创建任务时出错:", error);
    return NextResponse.json({ error: "无法创建任务" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const taskId = data.taskId;
    const operation = data.operation;
    delete data.taskId;
    delete data.operation;

    let task;
    if (operation === "updateStatus") {
      task = await updateTaskStatus(taskId, data.status);
    } else {
      task = await updateTask(taskId, data);
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("更新任务时出错:", error);
    return NextResponse.json({ error: "无法更新任务" }, { status: 500 });
  }
}
