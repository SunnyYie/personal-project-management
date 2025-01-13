import { createProject } from "@/actions/project";
import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(null, {
    status: 200,
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const project = await createProject(data);
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("创建项目时出错:", error);
    return NextResponse.json({ error: "无法创建项目" }, { status: 500 });
  }
}
