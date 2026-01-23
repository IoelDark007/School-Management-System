"use client";

import { TrendingUp } from "lucide-react";
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
      <CardHeader>
        <CardTitle>Fees Collected</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
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
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total fees collected for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
