"use client";

import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";
//  fullcalendar plugins
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
// fullcalendar types and components
import CalendarHeader, { HandleMoveArg, ViewType } from "./calendar-header";
import { CalendarEventFormFieldType, ThemeMode } from "./type";
import CalendarEventForm from "./calendar-event-form";
import { INITIAL_EVENTS } from "./event-utils";
import CalendarEvent from "./calendar-event";

import { useLayoutEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import { Card } from "@/components/ui/card";
import { StyledCalendar } from "./styles";

const DefaultEventInitValue = {
  id: Math.random().toString().slice(2, 8),
  title: "",
  description: "",
  allDay: false,
  start: dayjs(),
  end: dayjs(),
  color: "",
};

export default function Calendar() {
  const fullCalendarRef = useRef<FullCalendar>(null);

  // 控制日历事件表单的显示
  const [eventFormType, setEventFormType] = useState<"add" | "edit">("add");
  const [open, setOpen] = useState(false);
  // 日历事件表单的值
  const [eventInitValue, setEventInitValue] =
    useState<CalendarEventFormFieldType>(DefaultEventInitValue);
  // 切换日历视图
  const [view, setView] = useState<ViewType>("dayGridMonth");
  // 当前日期
  const [date, setDate] = useState(new Date());
  /**
   * 切换日历视图
   */
  const handleMove = (action: HandleMoveArg) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    switch (action) {
      case "prev":
        calendarApi.prev();
        break;
      case "next":
        calendarApi.next();
        break;
      case "today":
        calendarApi.today();
        break;
      default:
        break;
    }
    setDate(calendarApi.getDate());
  };
  const handleViewTypeChange = (view: ViewType) => {
    setView(view);
  };

  useLayoutEffect(() => {
    const calendarApi = fullCalendarRef.current!.getApi();
    setTimeout(() => {
      calendarApi.changeView(view);
    });
  }, [view]);

  /**
   * 日期选择事件
   */
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setOpen(true);
    setEventFormType("add");
    setEventInitValue({
      id: Math.random().toString().slice(2, 8),
      title: "",
      description: "",
      start: dayjs(selectInfo.startStr),
      end: dayjs(selectInfo.endStr),
      allDay: selectInfo.allDay,
    });
  };

  /**
   * 点击日历中预定任务的事件
   */
  const handleEventClick = (arg: EventClickArg) => {
    const { title, extendedProps, allDay, start, end, backgroundColor, id } =
      arg.event;
    setOpen(true);
    setEventFormType("edit");
    const newEventValue: CalendarEventFormFieldType = {
      id,
      title,
      allDay,
      color: backgroundColor,
      description: extendedProps.description,
    };
    if (start) {
      newEventValue.start = dayjs(start);
    }

    if (end) {
      newEventValue.end = dayjs(end);
    }
    setEventInitValue(newEventValue);
  };
  // 表单的相关操作
  const handleCancel = () => {
    setEventInitValue(DefaultEventInitValue);
    setOpen(false);
  };

  const handleEdit = (values: CalendarEventFormFieldType) => {
    const {
      id,
      title = "",
      description,
      start,
      end,
      allDay = false,
      color,
    } = values;
    const calendarApi = fullCalendarRef.current!.getApi();
    const oldEvent = calendarApi.getEventById(id);

    const newEvent: EventInput = {
      id,
      title,
      allDay,
      color,
      extendedProps: {
        description,
      },
    };
    if (start) newEvent.start = start.toDate();
    if (end) newEvent.end = end.toDate();

    // 刷新日历显示
    oldEvent?.remove();
    calendarApi.addEvent(newEvent);
  };

  const handleCreate = (values: CalendarEventFormFieldType) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    const {
      title = "",
      description,
      start,
      end,
      allDay = false,
      color,
    } = values;

    const newEvent: EventInput = {
      id: Math.random().toString().slice(2, 8),
      title,
      allDay,
      color,
      extendedProps: {
        description,
      },
    };
    if (start) newEvent.start = start.toDate();
    if (end) newEvent.end = end.toDate();

    // 刷新日历显示
    calendarApi.addEvent(newEvent);
  };

  const handleDelete = (id: string) => {
    const calendarApi = fullCalendarRef.current!.getApi();
    const oldEvent = calendarApi.getEventById(id);
    oldEvent?.remove();
  };

  return (
    <Card className="h-[80vh] w-full">
      <div className="h-full w-full">
        <StyledCalendar $themeMode={ThemeMode.Light}>
          <CalendarHeader
            now={date}
            view={view}
            onMove={handleMove}
            onCreate={() => setOpen(true)}
            onViewTypeChange={handleViewTypeChange}
          />
          <FullCalendar
            ref={fullCalendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialDate={date}
            initialView={view}
            events={INITIAL_EVENTS}
            eventContent={CalendarEvent}
            editable
            selectable
            selectMirror
            dayMaxEvents
            headerToolbar={false}
            select={handleDateSelect}
            eventClick={handleEventClick}
          />
        </StyledCalendar>
      </div>

      <CalendarEventForm
        open={open}
        type={eventFormType}
        initValues={eventInitValue}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onEdit={handleEdit}
      />
    </Card>
  );
}
