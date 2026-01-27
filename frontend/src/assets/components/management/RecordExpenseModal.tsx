"use client";

import { useState, useEffect } from "react";
import { X, DollarSign, Tag, FileText, User, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { apiRequest } from "@/src/lib/apiClient";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RecordExpenseModal({ isOpen, onClose, onSuccess }: ExpenseModalProps) {
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    category: "Infrastructure",
    description: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    staff_id: "",
    status: "Pending"
  });

  useEffect(() => {
    if (isOpen) {
      const fetchStaff = async () => {
        try {
          const data = await apiRequest("/staff/", { method: "GET" });
          setStaffList(data.results || data);
        } catch (err) { console.error("Error loading staff:", err); }
      };
      fetchStaff();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("/expenditure/", {
        method: "POST",
        body: JSON.stringify({ ...formData, amount: parseFloat(formData.amount) }),
      });
      onSuccess();
      onClose();
      setFormData({ category: "Infrastructure", description: "", amount: "", date: new Date().toISOString().split('T')[0], staff_id: "", status: "Pending" });
    } catch (err) { alert("Failed to record expense."); } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* Compact Header */}
        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">New Expenditure</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Row 1: Amount & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount (₵)</label>
              <div className="relative">
                <p className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">₵</p>
                <input
                  required
                  type="number"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none text-sm appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Academic">Academic</option>
                <option value="Utilities">Utilities</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Row 2: Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
            <input
              required
              type="text"
              placeholder="What was this for?"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Row 3: Staff & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Staff</label>
              <select 
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none text-sm appearance-none cursor-pointer"
                value={formData.staff_id}
                onChange={(e) => setFormData({...formData, staff_id: e.target.value})}
              >
                <option value="">Select...</option>
                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
              <input 
                type="date"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none text-sm"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>

          {/* Compact Actions */}
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-50 text-slate-400 font-black rounded-xl hover:bg-slate-100 transition-all text-[10px] uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-2 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={14} /> : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}