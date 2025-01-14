import { Attachment, Comment, Task, User } from "@prisma/client";

export type ResponseType<T> = {
  status: number;
  data: {
    body: T;
    totalCount?: number;
  };
  error?: string;
  message?: string;
};

export type TaskWithRelations = Task & {
  comments: Comment[];
  assignee: User | null;
  author: User | null;
  attachments: Attachment[];
};
