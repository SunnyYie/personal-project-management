import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectStatus } from "../types/project.type";

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ProjectStatus | "All";
  onStatusFilterChange: (value: ProjectStatus | "All") => void;
  sortBy: "name" | "status" | "progress";
  onSortChange: (value: "name" | "status" | "progress") => void;
}

export function ProjectFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="md:w-1/4">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Statuses</SelectItem>
          <SelectItem value="Not Started">Not Started</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="On Hold">On Hold</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="md:w-1/4">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="progress">Progress</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:w-1/3"
      />
    </div>
  );
}
