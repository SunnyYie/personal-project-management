import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUserAuthStore } from '@/store/user'
import { ModeToggle } from './components/mode-toggle'

export default function Header() {
  const logout = useUserAuthStore(state => state.logout)
  const user = useUserAuthStore(state => state.user)

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="text-xl font-bold">项目管理系统</div>

        <div className="flex items-center gap-4">
          <ModeToggle />

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
              <DropdownMenuItem onClick={() => logout()}>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
