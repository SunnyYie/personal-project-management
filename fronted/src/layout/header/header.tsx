import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

import useUserAuthStore, { useUserActions } from "@/store/user";

export default function Header() {
  const user = useUserAuthStore((state) => state.userInfo);
  const { clearUserInfoAndToken }: { clearUserInfoAndToken: () => void } =
    useUserActions();

  return (
    <header className="border-b   shadow">
      <div className="flex h-16 items-center px-4 justify-between">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="text-xl font-bold mr-auto">项目管理系统</div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>个人信息</DropdownMenuItem>
              <DropdownMenuItem onClick={() => clearUserInfoAndToken()}>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
