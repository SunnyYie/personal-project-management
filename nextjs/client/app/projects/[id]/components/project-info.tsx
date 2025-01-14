import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@prisma/client";

export function ProjectInfo({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>项目信息</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>ID:</strong> {project.id}
        </p>
        <p>
          <strong>名称:</strong> {project.name}
        </p>
        <p>
          <strong>描述:</strong> {project.description}
        </p>
      </CardContent>
    </Card>
  );
}
