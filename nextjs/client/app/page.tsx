"use client";

import { LayoutBreadcrumb } from "./components/header/components/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/siderbar";
import { Role, UserResource } from "@/types/user.type";
import DashbBoard from "./dashboard/page";
import Header from "./components/header";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import useStore from "@/store";

export default function Home() {
  const setUserInfo = useStore((state) => state.setUserInfo);
  const userInfo = useStore((state) => state.userInfo);
  const { user } = useUser();

  const getUserInfo = async (email: string) => {
    const response = await fetch(`/api/user?email=${email}`);

    // 如果没找到用户，就创建一个

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const userInfo = await response.json();
    if (userInfo.email !== `sxc${user?.emailAddresses[0].emailAddress}`) {
      createUserInfo(user!);
    }
  };

  const createUserInfo = async (user: UserResource) => {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: user.fullName,
        email: `xxc${user.emailAddresses[0].emailAddress}`,
        avatar: user.imageUrl,
        password: "123456",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        cognitoId: `cognitoId_${user.id}`,
        teamId: "team_test003",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to operate project");
    }

    const newUser = await response.json();
    console.log("newUser", newUser, user);

    setUserInfo({ ...newUser, ...user });
  };

  useEffect(() => {
    if (user) {
      getUserInfo(`sxc${user.emailAddresses[0].emailAddress}`);
    }
  }, [user]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <Header />
        <LayoutBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DashbBoard />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
