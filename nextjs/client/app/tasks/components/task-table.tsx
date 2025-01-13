"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Edit, Delete } from "lucide-react";
import { Task } from "@prisma/client";
import { format } from "date-fns";
import { useState } from "react";

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

interface TaskTableProps {
  initialTasks?: Task[];
  totalCount?: number;
  initialPage: number;
  pageSize: number;
  projects: { id: string; name: string }[];
}

export default function TaskTable({
  initialTasks,
  totalCount,
  initialPage,
  pageSize,
  projects,
}: TaskTableProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [page, setPage] = useState(initialPage);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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

  const handleTaskCreated = (newTask: Task) => {
    setIsCreateDialogOpen(false);
    router.refresh();
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
            <TableHead>状态</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>持续时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                {task.dueDate
                  ? format(new Date(task.dueDate), "yyyy-MM-dd")
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Edit />
                  编辑
                </Button>
                <Button variant="outline" size="sm">
                  <Delete />
                  删除
                </Button>
              </TableCell>
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
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
}
