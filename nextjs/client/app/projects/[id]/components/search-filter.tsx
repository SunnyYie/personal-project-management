"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SearchAndFilter() {
  const [search, setSearch] = useState("");

  return (
    <Input
      placeholder="搜索任务..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-grow"
    />
  );
}
