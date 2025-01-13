"use client";

import { TaskFormData, taskFormSchema } from "@/actions/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/date-picker";
import { Dayjs } from "dayjs";
import { Label } from "@/components/ui/label";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: any) => void;

  projects: { id: string; name: string }[];
}

export function CreateTaskDialog({
  isOpen,
  onClose,
  onTaskCreated,
  projects,
}: CreateTaskDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [start, setStart] = useState<Dayjs>();
  const [dueDate, setDueDate] = useState<Dayjs>();
  const [end, setEnd] = useState<Dayjs>();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      tags: "",
      points: undefined,
      projectId: "",
      assignedUserId: "",
    },
  });
  const { errors } = form.formState;

  const handleClose = () => {
    form.reset();
    setStart(undefined);
    setDueDate(undefined);
    setEnd(undefined);

    onClose();
  };

  const onSubmit = async (data: TaskFormData) => {
    console.log(data, "data");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          // todo:传入真实的authorUserId
          authorUserId: "1111",
          startDate: start?.toDate().toISOString(),
          dueDate: dueDate?.toDate().toISOString(),
          endDate: end?.toDate().toISOString(),
        }),
      });

      console.log(response, "response");

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const newProject = await response.json();
      onTaskCreated(newProject);
      form.reset();
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className="h-[80vh] overflow-y-auto sm:max-w-[600px]"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle>创建新任务</DialogTitle>
        </DialogHeader>
        <div id="dialog-description">
          <p>请填写以下表单以创建新任务。</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>任务名</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {errors.title && (
                    <FormMessage>{errors.title.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  {errors.description && (
                    <FormMessage>{errors.description.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <FormMessage>{errors.status.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.priority && (
                    <FormMessage>{errors.priority.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标签</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter tags separated by commas"
                    />
                  </FormControl>
                  {errors.tags && (
                    <FormMessage>{errors.tags.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start">开始时间</Label>
                <DatePicker value={start} onChange={setStart} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">持续时间</Label>
                <DatePicker value={dueDate} onChange={setDueDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">结束时间</Label>
                <DatePicker value={end} onChange={setEnd} />
              </div>
            </div>

            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  {errors.points && (
                    <FormMessage>{errors.points.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>项目</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectId && (
                    <FormMessage>{errors.projectId.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignedUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* TODO: Fetch and populate users */}
                      <SelectItem value="user1">User 1</SelectItem>
                      <SelectItem value="user2">User 2</SelectItem>
                      <SelectItem value="user3">User 3</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.assignedUserId && (
                    <FormMessage>{errors.assignedUserId.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                创建任务
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
