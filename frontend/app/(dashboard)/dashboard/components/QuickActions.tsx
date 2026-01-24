import { Button } from "@/components/ui/button";
import {
  UserPlus,
  FileText,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

type QuickAction = {
  icon: React.ElementType;
  label: string;
  color: "primary" | "teal" | "orange" | "default";
};

const quickActions: QuickAction[] = [
  {
    icon: UserPlus,
    label: "Add Student",
    color: "primary",
  },
  {
    icon: FileText,
    label: "Invoice",
    color: "teal",
  },
  {
    icon: ClipboardList,
    label: "Exam Result",
    color: "orange",
  },
  {
    icon: MessageSquare,
    label: "Message",
    color: "default",
  },
];

export default function QuickActions() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-extrabold uppercase tracking-widest text-foreground">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "group flex h-auto flex-col items-center justify-center gap-2 p-4 transition-all",
              "border hover:shadow-sm active:scale-[0.98]",
              action.color === "primary" &&
                "border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary/40",
              action.color === "teal" &&
                "border-teal-500/20 bg-teal-500/5 text-teal-600 hover:bg-teal-600 hover:text-white hover:border-teal-500/40 dark:text-teal-400",
              action.color === "orange" &&
                "border-orange-500/20 bg-orange-500/5 text-orange-600 hover:bg-orange-600 hover:text-white hover:border-orange-500/40",
              action.color === "default" &&
                "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-[12px] font-bold uppercase tracking-wide">
              {action.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}