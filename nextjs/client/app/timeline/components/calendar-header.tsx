"use client";

import {
  Calendar1,
  CalendarDays,
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { ReactNode, useMemo } from "react";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type HandleMoveArg = "next" | "prev" | "today";
export type ViewType =
  | "dayGridMonth"
  | "timeGridWeek"
  | "timeGridDay"
  | "listWeek";
type ViewTypeMenu = {
  key: string;
  label: string;
  view: ViewType;
  icon: ReactNode;
};

type Props = {
  now: Date;
  view: ViewType;
  onMove: (action: HandleMoveArg) => void;
  onCreate: VoidFunction;
  onViewTypeChange: (view: ViewType) => void;
};
export default function CalendarHeader({
  now,
  view,
  onMove,
  onCreate,
  onViewTypeChange,
}: Props) {
  const items = useMemo<ViewTypeMenu[]>(
    () => [
      {
        key: "1",
        label: "Month",
        view: "dayGridMonth",
        icon: <CalendarDays />,
      },
      {
        key: "2",
        label: "Week",
        view: "timeGridWeek",
        icon: <CalendarRange />,
      },
      {
        key: "3",
        label: "Day",
        view: "timeGridDay",
        icon: <Calendar1 />,
      },
      {
        key: "4",
        label: "List",
        view: "listWeek",
        icon: <LayoutList />,
      },
    ],
    [],
  );

  const handleMenuClick = (key: string) => {
    const selectedViewType = items.find((item) => item.key === key)!;
    onViewTypeChange(selectedViewType.view);
  };

  const viewTypeMenu = (view: ViewType) => {
    const { icon, label } = items.find((item) => item.view === view)!;
    return (
      <div className="flex items-center">
        {icon}
        <span className="mx-1 !text-sm font-medium">{label}</span>
        <ChevronDown />
      </div>
    );
  };

  return (
    <div className="relative flex items-center justify-between py-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {viewTypeMenu(view)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[130px]">
          {items.map((item) => (
            <DropdownMenuItem
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="mx-1 !text-sm">{item.label}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex cursor-pointer items-center justify-center">
        <Button size="icon" variant="ghost" asChild>
          <ChevronLeft onClick={() => onMove("prev")} />
        </Button>
        <span className="mx-2 text-base font-bold">
          {dayjs(now).format("DD MMM YYYY")}
        </span>
        <Button size="icon" variant="ghost" asChild>
          <ChevronRight onClick={() => onMove("next")} />
        </Button>
      </div>

      <div className="flex items-center">
        <Button onClick={() => onMove("today")}>Today</Button>
        <Button className="ml-2" onClick={() => onCreate()}>
          <div className="flex items-center">
            <Plus />
            New Event
          </div>
        </Button>
      </div>
    </div>
  );
}
