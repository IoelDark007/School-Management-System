"use client";

import { Mail, Phone, MapPin, Calendar, Briefcase, Star, Clock, GraduationCap, Download, Edit3 } from "lucide-react";
import { useState, useEffect, use } from "react";
import { apiRequest } from "@/src/lib/apiClient";
import { EditStaffModal } from "@/src/assets/components/management/EditStaffModal";

export default function StaffProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params 
  const { id } = use(params);

  // Define 'currentStaff' state
  const [currentStaff, setCurrentStaff] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Define 'fetchStaffDetails' function
  const fetchStaffDetails = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(`/staff/${id}/`, { method: "GET" });
      setCurrentStaff(data);
    } catch (err) {
      console.error("Failed to load staff details:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchStaffDetails();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-bold">Loading Profile...</div>;
  if (!currentStaff) return <div className="p-20 text-center">Staff member not found.</div>;
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* 1. Profile Header Banner */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mb-8">
        <div className="h-32 bg-linear-to-r from-cyan-400 to-blue-500" />
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-12">
          <div className="relative">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
              className="w-32 h-32 rounded-full border-8 border-white bg-slate-100 shadow-sm" 
            />
            <span className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-3xl font-black text-slate-800">Dr. Sarah Wilson</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              ID: EMP-2021-042 • Senior Faculty • Mathematics Dept
            </p>
          </div>
          <div className="flex gap-3 pb-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all">
              <Mail size={18} /> Send Email
            </button>
            <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-100">
              <Edit3 size={18} /> Edit Profile
            </button>
            <EditStaffModal 
              isOpen={isEditModalOpen} 
              onClose={() => setIsEditModalOpen(false)}
              staffData={currentStaff} // Data fetched from API
              onSuccess={() => fetchStaffDetails()} // Refresh profile data
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN: Details & Admin Notes */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Staff Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="flex items-center gap-2 text-slate-800 font-black uppercase tracking-wider text-sm mb-6">
              <GraduationCap size={18} className="text-cyan-500" /> Staff Details
            </h3>
            <div className="space-y-6">
              <DetailItem icon={<Calendar />} label="Date of Birth" value="12 August 1985" />
              <DetailItem icon={<Phone />} label="Phone" value="+1 (555) 012-9988" />
              <DetailItem icon={<Mail />} label="Work Email" value="sarah.wilson@edumanager.edu" />
              <DetailItem icon={<MapPin />} label="Address" value="224 Maple Avenue, Springfield, IL 62704" />
              <DetailItem icon={<Briefcase />} label="Employment Type" value="Full-Time (Tenured)" />
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="flex items-center gap-2 text-slate-800 font-black uppercase tracking-wider text-sm mb-4 font-mono">
              Admin Notes
            </h3>
            <p className="text-slate-500 italic text-sm leading-relaxed mb-4">
              "Sarah has been instrumental in revising the Grade 10 calculus curriculum. Highly recommended for the upcoming Department Head vacancy."
            </p>
            <button className="text-cyan-600 font-black text-[10px] uppercase hover:underline">Add Note</button>
          </div>
        </div>

        {/* RIGHT COLUMN: Stats & Classes */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Student Rating" value="4.8/5" trend="+0.2 vs last term" icon={<Star className="text-amber-400" />} />
            <StatCard label="Staff Attendance" value="98%" trend="Excellent - 0 sick leaves" icon={<Clock className="text-cyan-500" />} />
            <StatCard label="Classes Taught" value="5" trend="Standard Load - 18 hrs/week" icon={<GraduationCap className="text-purple-500" />} />
          </div>

          {/* Assigned Classes Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm">Assigned Classes</h3>
              <button className="text-cyan-600 font-bold text-xs hover:underline">View Timetable</button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Class ID</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Students</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4">Avg Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <ClassRow id="10-B" subject="Adv. Mathematics" students="32" schedule="Mon, Wed, Fri" grade="A-" />
                <ClassRow id="09-A" subject="Intro to Physics" students="28" schedule="Tue, Thu" grade="B+" />
                <ClassRow id="12-Sci" subject="Calculus II" students="24" schedule="Mon, Tue, Thu" grade="A" />
              </tbody>
            </table>
            <button className="w-full py-4 text-slate-400 font-bold text-xs hover:bg-slate-50 transition-colors border-t border-slate-100 flex items-center justify-center gap-2">
               <Download size={14} /> Generate Performance Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function DetailItem({ icon, label, value }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold text-slate-500">{label}</p>
        <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
      </div>
      <p className="text-3xl font-black text-slate-800 mb-1">{value}</p>
      <p className="text-[10px] font-bold text-green-500 uppercase tracking-wide">{trend}</p>
    </div>
  );
}

function ClassRow({ id, subject, students, schedule, grade }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-6 py-4 font-black text-slate-700">{id}</td>
      <td className="px-6 py-4 font-medium text-slate-600">{subject}</td>
      <td className="px-6 py-4 text-slate-500">{students}</td>
      <td className="px-6 py-4 text-slate-500">{schedule}</td>
      <td className="px-6 py-4">
        <span className={`font-black ${grade.startsWith('A') ? 'text-green-500' : 'text-cyan-500'}`}>{grade}</span>
      </td>
    </tr>
  );
}