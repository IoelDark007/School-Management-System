import {
  Search,
  Plus,
  Download,
  Users,
  School,
  Shield, 
  CalendarX,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StaffPage() {
  // Mock data — in real app, fetch from API
  const staffMembers = [
    {
      id: "849201",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      role: "Teacher",
      department: "Science Dept.",
      email: "alex.j@school.edu",
      phone: "+1 (555) 012-3456",
      status: "Active",
      statusColor: "bg-green-500",
    },
    {
      id: "849205",
      name: "Maria Rodriguez",
      avatar: null, // fallback will show initials
      role: "Administrator",
      department: "Finance Office",
      email: "m.rodriguez@school.edu",
      phone: "+1 (555) 987-6543",
      status: "Active",
      statusColor: "bg-green-500",
    },
    {
      id: "849112",
      name: "James Smith",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150",
      role: "Teacher",
      department: "English Dept.",
      email: "j.smith@school.edu",
      phone: "+1 (555) 456-7890",
      status: "On Leave",
      statusColor: "bg-orange-500",
    },
    // ... more entries
  ];

  return (
    <div className="space-y-6">
      {/* KPI Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Staff</p>
              <p className="text-2xl font-bold">124</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
              <School className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Teaching Staff</p>
              <p className="text-2xl font-bold">86</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Shield className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Admin & Support</p>
              <p className="text-2xl font-bold">38</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <CalendarX className="size-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">On Leave</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="flex flex-col">
        {/* Header */}
        <CardHeader className="flex flex-col gap-4 border-b sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>All Staff Members</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your school's faculty and staff directory.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2">
              <Plus className="size-4" />
              Add New Staff
            </Button>
            <Button variant="outline" size="icon">
              <Download className="size-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Filters */}
        <div className="flex flex-col gap-4 border-b p-6 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, ID or email..." className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="support">Support Staff</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="humanities">Humanities</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Name / ID</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Role</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Department</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Contact</th>
                <th className="px-6 py-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {staffMembers.map((member) => (
                <tr
                  key={member.id}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        {member.avatar ? (
                          <AvatarImage src={member.avatar} alt={member.name} />
                        ) : null}
                        <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={'/staff/${member.id}'}><div className="font-medium">{member.name}</div></Link>
                        <div className="text-xs text-muted-foreground">ID: {member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary">{member.role}</Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{member.department}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Mail className="size-3.5" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="size-3.5" />
                        {member.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`size-2.5 rounded-full ${member.statusColor}`} />
                      <span className="font-medium">{member.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Link href={'/staff/${member.id}'}><Eye className="size-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1-5</span> of{" "}
            <span className="font-medium text-foreground">124</span> staff members
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}