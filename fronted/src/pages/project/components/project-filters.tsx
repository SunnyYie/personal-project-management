import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectStatusEnum } from "../types/project.type";

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ProjectStatusEnum;
  onStatusFilterChange: (value: ProjectStatusEnum) => void;
}

export function ProjectFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="md:w-1/4">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ProjectStatusEnum.All}>全部状态</SelectItem>
          <SelectItem value={ProjectStatusEnum.NotStarted}>未开始</SelectItem>
          <SelectItem value={ProjectStatusEnum.InProgress}>进行中</SelectItem>
          <SelectItem value={ProjectStatusEnum.Completed}>已完成</SelectItem>
          <SelectItem value={ProjectStatusEnum.OnHold}>已暂停</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="搜索项目名"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:w-1/3"
      />
    </div>
  );
}
