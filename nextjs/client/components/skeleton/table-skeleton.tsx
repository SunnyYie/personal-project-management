"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: TableSkeletonProps) {
  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      role="status"
      aria-label="Loading table data"
    >
      <div className="animate-pulse">
        {/* Table Header */}
        <div className="mb-4 flex">
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={`header-${index}`}
              className="mr-2 h-8 flex-1 rounded-md bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="mb-4 flex">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="mr-2 h-6 flex-1 rounded-md bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
