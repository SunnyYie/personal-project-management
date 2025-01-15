import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUser } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userEmail = req.url?.split("=")[1] as string;

    if (!userEmail) {
      return NextResponse.json(
        { error: "user ID is required" },
        { status: 400 },
      );
    }

    const {
      data: { body: user },
    } = await getUser(userEmail);

    if (!user) {
      return NextResponse.json(
        { error: "No projects found for this team" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  console.log("data", request);
  try {
    const data = await request.json();

    const user = await createUser(data);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("创建用户时出错:", error);
    return NextResponse.json({ error: "无法创建用户" }, { status: 500 });
  }
}
