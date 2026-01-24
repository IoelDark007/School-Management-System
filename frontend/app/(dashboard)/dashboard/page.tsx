// app/(dashboard)/dashboard/page.tsx
import { 
  Bell, 
  Search, 
  Settings, 
  School, 
  UserPlus, 
  Award, 
  CalendarCheck, 
  Wallet,
  LayoutDashboard,
  Users,
  BadgeCheck,
  BookOpen,
  DollarSign,
  FileQuestion,
  Bus,
  BarChart3,
  LifeBuoy,
  CalendarDays,
  Plus,
  Edit,
  MessageSquare,
  FileText,
  ClipboardList,
  MoreHorizontal,
  User
} from "lucide-react";

import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import KpiCard from "./components/KpiCard";
import FeeTransactionsTable from "./components/FeesTransactionTable"; // fixed typo in filename
import UpcomingEvents from "./components/UpcomingEvents";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import SystemStatus from "./components/SystemStatus";
import { AttendanceChart } from "./components/AttendanceChart";
import { FeesChart } from "./components/FeesChart";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* <aside className="hidden w-64 shrink-0 flex-col justify-between border-r bg-background py-6 px-4 md:flex">
          <div className="space-y-6">
            <div className="px-3">
              <Card className="border-primary/10 bg-primary/5">
                <CardContent className="p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    Current Session
                  </p>
                  <p className="text-sm font-bold">Academic Year 2024-25</p>
                </CardContent>
              </Card>
            </div>

            <nav className="space-y-1 px-3">
              <Button 
                variant="default" 
                className="w-full justify-start gap-3 rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
              >
                <LayoutDashboard className="size-5" />
                <span className="text-sm font-semibold">Dashboard</span>
              </Button>

              {[
                { icon: Users, label: "Students" },
                { icon: BadgeCheck, label: "Staff Members" },
                { icon: BookOpen, label: "Academics" },
                { icon: DollarSign, label: "Finance & Fees" },
                { icon: FileQuestion, label: "Exams & Results" },
                { icon: Bus, label: "Transportation" },
                { icon: BarChart3, label: "System Reports" },
              ].map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:bg-muted/60"
                >
                  <item.icon className="size-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          <div className="px-3 pt-6">
            <Button 
              variant="default" 
              className="w-full gap-2 bg-foreground text-background hover:bg-foreground/90"
            >
              <LifeBuoy className="size-4" />
              Contact Support
            </Button>
          </div>
        </aside> */}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-muted/40 p-6 lg:p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              icon={UserPlus}
              color="blue"
              title="Total Students"
              value="1,240"
              change="+12.5%"
              changeColor="green"
            />
            <KpiCard
              icon={Award}
              color="teal"
              title="Total Staff"
              value="86"
              change="+2%"
              changeColor="green"
            />
            <KpiCard
              icon={CalendarCheck}
              color="orange"
              title="Today's Attendance"
              value="94.2%"
              change="-1.2%"
              changeColor="red"
            />
            <KpiCard
              icon={Wallet}
              color="emerald"
              title="Fees Collected"
              value="$45,200"
              change="+8.4%"
              changeColor="green"
            />
          </div>

          {/* Charts */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Attendance Trend - placeholder */}
            <AttendanceChart />

            {/* Fee Collection */}
            <FeesChart />
         </div>

          {/* Tables & Events */}
          <div className="grid gap-8 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <FeeTransactionsTable />
            </div>
            <div>
              <UpcomingEvents />
            </div>
          </div>
        </main>

        {/* Right sidebar - visible on xl+ */}
        <aside className="hidden w-120 shrink-0 border-l bg-background xl:block">
          <div className="p-6">
            <QuickActions />
          </div>
          <div className="p-6">
            <RecentActivity />
          </div>
          <div className="mx-6 mb-6">
            <SystemStatus />
          </div>
        </aside>
      </div>
    </div>
  );
}