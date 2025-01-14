"use client";

import { taskPriorities } from "@/types/task.types";

export default function PriorityTag({ priority }: { priority: string }) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-bold text-white ${taskPriorities.find((item) => item.key == priority.toLowerCase())?.color}`}
    >
      {priority}
    </span>
  );
}
