// app/(dashboard)/dashboard/components/RecentActivity.tsx
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, CreditCard, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import React from 'react';

type Activity = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: React.ReactNode;
  time: string;
};

const activities: Activity[] = [
  {
    id: "1",
    icon: Edit,
    iconColor: "bg-primary text-primary-foreground",
    title: "Admin updated the exam schedule for Class X-A",
    time: "2 minutes ago",
  },
  {
    id: "2",
    icon: CreditCard,
    iconColor: "bg-teal-500 text-white",
    title: (
      <>
        New fee payment received from <span className="font-semibold">John Doe</span>
      </>
    ),
    time: "45 minutes ago",
  },
  {
    id: "3",
    icon: Bell,
    iconColor: "bg-orange-500 text-white",
    title: "Broadcast message sent to all primary school parents",
    time: "2 hours ago",
  },
  {
    id: "4",
    icon: User,
    iconColor: "bg-slate-400 text-white",
    title: (
      <>
        New staff registration: <span className="font-semibold">Mr. Smith</span>
      </>
    ),
    time: "5 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold uppercase tracking-widest text-foreground">
          Recent Activity
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative space-y-8 pl-10 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border dark:before:bg-border/60">
        {activities.map((activity) => (
          <div key={activity.id} className="relative flex gap-6 pl-6">
            <div
              className={cn(
                "absolute left-0 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-background",
                activity.iconColor
              )}
            >
              <activity.icon className="size-5" />
            </div>

            <div className="flex-1">
              <p className="text-base leading-relaxed text-muted-foreground">
                {activity.title}
              </p>
              <span className="mt-0.5 block text-[10px] font-bold text-muted-foreground/80">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}