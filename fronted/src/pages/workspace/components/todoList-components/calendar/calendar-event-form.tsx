import { CalendarEventFormFieldType, CalendarFormType } from "./type";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import DatePicker from "@/components/date-picker";
import { ColorPicker } from "@/components/color-picker/color-picker";
import { Dayjs } from "dayjs";

type Props = {
  type: "edit" | "add";
  open: boolean;
  onCancel: VoidFunction;
  onEdit: (event: CalendarEventFormFieldType) => void;
  onCreate: (event: CalendarEventFormFieldType) => void;
  onDelete: (id: string) => void;
  initValues: CalendarEventFormFieldType;
};

const COLORS = [
  "#00a76f",
  "#8e33ff",
  "#00b8d9",
  "#003768",
  "#22c55e",
  "#ffab00",
  "#ff5630",
  "#7a0916",
];

export default function CalendarEventForm({
  type,
  open,
  onCancel,
  initValues = { id: faker.string.uuid() },
  onEdit,
  onCreate,
  onDelete,
}: Props) {
  const { register, handleSubmit, setValue } = useForm<CalendarFormType>();
  const title = type === "add" ? "Add Event" : "Edit Event";

  const [checked, setChecked] = useState(true);
  const [start, setStart] = useState<Dayjs | undefined>();
  const [end, setEnd] = useState<Dayjs | undefined>();
  const [color, setColor] = useState<string | undefined>();

  const handleCheckedChange = (val: boolean) => {
    setChecked(val);
  };

  const onSubmit = (data: CalendarFormType) => {
    const { id } = initValues;
    const event = { ...data, id, color, start, end, allDay: checked };

    if (type === "add") onCreate(event);
    if (type === "edit") onEdit(event);

    onCancel();
  };

  useEffect(() => {
    // 当 initValues 改变时，手动更新表单的值
    (Object.keys(initValues) as (keyof CalendarFormType)[]).forEach((key) => {
      setValue(key, initValues[key]);
    });
    setStart(initValues.start);
    setEnd(initValues.end);
    setColor(initValues.color || COLORS[0]);
    setChecked(initValues.allDay ? initValues.allDay : false);
  }, [initValues, setValue]);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">事件名</Label>
              <Input
                id="title"
                placeholder="请输入事件名"
                {...register("title")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">事件颜色</Label>
              <ColorPicker value={color} onChange={setColor} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              placeholder="请输入描述"
              {...register("description")}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="allDay"
              checked={checked}
              onCheckedChange={handleCheckedChange}
            />
            <Label htmlFor="allDay">全天</Label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start">开始时间</Label>
              <DatePicker value={start} onChange={setStart} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">结束时间</Label>
              <DatePicker value={end} onChange={setEnd} />
            </div>
          </div>

          <DialogFooter className="mt-6 space-x-2">
            {type === "edit" && (
              <Button
                onClick={() => {
                  onDelete(initValues.id);
                  onCancel();
                }}
                variant="destructive"
                className="mr-auto"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                删除
              </Button>
            )}
            <Button onClick={onCancel} variant="outline">
              取消
            </Button>
            <Button type="submit">确认</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
