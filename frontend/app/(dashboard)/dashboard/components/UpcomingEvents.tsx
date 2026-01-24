import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Event = {
  id: string;
  day: string;
  month: string;
  title: string;
  details: string;
  color?: "blue" | "teal" | "gray";
  opacity?: boolean;
};

const upcomingEvents: Event[] = [
  {
    id: "1",
    day: "15",
    month: "OCT",
    title: "Parent-Teacher Meet",
    details: "Main Auditorium • 10:00 AM",
    color: "blue",
  },
  {
    id: "2",
    day: "22",
    month: "OCT",
    title: "Annual Sports Day",
    details: "School Ground • All Day",
    color: "teal",
  },
  {
    id: "3",
    day: "28",
    month: "OCT",
    title: "Mid-Term Exams",
    details: "Block A, B & C",
    color: "gray",
    opacity: true,
  },
];

export default function UpcomingEvents() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Events</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <CalendarDays className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className={cn(
              "flex gap-4 transition-opacity",
              event.opacity && "opacity-60"
            )}
          >
            {/* Date badge */}
            <div
              className={cn(
                "shrink-0 flex h-12 w-12 flex-col items-center justify-center rounded-xl border text-center",
                event.color === "blue" &&
                  "bg-blue-50 text-primary border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/40",
                event.color === "teal" &&
                  "bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-800/40",
                event.color === "gray" &&
                  "bg-muted text-muted-foreground border-border dark:bg-muted/50"
              )}
            >
              <span className="text-lg font-extrabold leading-none">
                {event.day}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {event.month}
              </span>
            </div>

            {/* Event info */}
            <div className="flex-1 space-y-1">
              <h4 className="text-sm font-semibold leading-tight">
                {event.title}
              </h4>
              <p className="text-xs text-muted-foreground">{event.details}</p>
            </div>
          </div>
        ))}

        {/* Add new event button */}
        <div className="mt-8 pt-6 border-t">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 border-dashed text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5"
          >
            <Plus className="h-4 w-4" />
            Add New Event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}