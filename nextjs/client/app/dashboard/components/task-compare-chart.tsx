import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const chartData = [
  { date: "2024-04-01", finished: 222, unfinished: 150 },
  { date: "2024-04-02", finished: 97, unfinished: 180 },
  { date: "2024-04-03", finished: 167, unfinished: 120 },
  { date: "2024-04-04", finished: 242, unfinished: 260 },
  { date: "2024-04-05", finished: 373, unfinished: 290 },
  { date: "2024-04-06", finished: 301, unfinished: 340 },
  { date: "2024-04-07", finished: 245, unfinished: 180 },
  { date: "2024-04-08", finished: 409, unfinished: 320 },
  { date: "2024-04-09", finished: 59, unfinished: 110 },
  { date: "2024-04-10", finished: 261, unfinished: 190 },
  { date: "2024-04-11", finished: 327, unfinished: 350 },
  { date: "2024-04-12", finished: 292, unfinished: 210 },
  { date: "2024-04-13", finished: 342, unfinished: 380 },
  { date: "2024-04-14", finished: 137, unfinished: 220 },
  { date: "2024-04-15", finished: 120, unfinished: 170 },
  { date: "2024-04-16", finished: 138, unfinished: 190 },
  { date: "2024-04-17", finished: 446, unfinished: 360 },
  { date: "2024-04-18", finished: 364, unfinished: 410 },
  { date: "2024-04-19", finished: 243, unfinished: 180 },
  { date: "2024-04-20", finished: 89, unfinished: 150 },
  { date: "2024-04-21", finished: 137, unfinished: 200 },
  { date: "2024-04-22", finished: 224, unfinished: 170 },
  { date: "2024-04-23", finished: 138, unfinished: 230 },
  { date: "2024-04-24", finished: 387, unfinished: 290 },
  { date: "2024-04-25", finished: 215, unfinished: 250 },
  { date: "2024-04-26", finished: 75, unfinished: 130 },
  { date: "2024-04-27", finished: 383, unfinished: 420 },
  { date: "2024-04-28", finished: 122, unfinished: 180 },
  { date: "2024-04-29", finished: 315, unfinished: 240 },
  { date: "2024-04-30", finished: 454, unfinished: 380 },
  { date: "2024-05-01", finished: 165, unfinished: 220 },
  { date: "2024-05-02", finished: 293, unfinished: 310 },
  { date: "2024-05-03", finished: 247, unfinished: 190 },
  { date: "2024-05-04", finished: 385, unfinished: 420 },
  { date: "2024-05-05", finished: 481, unfinished: 390 },
  { date: "2024-05-06", finished: 498, unfinished: 520 },
  { date: "2024-05-07", finished: 388, unfinished: 300 },
  { date: "2024-05-08", finished: 149, unfinished: 210 },
  { date: "2024-05-09", finished: 227, unfinished: 180 },
  { date: "2024-05-10", finished: 293, unfinished: 330 },
  { date: "2024-05-11", finished: 335, unfinished: 270 },
  { date: "2024-05-12", finished: 197, unfinished: 240 },
  { date: "2024-05-13", finished: 197, unfinished: 160 },
  { date: "2024-05-14", finished: 448, unfinished: 490 },
  { date: "2024-05-15", finished: 473, unfinished: 380 },
  { date: "2024-05-16", finished: 338, unfinished: 400 },
  { date: "2024-05-17", finished: 499, unfinished: 420 },
  { date: "2024-05-18", finished: 315, unfinished: 350 },
  { date: "2024-05-19", finished: 235, unfinished: 180 },
  { date: "2024-05-20", finished: 177, unfinished: 230 },
  { date: "2024-05-21", finished: 82, unfinished: 140 },
  { date: "2024-05-22", finished: 81, unfinished: 120 },
  { date: "2024-05-23", finished: 252, unfinished: 290 },
  { date: "2024-05-24", finished: 294, unfinished: 220 },
  { date: "2024-05-25", finished: 201, unfinished: 250 },
  { date: "2024-05-26", finished: 213, unfinished: 170 },
  { date: "2024-05-27", finished: 420, unfinished: 460 },
  { date: "2024-05-28", finished: 233, unfinished: 190 },
  { date: "2024-05-29", finished: 78, unfinished: 130 },
  { date: "2024-05-30", finished: 340, unfinished: 280 },
  { date: "2024-05-31", finished: 178, unfinished: 230 },
  { date: "2024-06-01", finished: 178, unfinished: 200 },
  { date: "2024-06-02", finished: 470, unfinished: 410 },
  { date: "2024-06-03", finished: 103, unfinished: 160 },
  { date: "2024-06-04", finished: 439, unfinished: 380 },
  { date: "2024-06-05", finished: 88, unfinished: 140 },
  { date: "2024-06-06", finished: 294, unfinished: 250 },
  { date: "2024-06-07", finished: 323, unfinished: 370 },
  { date: "2024-06-08", finished: 385, unfinished: 320 },
  { date: "2024-06-09", finished: 438, unfinished: 480 },
  { date: "2024-06-10", finished: 155, unfinished: 200 },
  { date: "2024-06-11", finished: 92, unfinished: 150 },
  { date: "2024-06-12", finished: 492, unfinished: 420 },
  { date: "2024-06-13", finished: 81, unfinished: 130 },
  { date: "2024-06-14", finished: 426, unfinished: 380 },
  { date: "2024-06-15", finished: 307, unfinished: 350 },
  { date: "2024-06-16", finished: 371, unfinished: 310 },
  { date: "2024-06-17", finished: 475, unfinished: 520 },
  { date: "2024-06-18", finished: 107, unfinished: 170 },
  { date: "2024-06-19", finished: 341, unfinished: 290 },
  { date: "2024-06-20", finished: 408, unfinished: 450 },
  { date: "2024-06-21", finished: 169, unfinished: 210 },
  { date: "2024-06-22", finished: 317, unfinished: 270 },
  { date: "2024-06-23", finished: 480, unfinished: 530 },
  { date: "2024-06-24", finished: 132, unfinished: 180 },
  { date: "2024-06-25", finished: 141, unfinished: 190 },
  { date: "2024-06-26", finished: 434, unfinished: 380 },
  { date: "2024-06-27", finished: 448, unfinished: 490 },
  { date: "2024-06-28", finished: 149, unfinished: 200 },
  { date: "2024-06-29", finished: 103, unfinished: 160 },
  { date: "2024-06-30", finished: 446, unfinished: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  finished: {
    label: "已完成",
    color: "hsl(var(--chart-1))",
  },
  unfinished: {
    label: "未完成",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TaskCompareChart() {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>已完成任务数 - 延期任务数</CardTitle>
          <CardDescription>展示过去已完成和延期的任务数</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="过去三个月" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              过去3个月
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              过去30天
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              上一周
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-finished)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-finished)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-unfinished)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-unfinished)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("zh-cs", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("zh-cs", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="finished"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-unfinished)"
              stackId="a"
            />
            <Area
              dataKey="unfinished"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-finished)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
