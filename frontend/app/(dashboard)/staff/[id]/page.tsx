import {
  Mail,
  Phone,
  Home,
  CalendarDays,
  Briefcase,
  Edit,
  Star,
  Users,
  CalendarCheck,
  Clock,
  Download,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StaffProfilePage() {
  // In real app → fetch via params.id or server component
  const staff = {
    name: "Dr. Sarah Wilson",
    id: "EMP-2021-042",
    role: "Senior Faculty",
    department: "Mathematics Dept",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    status: "Active",
    dob: "12 August 1985",
    phone: "+1 (555) 012-9988",
    workEmail: "sarah.wilson@edumanager.edu",
    address: "224 Maple Avenue, Springfield, IL 62704",
    employmentType: "Full-Time (Tenured)",
    studentRating: "4.8 / 5",
    attendance: "98%",
    classesTaught: 5,
    note: "Sarah has been instrumental in revising the Grade 10 calculus curriculum. Highly recommended for the upcoming Department Head vacancy.",
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-primary/80 to-primary/40">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>

        <CardContent className="relative px-6 pb-6 pt-0">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16">
            <div className="relative shrink-0">
              <Avatar className="size-32 border-4 border-background shadow-md">
                <AvatarImage src={staff.avatar} alt={staff.name} />
                <AvatarFallback>{staff.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div
                className="absolute bottom-3 right-3 size-5 rounded-full border-2 border-background bg-green-500"
                title="Active"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">{staff.name}</h1>
              <p className="text-muted-foreground">
                ID: {staff.id} • {staff.role} • {staff.department}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Send Email
              </Button>
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column – Staff Details + Notes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Staff Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Staff Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="font-medium">{staff.dob}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Phone
                    </p>
                    <p className="font-medium">{staff.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Work Email
                    </p>
                    <p className="font-medium">{staff.workEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Address
                    </p>
                    <p className="font-medium">{staff.address}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Briefcase className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Employment Type
                  </p>
                  <p className="font-medium">{staff.employmentType}</p>
                  <Button variant="link" className="mt-1 h-auto p-0 text-xs text-primary">
                    View Contract
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Sticky Note
                Admin Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground">{staff.note}</p>
              <div className="mt-4 flex justify-end">
                <Button variant="link" className="text-xs text-primary">
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column – Stats + Assigned Classes + Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Student Rating</p>
                    <p className="text-3xl font-bold">{staff.studentRating}</p>
                  </div>
                  <div className="rounded-lg bg-yellow-100 p-2 dark:bg-yellow-900/30">
                    <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    +0.2
                  </Badge>
                  <span className="text-muted-foreground">vs last term</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Staff Attendance</p>
                    <p className="text-3xl font-bold">{staff.attendance}</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Excellent
                  </Badge>
                  <span className="text-muted-foreground">0 sick leaves</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Classes Taught</p>
                    <p className="text-3xl font-bold">{staff.classesTaught}</p>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <Badge variant="secondary">Standard Load</Badge>
                  <span className="text-muted-foreground">18 hrs/week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assigned Classes */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Assigned Classes</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                View Timetable
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Class ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Subject</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Students</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Schedule</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Avg Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">10-B</td>
                      <td className="px-6 py-4">Adv. Mathematics</td>
                      <td className="px-6 py-4">32</td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">Mon, Wed, Fri</td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600">A- (91%)</span>
                      </td>
                    </tr>
                    {/* Repeat for other classes */}
                  </tbody>
                </table>
              </div>
              <div className="border-t px-6 py-4 text-center">
                <Button variant="link" className="text-sm text-primary">
                  Generate Performance Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Schedule + Check-in Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Teaching Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Teaching Schedule</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6 border-l-2 border-border pl-4">
                <div className="relative">
                  <div className="absolute -left-3 top-1.5 size-3 rounded-full border-2 border-background bg-primary" />
                  <p className="text-xs text-muted-foreground">08:30 AM - 09:30 AM</p>
                  <p className="font-medium">Adv. Mathematics (10-B)</p>
                  <p className="text-xs text-muted-foreground">Room 101</p>
                </div>
                {/* Add more schedule items */}
              </CardContent>
            </Card>

            {/* Check-in Activity (Mini Graph) */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Check-in Activity</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex h-32 items-end justify-between gap-2 px-2">
                  {[90, 85, 95, 88, 92].map((percent, i) => (
                    <div key={i} className="group flex flex-1 flex-col items-center gap-1">
                      <div className="w-full rounded-t bg-primary/20 dark:bg-primary/10">
                        <div
                          className="w-full rounded-t bg-primary transition-all group-hover:bg-sky-400"
                          style={{ height: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {["M", "T", "W", "T", "F"][i]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-primary" />
                    On Time
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-red-400" />
                    Late
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}