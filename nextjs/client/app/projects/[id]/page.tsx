import { ProjectTabs } from "./components/project-tabs";
import { ArrowLeft } from "lucide-react";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import Link from "next/link";

// 缓存项目数据
const getProjectById = unstable_cache(
  async (projectId: string) => {
    return await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
  },
  ["projects"],
  { revalidate: 3600, tags: ["projects"] },
);
// 缓存任务数据
const getTasksByProjectId = unstable_cache(
  async (projectId) => {
    return await prisma.task.findMany({
      where: {
        projectId,
      },
      include: {
        comments: true,
        assignee: true,
        author: true,
        attachments: true,
      },
    });
  },
  ["tasks"],
  { revalidate: 3600, tags: ["tasks"] },
);

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = await params;
  let tasks;

  const project = await getProjectById(searchParams.id);

  if (project) {
    const tasksData = await getTasksByProjectId(project.id);
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
