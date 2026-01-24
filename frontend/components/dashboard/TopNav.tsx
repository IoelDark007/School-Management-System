// frontend/src/assets/components/dashboard/TopNav.tsx
"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Settings,
  School,
} from "lucide-react";

export function TopNav() {
  const pathname = usePathname();
  const isManagementPage = pathname === "/students";
  const isProfilePage = pathname.includes("/students/") && pathname !== "/students";
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-8">
        <div className="hidden items-center gap-1 rounded-full bg-muted/60 p-1 lg:flex">
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-background px-4 text-xs shadow-sm"
          >
            Main Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full px-4 text-xs"
          >
            Analytics
          </Button>
        </div>
      </div>

      <div className="flex flex-1 justify-center px-6 lg:max-w-xl">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students, records, or files..."
            className="h-10 w-full pl-10 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="size-5" />
        </Button>
        <div className="hidden h-8 w-px bg-border lg:block" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-bold leading-none">Alex Sterling</p>
            <p className="text-[10px] font-semibold uppercase text-muted-foreground">Super Admin</p>
          </div>
          <Avatar className="size-10 rounded-xl border-2 border-background shadow-sm">
            <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" alt="Alex Sterling" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}