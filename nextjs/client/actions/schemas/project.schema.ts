import * as z from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(1, "请填写项目名称"),
  description: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
