import TeamList from "./components/team-list";
import { getTeams } from "@/actions/team";
import { Suspense } from "react";

export default async function TeamsPage() {
  const {
    data: { body: initialTeams },
  } = await getTeams();

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>加载中...</div>}>
        <TeamList initialTeams={initialTeams} />
      </Suspense>
    </div>
  );
}
