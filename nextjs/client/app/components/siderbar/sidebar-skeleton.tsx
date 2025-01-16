import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarSkeleton() {
  return (
    <SidebarContent>
      {[1, 2, 3].map((group) => (
        <SidebarGroup key={group}>
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-[100px]" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[1, 2, 3].map((item) => (
                <SidebarMenuItem key={item}>
                  <Skeleton className="h-8 w-full" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
