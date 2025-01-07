import {
  Deployment,
  DeploymentStatusEnum,
  Project,
  ProjectStatusEnum,
} from "./types/project.type";

export const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    progress: 75,
    members: [
      {
        id: "11",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "",
        role: "admin",
      },
      {
        id: "12",
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "",
        role: "admin",
      },
    ],
    link: "https://example.com/project1",
    description:
      "Redesigning the company website for better user experience and conversion rates.",
    startDate: "2023-01-01",
    endDate: "2023-06-30",
    tasks: { completed: 15, total: 20 },
    status: ProjectStatusEnum.InProgress,
    latestDeployment: {
      id: "111",
      status: DeploymentStatusEnum.Deployed,
      createdAt: new Date().toISOString(),
      url: "https://example.com",
    },
    environmentVariables: [
      { key: "API_URL", value: "https://api.example.com" },
    ],
    domains: [{ name: "example.com", status: "Active" }],
    framework: "React",
    recentActivities: [
      {
        id: "1111",
        user: {
          id: "11",
          name: "John Doe",
          avatar: "/placeholder.svg?height=32&width=32",
          email: "",
          role: "admin",
        },
        action: "Deployed website to production",
        timestamp: new Date().toISOString(),
      },
      {
        id: "1112",
        user: {
          id: "12",
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=32&width=32",
          email: "",
          role: "admin",
        },
        action: "Updated homepage design",
        timestamp: new Date().toISOString(),
      },
    ],
    documents: [],
    budget: 10000,
    client: "ACME Corporation",
    repository: "",
    latestCodeOperation: {
      id: "111",
      title: "Deployed website to production",
      type: "commit",
      author: "John Doe",
      date: new Date().toISOString(),
    },
  },
  {
    id: "2",
    name: "Mobile App Development",
    progress: 40,
    members: [
      {
        id: "21",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "",
        role: "admin",
      },
      {
        id: "22",
        name: "Bob Williams",
        avatar: "/placeholder.svg?height=32&width=32",
        email: "",
        role: "admin",
      },
    ],
    link: "https://example.com/project2",
    description:
      "Developing a new mobile app for both iOS and Android platforms.",
    startDate: "2023-03-15",
    endDate: "2023-09-15",
    tasks: { completed: 8, total: 20 },
    status: ProjectStatusEnum.InProgress,
    latestDeployment: {
      id: "211",
      status: DeploymentStatusEnum.Deployed,
      createdAt: new Date().toISOString(),
      url: "https://example.com",
    },
    environmentVariables: [
      { key: "API_URL", value: "https://api.example.com" },
    ],
    domains: [{ name: "example.com", status: "Active" }],
    framework: "React",
    recentActivities: [
      {
        id: "2111",
        user: {
          id: "21",
          name: "Alice Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
          email: "",
          role: "admin",
        },
        action: "Deployed website to production",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2112",
        user: {
          id: "22",
          name: "Bob Williams",
          avatar: "/placeholder.svg?height=32&width=32",
          email: "",
          role: "admin",
        },
        action: "Updated homepage design",
        timestamp: new Date().toISOString(),
      },
    ],
    documents: [],
    budget: 10000,
    client: "ACME Corporation",
    repository: "",
    latestCodeOperation: {
      id: "2222",
      title: "Deployed website to production",
      type: "commit",
      author: "John Doe",
      date: new Date().toISOString(),
    },
  },
];

export const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case ProjectStatusEnum.NotStarted:
      return "bg-gray-500";
    case ProjectStatusEnum.InProgress:
      return "bg-blue-500";
    case ProjectStatusEnum.Completed:
      return "bg-green-500";
    case ProjectStatusEnum.OnHold:
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export const getDevelopStatusColor = (status: Deployment["status"]) => {
  switch (status) {
    case DeploymentStatusEnum.Deployed:
      return "bg-green-500";
    case DeploymentStatusEnum.Building:
      return "bg-yellow-500";
    case DeploymentStatusEnum.Failed:
      return "bg-red-500";
    case DeploymentStatusEnum.Cancelled:
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
};

export const configeProjectList = (githubProjects: any[], commits: any[]) => {
  const projects = githubProjects.map((project, index) => {
    return {
      ...project,
      status: ProjectStatusEnum.InProgress,
      progress: 0,
      members: [
        {
          ...project.owner,
          role: "admin",
        },
      ],
      endDate: "2026-07-08T11:04:12Z",
      tasks: { completed: 0, total: 0 },
      framework: "React",
      budget: 0,
      client: "",
      repository: "",
      latestCodeOperation: {
        id: commits[index][0].sha,
        type: "commit",
        ...commits[index][0],
      },
      recentActivities: commits[index].map((commit: any) => ({
        id: commit.sha,
        user: {
          id: commit.commit.author.email,
          role: "admin",
          avatar: "",
          ...commit.commit.author,
        },
        date: commit.commit.author.date,
        ...commit.commit,
      })),
    };
  });

  return projects;
};
