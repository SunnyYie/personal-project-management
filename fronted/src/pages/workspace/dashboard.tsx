import { Users, DollarSign, ShoppingCart, Activity } from "lucide-react";
import TaskCompareChart from "./components/dashboard-components/task-compare-chart";
import { DashboardCard } from "./components/dashboard-components/dashboard-card";
import TaskListCard from "./components/dashboard-components/taskList-card";

const dashboardData = [
  {
    title: "Total Revenue",
    value: "$15,231.89",
    change: 20.1,
    changeLabel: "from last month",
    icon: <DollarSign className="w-4 h-4" />,
    chartData: [
      { month: "二月", desktop: 186 },
      { month: "四月", desktop: 305 },
      { month: "六月", desktop: 237 },
      { month: "八月", desktop: 73 },
      { month: "十月", desktop: 209 },
      { month: "十二月", desktop: 214 },
    ],
  },
  {
    title: "Subscriptions",
    value: "14,532",
    change: -5.4,
    changeLabel: "from last month",
    icon: <Users className="w-4 h-4" />,
    chartData: [
      { month: "二月", desktop: 186 },
      { month: "四月", desktop: 305 },
      { month: "六月", desktop: 237 },
      { month: "八月", desktop: 73 },
      { month: "十月", desktop: 209 },
      { month: "十二月", desktop: 214 },
    ],
  },
  {
    title: "Sales",
    value: "2,345",
    change: 8.2,
    changeLabel: "from last month",
    icon: <ShoppingCart className="w-4 h-4" />,
    chartData: [
      { month: "二月", desktop: 186 },
      { month: "四月", desktop: 305 },
      { month: "六月", desktop: 237 },
      { month: "八月", desktop: 73 },
      { month: "十月", desktop: 209 },
      { month: "十二月", desktop: 214 },
    ],
  },
  {
    title: "Active Users",
    value: "1,234",
    change: 2.5,
    changeLabel: "from last month",
    icon: <Activity className="w-4 h-4" />,
    chartData: [
      { month: "二月", desktop: 186 },
      { month: "四月", desktop: 305 },
      { month: "六月", desktop: 237 },
      { month: "八月", desktop: 73 },
      { month: "十月", desktop: 209 },
      { month: "十二月", desktop: 214 },
    ],
  },
];

const projectTasks = [
  {
    id: 1,
    title: "用户认证模块开发",
    assignee: "赵明宇",
    deadline: "2024-02-15",
    status: "进行中",
    progress: 75,
    avatar:
      "https://ai-public.mastergo.com/ai/img_res/cd5aa8b859591df75e425b5e838cbebe.jpg",
  },
  {
    id: 2,
    title: "数据可视化功能实现",
    assignee: "林思琪",
    deadline: "2024-02-20",
    status: "规划中",
    progress: 30,
    avatar:
      "https://ai-public.mastergo.com/ai/img_res/2496743fd69188186454ffe7e1d65b08.jpg",
  },
  {
    id: 3,
    title: "性能优化与测试",
    assignee: "王浩然",
    deadline: "2024-03-01",
    status: "待开始",
    progress: 0,
    avatar:
      "https://ai-public.mastergo.com/ai/img_res/5f595e2f7ebfa69cdf233f06f53d270d.jpg",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center p-6 bg-background">
      <div className="w-full space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardData.map((data, index) => (
            <DashboardCard key={index} {...data} />
          ))}
        </div>

        <TaskCompareChart />

        <TaskListCard projectTasks={projectTasks} />
      </div>
    </div>
  );
}
