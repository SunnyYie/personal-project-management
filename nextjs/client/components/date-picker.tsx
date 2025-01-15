"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface DatePickerProps {
  value?: Dayjs;
  onChange?: (date: Dayjs) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {value ? format(value.toDate(), "PPP") : <span>请选择日期</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* <Calendar
          mode="single"
          selected={value ? value.toDate() : undefined}
          onSelect={(date) => onChange && onChange(dayjs(date))}
        /> */}
        <DayPicker
          mode="single"
          selected={value ? value.toDate() : undefined}
          onSelect={(date) => onChange && onChange(dayjs(date))}
          classNames={{
            today: `border-amber-500`, // Add a border to today's date
            selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
            root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
            chevron: `${defaultClassNames.chevron} fill-amber-500`, // Change the color of the chevron
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
