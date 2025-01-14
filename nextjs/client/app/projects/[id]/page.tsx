import { ProjectTabs } from "./components/project-tabs";
import { ArrowLeft } from "lucide-react";

import { getTasksByProjectId } from "@/actions/task";
import { getProjectById } from "@/actions/project";
import Link from "next/link";

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = await params;
  let tasks;

  const {
    data: { body: project },
  } = await getProjectById(searchParams.id);

  if (project) {
    const {
      data: { body: tasksData },
    } = await getTasksByProjectId(project.id);
    tasks = tasksData;
  }

  return (
    <>
      {project ? (
        <div className="container mx-auto p-4">
          <Link href="/projects" className="text-blue-600">
            <ArrowLeft className="-mt-1 mr-1 inline-block h-4 w-4" />
            返回项目列表
          </Link>
          <h1 className="my-4 text-2xl font-bold">{project.name}</h1>

          <ProjectTabs project={project} tasks={tasks} />
        </div>
      ) : (
        <div>项目不存在</div>
      )}
    </>
  );
}
