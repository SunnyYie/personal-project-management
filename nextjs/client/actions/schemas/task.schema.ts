import * as z from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  tags: z.string().optional(),
  points: z.number().int().positive().optional(),
  projectId: z.string().min(1, "Project is required"),
  assignedUserId: z.string().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  tags: z.string().optional(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  endDate: z.string().optional(),
  points: z.number().int().positive().optional(),
  projectId: z.string().min(1, "Project is required"),
  assignedUserId: z.string().optional(),
  authorUserId: z.string(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
export type TaskData = z.infer<typeof taskSchema>;
