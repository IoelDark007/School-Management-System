import {
    Search,
    Plus,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    Filter,
    ChevronDown
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
import { Card } from "@/components/ui/card";

export default function StudentsPage() {
    return (
        <div className="">
            <div className="mx-auto space-y-8">

                {/* Page Heading + Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Student Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage and view student records
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Student
                    </Button>
                </div>

                {/* Filters & Search */}
                <Card className="p-4 sm:p-6">
                    <div className="space-y-4">
                        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
                            {/* Search */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Search Students</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name, ID, or email..."
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* Grade / Class */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Grade / Class</label>
                                <Select defaultValue="all">
                                    <SelectTrigger className="pl-9">
                                        <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                        <SelectValue placeholder="All Grades" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Grades</SelectItem>
                                        <SelectItem value="g1">Grade 1</SelectItem>
                                        <SelectItem value="g2">Grade 2</SelectItem>
                                        <SelectItem value="g10a">Grade 10 - A</SelectItem>
                                        <SelectItem value="g12b">Grade 12 - B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <Select defaultValue="all">
                                    <SelectTrigger className="pl-9">
                                        <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Quick filter chips */}
                        <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm" className="rounded-full">
                                All Students
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full">
                                Active
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full">
                                Inactive
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full">
                                New Enrollees
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Students Table */}
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground w-24">ID</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Student Profile</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Email</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Class / Grade</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden lg:table-cell">Enrollment Date</th>
                                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {/* Example rows — you can map real data here */}
                                {[
                                    {
                                        id: "#STU001",
                                        name: "Sophia Williams",
                                        email: "sophia.w@school.edu",
                                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                                        class: "Grade 10 - A",
                                        enrollment: "Aug 15, 2023",
                                        status: "Active",
                                        statusColor: "bg-emerald-500",
                                    },
                                    {
                                        id: "#STU002",
                                        name: "Lucas Miller",
                                        email: "l.miller@school.edu",
                                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                                        class: "Grade 12 - B",
                                        enrollment: "Sep 01, 2023",
                                        status: "Inactive",
                                        statusColor: "bg-amber-500",
                                    },
                                    {
                                        id: "#STU003",
                                        name: "Olivia Jones",
                                        email: "olivia.j@school.edu",
                                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                                        class: "Grade 10 - A",
                                        enrollment: "Aug 22, 2023",
                                        status: "Active",
                                        statusColor: "bg-emerald-500",
                                    },
                                    {
                                        id: "#STU004",
                                        name: "Sophia Williams",
                                        email: "sophia.w@school.edu",
                                        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                                        class: "Grade 10 - A",
                                        enrollment: "Aug 15, 2023",
                                        status: "Active",
                                        statusColor: "bg-emerald-500",
                                    },
                                    {
                                        id: "#STU005",
                                        name: "Lucas Miller",
                                        email: "l.miller@school.edu",
                                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                                        class: "Grade 12 - B",
                                        enrollment: "Sep 01, 2023",
                                        status: "Inactive",
                                        statusColor: "bg-amber-500",
                                    },
                                    {
                                        id: "#STU006",
                                        name: "Olivia Jones",
                                        email: "olivia.j@school.edu",
                                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
                                        class: "Grade 10 - A",
                                        enrollment: "Aug 22, 2023",
                                        status: "Active",
                                        statusColor: "bg-emerald-500",
                                    },
                                    // ... more rows
                                ].map((student) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-muted/50 transition-colors group"
                                    >
                                        <td className="px-4 py-4 font-medium text-muted-foreground">
                                            {/* <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    asChild
                                                >
                                                    <Link href={`/students/${student.id}`}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div> */}
                                            {student.id}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={student.avatar} alt={student.name} />
                                                    <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                     <Link href={'/staff/${student.id}'}><div className="font-medium">{student.name}</div></Link>
                                                    <div className="text-xs text-muted-foreground md:hidden">
                                                        {student.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground hidden md:table-cell">
                                            {student.email}
                                        </td>
                                        <td className="px-4 py-4 hidden sm:table-cell">
                                            <Badge variant="secondary">
                                                {student.class}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4 text-muted-foreground hidden lg:table-cell">
                                            {student.enrollment}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <div className={`h-2 w-2 rounded-full ${student.statusColor}`} />
                                                <span className="font-medium">{student.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t px-4 py-3 sm:px-6">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground">1</span> to{" "}
                            <span className="font-medium text-foreground">6</span> of{" "}
                            <span className="font-medium text-foreground">128</span> students
                        </p>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" disabled className="h-8 w-8">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="default" size="sm" className="h-8 w-8">
                                1
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">
                                2
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">
                                3
                            </Button>
                            <span className="text-sm text-muted-foreground px-2">...</span>
                            <Button variant="outline" size="sm" className="h-8 w-8">
                                12
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}