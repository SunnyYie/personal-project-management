import { ThemeMode } from "../todoList-components/calendar/type";
import { memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Task, TaskPriority } from "./type";
import {
  ArrowUpWideNarrow,
  EllipsisVertical,
  MessageCircleMore,
  Paperclip,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import TaskDetail from "./task-detail";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SELECTLIST = [
  { value: "To do", label: "To do" },
  { value: "In progress", label: "In progress" },
  { value: "Done", label: "Done" },
];

type Props = {
  index: number;
  task: Task;
};

function KanbanTask({ index, task }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    id,
    title,
    comments = [],
    attachments = [],
    priority,
    assignee,
  } = task;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging}
          $themeMode={ThemeMode.Light}
        >
          <div>
            {attachments.length > 0 && (
              <Image src={attachments[0]} alt="" className="mb-4 rounded-md" />
            )}

            <Drawer onClose={() => setDrawerOpen(false)} open={drawerOpen}>
              <DrawerTrigger
                onClick={() => setDrawerOpen(true)}
                className="w-full"
              >
                <div className="flex justify-end">
                  <TaskPrioritySvg taskPriority={priority} />
                </div>
                <div className="flex mr-auto">{title}</div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-base text-gray-600">
                    <MessageCircleMore className="mr-1" size={16} />
                    <span className="text-xs">{comments.length}</span>

                    <Paperclip className="ml-2 mr-1" size={16} />
                    <span className="text-xs">{attachments.length}</span>
                  </div>

                  {assignee?.length && (
                    <AvatarGroup maxCount={3} size="small">
                      {assignee.map((url) => (
                        <Avatar key={url}>
                          <AvatarImage src={url} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  )}
                </div>
              </DrawerTrigger>

              <DrawerContent>
                <DrawerHeader>
                  <div className="flex items-center justify-between">
                    <DrawerTitle>
                      <Select defaultValue="To do">
                        <SelectTrigger className="w-[80px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SELECTLIST.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </DrawerTitle>
                    <div className="flex text-gray">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp size={20} color="#59e370" />
                      </Button>
                      <Button variant="ghost">
                        <Trash2 size={20} />
                      </Button>
                      <Button variant="ghost">
                        <EllipsisVertical size={20} />
                      </Button>
                    </div>
                  </div>
                </DrawerHeader>

                <TaskDetail task={task} />
              </DrawerContent>
            </Drawer>
          </div>
        </Container>
      )}
    </Draggable>
  );
}

// 在这里使用memo很重要，因为drag column时，不应该重复渲染内部的task
export default memo(KanbanTask);

type TaskPrioritySvgProps = {
  taskPriority: TaskPriority;
};
function TaskPrioritySvg({ taskPriority }: TaskPrioritySvgProps) {
  switch (taskPriority) {
    case TaskPriority.HIGH:
      return <ArrowUpWideNarrow color="#e3ab4a" />;
    case TaskPriority.MEDIUM:
      return <ArrowUpWideNarrow color="#6abf69" className="rotate-90" />;
    case TaskPriority.LOW:
      return <ArrowUpWideNarrow color="#5a8de3" className="rotate-180" />;
    default:
      break;
  }
}

const Container = styled.div<{ $isDragging: boolean; $themeMode: ThemeMode }>`
  width: 248px;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 12px;
  background-color: ${(props) => {
    if (props.$themeMode === ThemeMode.Light) {
      return props.$isDragging
        ? "rgba(255, 255, 255, 0.48)"
        : "rgb(255, 255, 255)";
    }
    return props.$isDragging ? "rgba(22, 28, 36, 0.48)" : "rgb(22, 28, 36)";
  }};
  backdrop-filter: ${(props) => (props.$isDragging ? `blur(6px)` : "")};

  &:hover {
    box-shadow: ${(props) =>
      props.$themeMode === ThemeMode.Light
        ? "rgba(145, 158, 171, 0.16) 0px 20px 40px -4px"
        : "rgba(0, 0, 0, 0.16) 0px 20px 40px -4px"};
  }
`;
