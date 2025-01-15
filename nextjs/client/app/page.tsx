"use client";

import { UserResource } from "@/types/user.type";
import { redirect } from "next/navigation";
import DashbBoard from "./dashboard/page";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import useStore from "@/store";

export default function Home() {
  const setUserInfo = useStore((state) => state.setUserInfo);
  const setProjects = useStore((state) => state.setProjects);
  const setTeams = useStore((state) => state.setTeams);
  const { user } = useUser();

  const checkAndCreateUser = async (email: string) => {
    const response = await fetch(`/api/user?email=${email}`);

    if (!response.ok) {
      // 如果用户不存在，创建用户
      const newUser = await createUserInfo(user!);
      setUserInfo(newUser); // 存储用户信息
      return newUser;
    }

    const existingUser = await response.json();
    setUserInfo(existingUser); // 存储用户信息
    return existingUser;
  };

  const createUserInfo = async (user: UserResource) => {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
        password: "123456",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        cognitoId: `cognitoId_${user.id}`,
        teamId: "",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const newUser = await response.json();
    setUserInfo({ ...newUser, ...user });
    return newUser;
  };

  const fetchTeamsAndProjects = async (user: UserResource) => {
    const teams = await fetch(`/api/teams?userId=${user.id}`).then((res) =>
      res.json(),
    );
    if (teams.length) {
      setTeams(teams);
      const projects = await fetch(`/api/projects?teamId=${teams[0].id}`).then(
        (res) => res.json(),
      );
      setProjects(projects);
    }
  };

  useEffect(() => {
    if (user) {
      checkAndCreateUser(user.emailAddresses[0].emailAddress).then(
        (newUser) => {
          console.log(newUser, "newUser");

          fetchTeamsAndProjects(newUser).then(() => {
            if (!useStore.getState().teams.length) {
              // 如果没有团队，提示用户联系管理员
              redirect("/empty");
            }
          });
        },
      );
    }
  }, [user]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashbBoard />
    </div>
  );
}
