"use client";

import { useState, useEffect } from "react";
import { 
  Plus, FileText, Search, Home, BookOpen, Zap, Settings, 
  TrendingUp, Download, Eye, Loader2, Filter 
} from "lucide-react";
import { apiRequest } from "@/src/lib/apiClient";
import { RecordExpenseModal } from "@/src/assets/components/management/RecordExpenseModal";

export default function ExpenditurePage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ infrastructure: 0, academic: 0, utilities: 0, maintenance: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchExpenditureData = async () => {
    setLoading(true);
    try {
      // Fetching both stats and the list
      const [listData, statsData] = await Promise.all([
        apiRequest("/expenditure/", { method: "GET" }),
        apiRequest("/expenditure/summary/", { method: "GET" })
      ]);
      setExpenses(listData.results || listData);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to load expenditure records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenditureData(); }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Expenditure Management</h1>
          <p className="text-slate-500 text-sm font-medium">Track school spending, utility costs, and resource procurement.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all text-xs uppercase shadow-sm">
            <Download size={16} /> Generate Report
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all text-xs uppercase">
            <Plus size={16} /> Record Expense
          </button>
        </div>
      </header>

      {/* Category Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Infrastructure" value={stats.infrastructure} icon={<Home size={20}/>} color="blue" />
        <StatCard label="Academic Resources" value={stats.academic} icon={<BookOpen size={20}/>} color="teal" />
        <StatCard label="Utilities" value={stats.utilities} icon={<Zap size={20}/>} color="amber" />
        <StatCard label="Maintenance" value={stats.maintenance} icon={<Settings size={20}/>} color="emerald" />
      </section>

      {/* Simplified Bar Chart (CSS-based) */}
      <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Monthly Expenditure Trend</h3>
          <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase">Year 2026</span>
        </div>
        <div className="flex items-end justify-between h-40 gap-4">
          <TrendBar height="60%" label="Aug" />
          <TrendBar height="45%" label="Sep" />
          <TrendBar height="80%" label="Oct" />
          <TrendBar height="55%" label="Nov" />
          <TrendBar height="95%" label="Dec" active />
          <TrendBar height="30%" label="Jan" />
        </div>
      </section>

      {/* Main Table Section */}
      <main className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by description, staff, or category..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} className="text-slate-600" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Description</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Responsible Staff</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-500 mb-2" size={32} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Transactions...</span>
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 text-sm font-bold text-slate-500">{exp.date}</td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">{exp.category}</span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-800">{exp.description}</td>
                    <td className="px-8 py-5 font-mono font-black text-slate-900">${exp.amount.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200 uppercase">
                          {exp.staff_name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-sm font-bold text-slate-600">{exp.staff_name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={exp.status} />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <RecordExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          fetchExpenditureData();
        }}
      />
    </div>
  );
}

// --- SUBCOMPONENTS ---

function StatCard({ label, value, icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    teal: "bg-teal-50 text-teal-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <div className={`p-2.5 rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
      <div className="text-2xl font-black text-slate-800">${value?.toLocaleString() || "0.00"}</div>
    </div>
  );
}

function TrendBar({ height, label, active }: any) {
  return (
    <div className="flex-1 flex flex-col items-center gap-3 group">
      <div className="relative w-full max-w-10 h-full flex items-end">
        <div 
          className={`w-full rounded-t-lg transition-all duration-500 ${active ? 'bg-teal-500' : 'bg-blue-100 group-hover:bg-blue-400'}`} 
          style={{ height }} 
        />
      </div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Approved: "bg-teal-50 text-teal-600 border-teal-100",
    Pending: "bg-blue-50 text-blue-600 border-blue-100",
    Rejected: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
}