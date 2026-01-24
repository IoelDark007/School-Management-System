// dashboard/components/KpiCard.tsx
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type KpiCardProps = {
  icon: LucideIcon;
  color: string;
  title: string;
  value: string;
  change: string;
  changeColor: "green" | "red";
};

export default function KpiCard({
  icon: Icon,
  color,
  title,
  value,
  change,
  changeColor,
}: KpiCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
    teal: "bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  }[color];

  const changeClasses = {
    green: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400",
    red: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  }[changeColor];

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className={cn("rounded-xl p-3 transition-transform group-hover:scale-110", colorClasses)}>
            <Icon className="size-6" />
          </div>
          <Badge variant="outline" className={cn("text-xs font-bold", changeClasses)}>
            {change}
          </Badge>
        </div>
        <p className="text-sm font-semibold text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-extrabold">{value}</p>
      </CardContent>
    </Card>
  );
}