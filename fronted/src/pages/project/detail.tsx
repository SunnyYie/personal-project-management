import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "react-router";
import { projects } from "./utils";

export default function ProjectDetails() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/project/projectList"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; 返回
      </Link>
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-1">Progress</div>
              <Progress value={project.progress} className="mb-2" />
              <div className="text-sm text-muted-foreground">
                {project.progress}% Complete
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Description</div>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Date Range</div>
              <p className="text-sm text-muted-foreground">
                {project.startDate} - {project.endDate}
              </p>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Tasks</div>
              <p className="text-sm text-muted-foreground">
                {project.tasks.completed} / {project.tasks.total} completed
              </p>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Project Link</div>
              <Link
                to={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                {project.link}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <div className="space-y-4">
            {project.members.map((member) => (
              <div key={member.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Team Member
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
