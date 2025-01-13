"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "@prisma/client";
import { useState } from "react";
import { format } from "date-fns";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateProjectDialog from "./project-dialog";
import { Delete, Edit } from "lucide-react";

type ProjectWithRelations = Project & {
  tasks?: { id: string }[];
  projectTeams?: { id: string }[];
};

interface ProjectTableProps {
  initialProjects?: ProjectWithRelations[];
  totalCount?: number;
  initialPage: number;
  pageSize: number;
}

export default function ProjectTable({
  initialProjects,
  totalCount,
  initialPage,
  pageSize,
}: ProjectTableProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [isOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(initialPage);
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil((totalCount || 10) / pageSize);

  const handleSearch = (query: string) => {
    router.push(`/projects?query=${encodeURIComponent(query)}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const query = searchParams.get("query") || "";
    router.push(`/projects?query=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const handleProjectCreated = (newProject: ProjectWithRelations) => {
    setIsDialogOpen(false);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Input
          type="text"
          placeholder="Search projects..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query") || ""}
          className="max-w-sm"
        />
        <Button onClick={() => setIsDialogOpen(true)}>创建项目</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>项目名称</TableHead>
            <TableHead>项目描述</TableHead>
            <TableHead>开始时间</TableHead>
            <TableHead>结束时间</TableHead>
            <TableHead>关联任务</TableHead>
            <TableHead>关联团队</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>
                {project.startDate
                  ? format(new Date(project.startDate), "yyyy-MM-dd")
                  : "N/A"}
              </TableCell>
              <TableCell>
                {project.endDate
                  ? format(new Date(project.endDate), "yyyy-MM-dd")
                  : "N/A"}
              </TableCell>
              <TableCell>{project?.tasks && project.tasks.length}</TableCell>
              <TableCell>
                {project?.projectTeams && project.projectTeams.length}
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
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              //   disabled={page === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages || 10 }, (_, i) => i + 1).map(
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
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              //   disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <CreateProjectDialog
        isOpen={isOpen}
        onClose={() => setIsDialogOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}
