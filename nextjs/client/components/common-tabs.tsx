"use client";

import { Filter, Search, type LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { cn } from "@/lib/utils";
import * as React from "react";

type TabItem = {
  key: string;
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
};

export function CommonTabs({ items, defaultActiveKey, onChange }: TabsProps) {
  const [activeKey, setActiveKey] = React.useState(
    defaultActiveKey || items[0]?.key,
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="flex flex-col justify-between border sm:flex-row">
        <div className="flex overflow-x-auto">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors",
                  activeKey === item.key
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center space-x-2 p-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">过滤</span>
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-1 pl-8 pr-4 sm:w-auto"
            />
          </div>
        </div>
      </div>
      <div className="py-4">
        {items.find((item) => item.key === activeKey)?.children}
      </div>
    </div>
  );
}
