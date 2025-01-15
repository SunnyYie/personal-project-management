import { createTeam, getTeams, getTeamsByUser, updateTeam } from "@/actions/team";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const url = new URL(req.url!);
    const userId = url.searchParams.get("userId");
    const queryType = url.searchParams.get("queryType"); // 新增查询类型参数

    if (!userId && queryType !== "all") {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    let teams;
    if (queryType === "all") {
      // 查询所有任务的逻辑
      const resData = await getTeams(); // 假设您有一个获取所有任务的函数
      teams = resData.data.body;
    } else {
      const resData = await getTeamsByUser(userId!);
      teams = resData.data.body;
    }

    if (!teams.length) {
      return NextResponse.json({ error: "No teams found" }, { status: 404 });
    }

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch teams", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const team = await createTeam(data);
    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    console.error("创建团队时出错:", error);
    return NextResponse.json({ error: "无法创建团队" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const teamId = data.id;
    delete data.id;

    const team = await updateTeam(teamId, data);
    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    console.error("更新团队时出错:", error);
    return NextResponse.json({ error: "无法更新团队" }, { status: 500 });
  }
}