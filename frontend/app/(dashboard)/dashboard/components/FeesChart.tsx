"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "Fees collected over the last 6 months";

const chartData = [
  { month: "January", FEES: 186, EXTRAS: 80 },
  { month: "February", FEES: 305, EXTRAS: 200 },
  { month: "March", FEES: 237, EXTRAS: 120 },
  { month: "April", FEES: 73, EXTRAS: 190 },
  { month: "May", FEES: 209, EXTRAS: 130 },
  { month: "June", FEES: 214, EXTRAS: 140 },
];

const chartConfig = {
  FEES: {
    label: "FEES",
    color: "var(--chart-accent-teal)",
  },
  EXTRAS: {
    label: "EXTRAS",
    color: "var(--chart-primary)",
  },
} satisfies ChartConfig;

export function FeesChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Fees Collected</CardTitle>
          <CardDescription>Revenue analytics monthly view</CardDescription>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-primary" />
            <span className="font-medium text-muted-foreground">FEES</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-teal-500" />
            <span className="font-medium text-muted-foreground">EXTRAS</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="FEES"
              stackId="a"
              fill="var(--color-FEES)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="EXTRAS"
              stackId="a"
              fill="var(--color-EXTRAS)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
