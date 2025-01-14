import KanbanBoard from "@/components/tasks-kanban/kanban-board";
import { TaskWithRelations } from "@/actions/types";

interface TaskListProps {
  tasks?: TaskWithRelations[];
}

export function TaskList({ tasks }: TaskListProps) {
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
