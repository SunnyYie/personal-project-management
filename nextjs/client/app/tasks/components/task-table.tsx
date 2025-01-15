"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { taskStatuses } from "@/types/task.types";
import { useState } from "react";

import PriorityTag from "@/components/tasks-kanban/priority-tag";
import { TaskWithRelations } from "@/actions/types";
import { CreateTaskDialog } from "./task-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TaskTableProps {
  initialTasks?: TaskWithRelations[];
  totalCount?: number;
  initialPage: number;
  pageSize: number;
  projects: { id: string; name: string }[];
  users: { id: string; name: string }[];
}

export default function TaskTable({
  initialTasks,
  totalCount,
  initialPage,
  pageSize,
  projects,
  users,
}: TaskTableProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil((totalCount || 10) / pageSize);

  const handleSearch = (query: string) => {
    router.push(`/tasks?query=${encodeURIComponent(query)}&page=1`);
  };

  const handleProjectChange = (projectId: string) => {
    if (projectId === "all") {
      router.push(`/tasks`);
    }
    router.push(`/tasks?projectId=${projectId}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const query = searchParams.get("query") || "";
    router.push(`/tasks?query=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const handleTaskCreated = () => {
    setIsCreateDialogOpen(false);
    router.push("/tasks");
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("query") || ""}
            className="max-w-sm"
          />
          <Select
            onValueChange={handleProjectChange}
            defaultValue={searchParams.get("projectId") || ""}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="请选择项目" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部项目</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>创建任务</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>任务名</TableHead>
            <TableHead>任务描述</TableHead>
            <TableHead>任务状态</TableHead>
            <TableHead>任务优先级</TableHead>
            <TableHead>任务标签</TableHead>
            <TableHead>开始时间</TableHead>
            <TableHead>持续时间</TableHead>
            <TableHead>任务创建人</TableHead>
            <TableHead>任务分配人</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialTasks?.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="mr-1"
                  style={{
                    backgroundColor: taskStatuses.find(
                      (item) => item.key == task.status,
                    )?.color,
                  }}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                <PriorityTag priority={task.priority!} />
              </TableCell>
              <TableCell>
                {task.tags?.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary" className="mr-1">
                    {tag.trim()}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                {task.startDate
                  ? new Date(task.startDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>{task?.author?.name}</TableCell>
              <TableCell>{task.assignee?.name ?? "Unassigned"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => handlePageChange(pageNum)}
                  isActive={pageNum === page}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <CreateTaskDialog
        projects={projects}
        users={users}
        isOpen={isCreateDialogOpen}
        onClose={handleTaskCreated}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}
