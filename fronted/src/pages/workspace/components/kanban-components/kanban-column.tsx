import { Input } from "@/components/ui/input";
import { faker } from "@faker-js/faker";
import { CSSProperties, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useEvent } from "react-use";
import KanbanTask from "./kanban-task";
import { Column, Task, TaskPriority, DragType } from "./type";
import { Button } from "@/components/ui/button";
import { Ellipsis, Eraser, Pencil, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  index: number;
  column: Column;
  tasks: Task[];
  createTask: (columnId: string, task: Task) => void;
  clearColumn: (columnId: string) => void;
  deleteColumn: (columnId: string) => void;
  renameColumn: (column: Column) => void;
};

export default function KanbanColumn({
  index,
  column,
  tasks,
  createTask,
  clearColumn,
  deleteColumn,
  renameColumn,
}: Props) {
  const style: CSSProperties = {
    height: "100%",
    padding: "16px",
    borderRadius: "16px",
    backgroundColor: "rgb(244, 246, 248)",
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          className="flex items-center text-gray"
          onClick={() => {
            setRenamingTask(true);
          }}
        >
          <Pencil />
          <span className="ml-2">rename</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="flex items-center text-gray"
          onClick={() => clearColumn(column.id)}
        >
          <Eraser />
          <span className="ml-2">clear</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="flex items-center text-warning"
          onClick={() => deleteColumn(column.id)}
        >
          <Trash2 />
          <span className="ml-2">delete</span>
        </div>
      ),
    },
  ];

  const [addingTask, setAddingTask] = useState(false);
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      addTaskInputRef.current &&
      !addTaskInputRef.current.contains(event.target as Node)
    ) {
      const addTaskInputVal = addTaskInputRef.current.value;
      if (addTaskInputVal) {
        createTask(column.id, {
          id: faker.string.uuid(),
          title: addTaskInputVal,
          reporter: faker.image.avatarGitHub(),
          priority: faker.helpers.enumValue(TaskPriority),
        });
      }
      setAddingTask(false);
    }

    if (
      renameTaskInputRef.current &&
      !renameTaskInputRef.current.contains(event.target as Node)
    ) {
      const renameInputVal = renameTaskInputRef.current.value;
      if (renameInputVal) {
        renameColumn({
          ...column,
          title: renameInputVal,
        });
      }
      setRenamingTask(false);
    }
  };
  useEvent("click", handleClickOutside);

  const [renamingTask, setRenamingTask] = useState(false);
  const renameTaskInputRef = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuItemClick = (e: any) => {
    setDropdownOpen(false);
    e.stopPropagation();
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <div style={style}>
            <header
              {...provided.dragHandleProps}
              className="mb-4 flex select-none items-center justify-between text-base font-semibold"
            >
              {renamingTask ? (
                <Input ref={renameTaskInputRef} autoFocus />
              ) : (
                column.title
              )}
              <DropdownMenu
                open={dropdownOpen}
                onOpenChange={(flag) => setDropdownOpen(flag)}
              >
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="!text-gray">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuGroup>
                  {items.map((item) => (
                    <DropdownMenuItem
                      key={item.key}
                      onClick={handleMenuItemClick}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenu>
            </header>

            <Droppable droppableId={column.id} type={DragType.TASK}>
              {(provided) => (
                <main
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[10px]"
                >
                  {tasks.map((task, index) => (
                    <KanbanTask task={task} key={task.id} index={index} />
                  ))}
                  {provided.placeholder}
                </main>
              )}
            </Droppable>

            <footer className="w-[248px]">
              {addingTask ? (
                <Input
                  ref={addTaskInputRef}
                  placeholder="Task Name"
                  autoFocus
                />
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddingTask(true);
                  }}
                  className="!flex items-center justify-center !text-xs !font-medium"
                  size="lg"
                  variant="ghost"
                >
                  <Plus />
                  <span>Add Task</span>
                </Button>
              )}
            </footer>
          </div>
        </div>
      )}
    </Draggable>
  );
}
