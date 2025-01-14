import KanbanBoard from "@/components/tasks-kanban/kanban-board";
import { TaskWithRelations } from "@/actions/types";

interface TaskKanBanProps {
  tasks?: TaskWithRelations[];
}

export function TaskKanBan({ tasks }: TaskKanBanProps) {
  return (
    <>
      {tasks && tasks?.length > 0 ? (
        <KanbanBoard initialTasks={tasks} />
      ) : (
        <div>暂无任务</div>
      )}
    </>
  );
}
