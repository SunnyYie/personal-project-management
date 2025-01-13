import { getTasksByPage } from "@/actions/task";
import TaskTable from "./components/task-table";
import { getProjects } from "@/actions/project";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 10;

  const {
    data: { body: projects },
  } = await getProjects();
  const {
    data: { body: Tasks, totalCount },
  } = await getTasksByPage(page, pageSize);

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Tasks</h1>
      <TaskTable
        initialTasks={Tasks}
        totalCount={totalCount}
        initialPage={page}
        pageSize={pageSize}
        projects={projects}
      />
    </div>
  );
}
