"use client";

import { taskPriorities } from "@/types/task.types";

export default function PriorityTag({ priority }: { priority: string }) {
  const priorityItem = taskPriorities.find(
    (item) => item.key === priority.toLowerCase(),
  );

  if (!priorityItem) {
    console.error(`Invalid priority: ${priority}`);
    return null;
  }

  // 根据优先级设置颜色类
  const colorClasses = {
    low: "bg-green-200 text-green-700",
    medium: "bg-yellow-200 text-yellow-700",
    high: "bg-red-200 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-bold ${colorClasses[priorityItem.key as keyof typeof colorClasses]}`}
    >
      {priorityItem.label}
    </span>
  );
}
