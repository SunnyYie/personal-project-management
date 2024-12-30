import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutBreadcrumb } from "./breadcrumb";
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
    <div className="min-h-screen flex flex-row">
      <SidebarProvider>
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <LayoutBreadcrumb />
          <main className="flex-1 px-4 bg-slate-100">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
