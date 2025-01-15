import { createProject, getProjectsByTeam } from "@/actions/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const teamId = req.url?.split("=")[1] as string;

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 },
      );
    }

    const {
      data: { body: projects },
    } = await getProjectsByTeam(teamId);

    if (!projects.length) {
      return NextResponse.json(
        { error: "No projects found for this team" },
        { status: 404 },
      );
    }

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
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
