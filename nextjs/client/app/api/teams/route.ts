import { getTeamsByUser } from "@/actions/team";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const userId = req.url?.split("=")[1] as string;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const resData = await getTeamsByUser(userId);
    const {
      data: { body: teams },
    } = resData;

    if (!teams.length) {
      return NextResponse.json(
        { error: "No teams found for this user" },
        { status: 404 },
      );
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
