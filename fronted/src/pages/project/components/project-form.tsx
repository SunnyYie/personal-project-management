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
import { Member, Project, ProjectStatus } from "../types/project.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from "lucide-react";

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
      framework: "",
      budget: 0,
      client: "",
      members: [],
      documents: [],
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

  const handleMemberAdd = () => {
    setFormData((prev) => ({
      ...prev,
      members: [
        ...(prev.members || []),
        {
          id: Date.now().toString(),
          name: "",
          email: "",
          role: "",
          avatar: "",
        },
      ],
    }));
  };

  const handleMemberChange = (
    index: number,
    field: keyof Member,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members?.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  };

  const handleMemberRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members?.filter((_, i) => i !== index),
    }));
  };

  const handleDocumentAdd = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [
        ...(prev.documents || []),
        { id: Date.now().toString(), name: "", url: "", type: "other" },
      ],
    }));
  };

  const handleDocumentChange = (
    index: number,
    field: keyof Document,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents?.map((doc, i) =>
        i === index ? { ...doc, [field]: value } : doc
      ),
    }));
  };

  const handleDocumentRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Project Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress">Progress (%)</Label>
                <Input
                  id="progress"
                  name="progress"
                  type="number"
                  value={formData.progress}
                  onChange={handleChange}
                  placeholder="Progress (%)"
                  min="0"
                  max="100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Project Description"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Project Link</Label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Project Link"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Input
                  id="framework"
                  name="framework"
                  value={formData.framework}
                  onChange={handleChange}
                  placeholder="Framework"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Budget"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Client"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.members?.map((member, index) => (
                <div key={member.id} className="flex items-center space-x-2">
                  <Input
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Role"
                    value={member.role}
                    onChange={(e) =>
                      handleMemberChange(index, "role", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMemberRemove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleMemberAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.documents?.map((doc, index) => (
                <div key={doc.id} className="flex items-center space-x-2">
                  <Input
                    placeholder="Document Name"
                    value={doc.name}
                    onChange={(e) =>
                      handleDocumentChange(
                        index,
                        "name" as keyof Document,
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Document URL"
                    value={doc.url}
                    onChange={(e) =>
                      handleDocumentChange(
                        index,
                        "url" as keyof Document,
                        e.target.value
                      )
                    }
                  />
                  <Select
                    value={doc.type}
                    onValueChange={(value) =>
                      handleDocumentChange(
                        index,
                        "type" as keyof Document,
                        value
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="doc">Document</SelectItem>
                      <SelectItem value="sheet">Spreadsheet</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDocumentRemove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleDocumentAdd}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
