import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  chartData: { month: string; desktop: number }[];
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DashboardCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  chartData,
}: DashboardCardProps) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent className="flex p-6">
        <div className="flex flex-col flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium mr-1",
                isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {isPositive ? (
                <ArrowUpIcon className="w-3 h-3" />
              ) : (
                <ArrowDownIcon className="w-3 h-3" />
              )}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              {changeLabel}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
      </CardContent>

      <div className="w-full">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 15,
              right: 15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
