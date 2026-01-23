import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  color?: string;
  bgColor?: string;
}

export default function KpiCard({ title, value, icon, change, color, bgColor }: KpiCardProps) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 ${bgColor} text-${color} rounded-xl group-hover:scale-110 transition-transform`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {change && (
          <span className={`text-xs font-bold ${change.startsWith("+") ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-red-600 bg-red-50 dark:bg-red-900/30"} px-2 py-1 rounded-full`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">{title}</h3>
      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
    </Card>
  );
}
