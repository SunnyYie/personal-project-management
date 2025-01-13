import { getProjectsByPage } from "@/actions/project";
import ProjectTable from "./components/project-table";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams.query || "";
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;

  const {
    data: { body: projects, totalCount },
  } = await getProjectsByPage(page, pageSize, query);

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Projects</h1>
      <ProjectTable
        initialProjects={projects}
        totalCount={totalCount}
        initialPage={page}
        pageSize={pageSize}
      />
    </div>
  );
}
