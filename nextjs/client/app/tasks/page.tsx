import { getTasksByPage } from "@/actions/task";
import TaskTable from "./components/task-table";
// import { getProjects } from "@/actions/project";
import { unstable_cache } from "next/cache";
import { getUsers } from "@/actions/user";
import prisma from "@/lib/prisma";

const getProjects = unstable_cache(
  async () => {
    return await prisma.project.findMany();
  },
  ["projects"],
  { revalidate: 3600, tags: ["projects"] },
);

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 10;

  const projects = await getProjects();
  const {
    data: { body: Tasks, totalCount },
  } = await getTasksByPage(page, pageSize);
  const {
    data: { body: users },
  } = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Tasks</h1>
      <TaskTable
        initialTasks={Tasks}
        totalCount={totalCount}
        initialPage={page}
        pageSize={pageSize}
        projects={projects}
        users={users}
      />
    </div>
  );
}
