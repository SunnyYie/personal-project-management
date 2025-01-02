import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project, ProjectStatus } from "../project.type";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Partial<Project>) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<Project>>(
    project || {
      name: "",
      status: "Not Started",
      progress: 0,
      description: "",
      startDate: "",
      endDate: "",
      link: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: ProjectStatus) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Project Name"
        required
      />
      <Select value={formData.status} onValueChange={handleStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Not Started">Not Started</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="On Hold">On Hold</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="progress"
        type="number"
        value={formData.progress}
        onChange={handleChange}
        placeholder="Progress (%)"
        min="0"
        max="100"
        required
      />
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Project Description"
        required
      />
      <Input
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <Input
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <Input
        name="link"
        value={formData.link}
        onChange={handleChange}
        placeholder="Project Link"
        required
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {project ? "Update Project" : "Add Project"}
        </Button>
      </div>
    </form>
  );
}
