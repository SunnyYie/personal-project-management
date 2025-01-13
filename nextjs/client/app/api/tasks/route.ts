import { createTask } from "@/actions/task";
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(null, {
    status: 200,
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("data", data);

    const task = await createTask(data);
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("创建任务时出错:", error);
    return NextResponse.json({ error: "无法创建任务" }, { status: 500 });
  }
}
