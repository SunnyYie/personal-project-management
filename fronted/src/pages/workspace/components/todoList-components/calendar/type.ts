import { EventInput } from "@fullcalendar/core/index.js";
import { Dayjs } from "dayjs";

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

export type CalendarEventFormFieldType = Pick<
  EventInput,
  "title" | "allDay" | "color"
> & {
  id: string;
  description?: string;
  start?: Dayjs;
  end?: Dayjs;
};

export type CalendarFormType = {
  id: string;
  title: string;
  description?: string;
};
