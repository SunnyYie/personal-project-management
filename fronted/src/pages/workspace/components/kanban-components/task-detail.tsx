import styled from "styled-components";
import dayjs from "dayjs";
import { Task } from "./type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DatePicker from "@/components/date-picker";
import { Image } from "@/components/ui/image";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpWideNarrow } from "lucide-react";
import { RadioButtonGroup } from "@/components/ui/radio-button-group";

type Props = {
  task: Task;
};
export default function TaskDetail({ task }: Props) {
  const {
    title,
    reporter,
    assignee = [],
    tags = [],
    date,
    priority,
    description,
    attachments,
    comments = [],
  } = task;

  return (
    <>
      <Container>
        <div className="item">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {title}
          </h4>
        </div>
        <div className="item">
          <div className="label">Reporter</div>
          <Avatar>
            <AvatarImage src={reporter} width={40} />
            <AvatarFallback>{reporter[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="item">
          <div className="label">Assignee</div>

          <div className="flex flex-row gap-2">
            {assignee.map((item, index) => (
              <Avatar key={index}>
                <AvatarImage src={item} width={40} />
                <AvatarFallback>{item[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <div className="item">
          <div className="label">Tag</div>
          <div className="flex flex-row flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} className="bg-blue-500">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="item">
          <div className="label">Due Date</div>
          <DatePicker value={dayjs(date)} />
        </div>

        <div className="item">
          <div className="label">Priority</div>
          <div>
            <RadioButtonGroup
              name="color"
              defaultValue={priority}
              className="flex flex-wrap gap-2"
              options={[
                {
                  value: "High",
                  label: <span>High</span>,
                  icon: <ArrowUpWideNarrow color="#e3ab4a" size={20} />,
                  className:
                    " data-[state=checked]:bg-red-500 data-[state=checked]:text-white",
                },
                {
                  value: "Medium",
                  label: <span>Medium</span>,
                  icon: (
                    <ArrowUpWideNarrow
                      color="#6abf69"
                      size={20}
                      className="rotate-90"
                    />
                  ),
                  className:
                    "data-[state=checked]:bg-green-500 data-[state=checked]:text-white",
                },
                {
                  value: "Low",
                  label: <span>Low</span>,
                  icon: (
                    <ArrowUpWideNarrow
                      color="#5a8de3"
                      size={20}
                      className="rotate-180"
                    />
                  ),
                  className:
                    "data-[state=checked]:bg-blue-500 data-[state=checked]:text-white",
                },
              ]}
            />
          </div>
        </div>

        <div className="item">
          <div className="label">Description</div>
          <Textarea defaultValue={description} rows={4} />
        </div>

        <div className="item">
          <div className="label">Attachments</div>
          <div className="flex flex-row flex-wrap gap-2">
            {attachments?.map((item) => (
              <Image
                key={item}
                src={item}
                alt=""
                width={62}
                height={62}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      </Container>
      {/* comments */}
      <div
        className="flex flex-col gap-4"
        style={{
          padding: "24px 20px 40px",
        }}
      >
        {comments?.map(({ avatar, username, content, time }) => (
          <div key={username} className="flex gap-4">
            <Avatar className="flex-shrink-0">
              <AvatarImage src={avatar} width={40} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-grow flex-col flex-wrap gap-1 text-gray">
              <div className="flex justify-between">
                <span>{username}</span>
                <span>{dayjs(time).format("DD/MM/YYYY HH:mm")}</span>
              </div>
              <p>{content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 20px 40px;
  .item {
    display: flex;
    align-items: center;
  }
  .label {
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    width: 100px;
    flex-shrink: 0;
    color: rgb(99, 115, 129);
    height: 40px;
    line-height: 40px;
  }
`;
