"use client";

import { Mail, Phone, MapPin, Calendar, Briefcase, Star, Clock, GraduationCap, Download, Edit3, ArrowLeft } from "lucide-react";
import { useState, useEffect, use } from "react";
import { apiRequest } from "@/src/lib/apiClient";
import { EditStaffModal } from "@/src/assets/components/management/EditStaffModal";
import Link from "next/link";

export default function StaffProfilePage({ params }: { params: Promise<{ staffId: string }> }) {
  const { staffId } = use(params);

  const [currentStaff, setCurrentStaff] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStaffDetails = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(`/staff/${staffId}/`, { method: "GET" });
      setCurrentStaff(data);
    } catch (err) {
      console.error("Failed to load staff details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStaffDetails(); }, [staffId]);

  if (loading) return (
    <div className="p-20 flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Records...</p>
      </div>
    </div>
  );

  if (!currentStaff) return (
    <div className="p-20 text-center bg-slate-50 min-h-screen">
      <p className="text-slate-500 font-bold">Staff member not found.</p>
      <Link href="/management/staff" className="text-cyan-600 hover:underline mt-4 block text-sm">Return to Directory</Link>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      {/* Navigation */}
      <Link href="/management/staff" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold text-xs uppercase tracking-widest">
        <ArrowLeft size={14} /> Back to Directory
      </Link>

      {/* 1. Profile Header */}
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 mb-8">
        <div className="h-32 bg-linear-to-r from-cyan-500 to-blue-600" />
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-12">
          <div className="relative">
            <img 
              src={currentStaff.profile_image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentStaff.first_name}`} 
              className="w-32 h-32 rounded-[2rem] border-8 border-white bg-slate-100 shadow-sm object-cover" 
            />
            <span className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              {currentStaff.first_name} {currentStaff.last_name}
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              ID: {currentStaff.employee_id || "N/A"} • {currentStaff.role} • {currentStaff.department} Dept
            </p>
          </div>
          <div className="flex gap-3 pb-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-xs uppercase">
              <Mail size={16} /> Email
            </button>
            <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 text-xs uppercase">
              <Edit3 size={16} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="flex items-center gap-2 text-slate-800 font-black uppercase tracking-[0.2em] text-[10px] mb-8">
              <GraduationCap size={16} className="text-cyan-500" /> Professional Details
            </h3>
            <div className="space-y-6">
              <DetailItem icon={<Calendar />} label="Date of Birth" value={currentStaff.date_of_birth || "Not Provided"} />
              <DetailItem icon={<Phone />} label="Phone Number" value={currentStaff.phone || "Not Provided"} />
              <DetailItem icon={<Mail />} label="Work Email" value={currentStaff.email} />
              <DetailItem icon={<MapPin />} label="Campus Office" value={currentStaff.address || "Main Campus"} />
              <DetailItem icon={<Briefcase />} label="Employment" value={currentStaff.employment_status || "Full-Time"} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Rating" value="4.8/5" trend="+0.2 increase" icon={<Star size={18} className="text-amber-400" />} />
            <StatCard label="Attendance" value="98%" trend="Excellent" icon={<Clock size={18} className="text-cyan-500" />} />
            <StatCard label="Classes" value={currentStaff.assigned_classes?.length || "0"} trend="Active load" icon={<GraduationCap size={18} className="text-purple-500" />} />
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px]">Current Class Load</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4">Subject</th>
                  <th className="px-8 py-4">Students</th>
                  <th className="px-8 py-4 text-right">Avg Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentStaff.assigned_classes?.length > 0 ? currentStaff.assigned_classes.map((cls: any) => (
                  <ClassRow key={cls.id} subject={cls.subject_name} students={cls.student_count} grade="A-" />
                )) : (
                  <tr>
                    <td colSpan={3} className="px-8 py-10 text-center text-slate-400 font-medium italic">No classes currently assigned.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EditStaffModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        staffData={currentStaff}
        onSuccess={() => fetchStaffDetails()} 
      />
    </div>
  );
}

// --- LOCAL HELPER COMPONENTS (NO EXTERNAL FILES NEEDED) ---

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-700 leading-tight">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">{icon}</div>
      </div>
      <p className="text-3xl font-black text-slate-800 mb-1">{value}</p>
      <p className="text-[10px] font-bold text-green-500 uppercase tracking-wide">{trend}</p>
    </div>
  );
}

function ClassRow({ subject, students, grade }: { subject: string, students: number, grade: string }) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-8 py-5">
        <p className="font-black text-slate-800 text-sm">{subject}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Primary Instructor</p>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-2">
           <span className="text-sm font-bold text-slate-600">{students}</span>
           <span className="text-[10px] font-black text-slate-300 uppercase">Enrolled</span>
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <span className="px-3 py-1 bg-green-50 text-green-600 font-black text-[10px] rounded-lg border border-green-100 uppercase">{grade}</span>
      </td>
    </tr>
  );
}