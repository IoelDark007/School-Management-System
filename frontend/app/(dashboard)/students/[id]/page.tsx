// app/(dashboard)/students/[id]/page.tsx
import { 
  Mail, 
  Edit, 
  Phone, 
  Home, 
  CalendarDays, 
  Users, 
  TrendingUp, 
  CalendarCheck, 
  Clock, 
  Download,
  MessageSquare
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StudentProfilePage() {
  // In real app, fetch student by ID from params or API
  const student = {
    name: "Alex Johnson",
    id: "2023-8492",
    grade: "Grade 10-B",
    stream: "Science Stream",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    status: "Active",
    dob: "14 March 2008",
    phone: "+1 (555) 012-3456",
    email: "alex.j@student.edu",
    address: "452 Willow Creek Rd, Springfield, IL 62704",
    guardian: "Sarah Johnson (Mother)",
    gpa: "3.8",
    attendance: "96%",
    pendingTasks: 2,
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
            {/* Avatar + Status dot */}
            <div className="relative shrink-0">
              <Avatar className="size-32 border-4 border-background shadow-md">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-3 right-3 size-5 rounded-full border-2 border-background bg-green-500" title="Active" />
            </div>

            {/* Info + Actions */}
            <div className="flex-1 min-w-0 space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">{student.name}</h1>
              <p className="text-muted-foreground">
                ID: {student.id} • {student.grade} • {student.stream}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Message Parent
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
        {/* Left Column – Personal Details + Notes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{student.dob}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</p>
                    <p className="font-medium">{student.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Address</p>
                    <p className="font-medium">{student.address}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Guardian</p>
                  <p className="font-medium">{student.guardian}</p>
                  <Button variant="link" className="mt-1 h-auto p-0 text-xs text-primary">
                    View Contact Info
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Sticky Note
                Quick Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground">
                "Alex shows strong leadership skills in group projects but needs to focus on timely submission of assignments."
              </p>
              <div className="mt-4 flex justify-end">
                <Button variant="link" className="text-xs text-primary">
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column – Stats + Academic History + Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">GPA</p>
                    <p className="text-3xl font-bold">{student.gpa}</p>
                  </div>
                  <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    +0.2%
                  </Badge>
                  <span className="text-muted-foreground">vs last semester</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Attendance</p>
                    <p className="text-3xl font-bold">{student.attendance}</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Good
                  </Badge>
                  <span className="text-muted-foreground">1 day absent</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                    <p className="text-3xl font-bold">{student.pendingTasks}</p>
                  </div>
                  <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    Due Soon
                  </Badge>
                  <span className="text-muted-foreground">Next: History Essay</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic History */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Academic History</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Subject</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Teacher</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Grade</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Mid-Term</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">Mathematics</td>
                      <td className="px-6 py-4">Mr. Smith</td>
                      <td className="px-6 py-4 font-bold text-green-600">A</td>
                      <td className="px-6 py-4">92%</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Pass
                        </Badge>
                      </td>
                    </tr>
                    {/* Repeat for other subjects... */}
                  </tbody>
                </table>
              </div>
              <div className="border-t px-6 py-4 text-center">
                <Button variant="link" className="text-sm text-primary">
                  View All Subjects
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule + Attendance Mini Graph */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6 border-l-2 border-border pl-4">
                <div className="relative">
                  <div className="absolute -left-3 top-1.5 size-3 rounded-full border-2 border-background bg-primary" />
                  <p className="text-xs text-muted-foreground">08:30 AM - 09:30 AM</p>
                  <p className="font-medium">Mathematics</p>
                  <p className="text-xs text-muted-foreground">Room 101</p>
                </div>
                {/* Add more schedule items */}
              </CardContent>
            </Card>

            {/* Weekly Attendance */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex h-32 items-end justify-between gap-2 px-2">
                  {[100, 100, 80, 100, 30].map((percent, i) => (
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
                    Present
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full bg-red-400" />
                    Late/Absent
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