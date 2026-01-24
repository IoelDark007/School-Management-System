import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">
          Good Morning, Admin
        </h1>
        <p className="text-sm text-muted-foreground">
          Friday, Jan 23, 2026 • 14:30
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
        <Button size="sm" variant="secondary">
          Record Payment
        </Button>
        <Button size="sm" variant="outline">
          Mark Attendance
        </Button>
      </div>
    </div>
  );
}
