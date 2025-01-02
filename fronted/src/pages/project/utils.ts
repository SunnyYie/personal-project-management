import { Project } from "./project.type";

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
      },
      {
        id: "12",
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    link: "https://example.com/project1",
    description:
      "Redesigning the company website for better user experience and conversion rates.",
    startDate: "2023-01-01",
    endDate: "2023-06-30",
    tasks: { completed: 15, total: 20 },
    status: "In Progress",
    latestDeployment: {
      id: "111",
      status: "Deployed",
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
        },
        action: "Updated homepage design",
        timestamp: new Date().toISOString(),
      },
    ],
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
      },
      {
        id: "22",
        name: "Bob Williams",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    link: "https://example.com/project2",
    description:
      "Developing a new mobile app for both iOS and Android platforms.",
    startDate: "2023-03-15",
    endDate: "2023-09-15",
    tasks: { completed: 8, total: 20 },
    status: "In Progress",
    latestDeployment: {
      id: "211",
      status: "Deployed",
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
        },
        action: "Updated homepage design",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];
