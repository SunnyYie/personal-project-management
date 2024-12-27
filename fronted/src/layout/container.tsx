import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Outlet, useNavigate } from "react-router";
import { useUserAuthStore } from "@/store/user";
import Header from "./header/header";
import { useEffect } from "react";
import Sidebar from "./siderbar";

export default function MainLayout() {
  const user = useUserAuthStore((state) => state.user);
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
