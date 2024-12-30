import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "./header/header";
import Sidebar from "./siderbar";

import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

import useUserAuthStore from "@/store/user";

export default function MainLayout() {
  const user = useUserAuthStore((state) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
