"use client";

import { useState, useEffect } from "react";
import { X, Save, Loader2, User, Mail, Briefcase, FileText } from "lucide-react";
import { apiRequest } from "@/src/lib/apiClient";

export function EditStaffModal({ 
  isOpen, 
  onClose, 
  staffData, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  staffData: any; 
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    department: "",
    employment_type: "",
    address: "",
    phone: "",
    admin_notes: ""
  });

  // Load existing data when modal opens
  useEffect(() => {
    if (staffData) {
      setFormData({
        first_name: staffData.first_name || staffData.fullName?.split(' ')[0] || "",
        last_name: staffData.last_name || staffData.fullName?.split(' ')[1] || "",
        email: staffData.email || "",
        role: staffData.role?.toLowerCase() || "teacher",
        department: staffData.department || "",
        employment_type: staffData.employment_type || "Full-Time (Tenured)",
        address: staffData.address || "",
        phone: staffData.phone || "",
        admin_notes: staffData.admin_notes || ""
      });
    }
  }, [staffData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest(`/staff/${staffData.id}/`, {
        method: "PATCH", // Use PATCH to update only changed fields
        body: JSON.stringify(formData),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Edit Staff Profile</h2>
              <p className="text-xs text-slate-500 font-medium">Update professional and personal information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section: Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="First Name" value={formData.first_name} onChange={(val: any) => setFormData({...formData, first_name: val})} />
            <FormInput label="Last Name" value={formData.last_name} onChange={(val: any) => setFormData({...formData, last_name: val})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Work Email" icon={<Mail size={14}/>} value={formData.email} onChange={(val: any) => setFormData({...formData, email: val})} />
            <FormInput label="Phone Number" value={formData.phone} onChange={(val: any) => setFormData({...formData, phone: val})} />
          </div>

          <hr className="border-slate-100" />

          {/* Section: Professional Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Briefcase size={10}/> Role
              </label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-100"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="teacher">Teacher</option>
                <option value="administrator">Administrator</option>
                <option value="support">Support</option>
              </select>
            </div>
            <FormInput label="Department" value={formData.department} onChange={(val: any) => setFormData({...formData, department: val})} />
          </div>

          <div className="space-y-1">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Employment Type</label>
             <input 
              type="text" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700"
              value={formData.employment_type}
              onChange={(e) => setFormData({...formData, employment_type: e.target.value})}
            />
          </div>

          {/* Section: Admin Notes */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileText size={10}/> Admin Notes
            </label>
            <textarea 
              rows={3}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-cyan-100 resize-none"
              placeholder="Add internal notes about performance or milestones..."
              value={formData.admin_notes}
              onChange={(e) => setFormData({...formData, admin_notes: e.target.value})}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-sm font-black text-slate-500 hover:bg-slate-50 rounded-xl transition-all uppercase tracking-widest">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-cyan-500 text-white text-sm font-black rounded-xl hover:bg-cyan-600 shadow-lg shadow-cyan-100 flex items-center justify-center gap-2 transition-all uppercase tracking-widest">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Small Input Component
function FormInput({ label, value, onChange, icon }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </label>
      <input 
        type="text"
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-100 transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}