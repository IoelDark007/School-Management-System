"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { 
  Plus, Trash2, ChevronRight, Calculator, User, Search, Check 
} from "lucide-react";

interface FeeItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
}

interface Student {
  id: number;
  full_name: string;
  admission_number: string;
}

interface AcademicYear {
  id: number;
  year_name: string;
}

export default function CreateInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Data from Backend
  const [students, setStudents] = useState<Student[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    { id: "1", description: "Tuition Fee", qty: 1, unitPrice: 0 },
  ]);
  
  const [formData, setFormData] = useState({
    studentId: 0,
    studentName: "Select a Student",
    academicYearId: "",
    term: "1",
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  // 1. Fetch Data on Mount
  useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch both at the same time
      const [stuRes, yearRes] = await Promise.all([
        fetch('http://localhost:8000/students/'),
        fetch('http://localhost:8000/academic-years/')
      ]);

      const stuData = await stuRes.json();
      const yearData = await yearRes.json();

      // Guard: Only set state if the response is actually an array
      if (Array.isArray(stuData)) {
        setStudents(stuData);
      } else {
        setStudents([]); 
      }

      if (Array.isArray(yearData)) {
        setAcademicYears(yearData);
      } else {
        setAcademicYears([]);
      }

    } catch (err) {
      console.error("API Connection Error:", err);
      setStudents([]);
      setAcademicYears([]);
    }
  };
  
  fetchData();
}, []);

  // Filtered student list
  const filteredStudents = students.filter(s => 
    s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.admission_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculations
  const subtotal = feeItems.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  const total = subtotal; // Simplified (add discount logic if needed)

  const handleGenerateAndSend = async () => {
    if (!formData.studentId || !formData.academicYearId) {
      alert("Please select both a student and an academic year.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        student_id: formData.studentId,
        academic_year_id: parseInt(formData.academicYearId),
        term: formData.term,
        total_amount: total,
        due_date: formData.dueDate,
        items: feeItems.map(item => ({
          description: item.description,
          amount: item.unitPrice * item.qty,
        }))
      };

      const res = await fetch(`http://localhost:8000/api/finance/invoices/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server error");
      router.push('/finance/invoices');
    } catch (err) {
      alert("Error saving invoice");
    } finally {
      setLoading(false);
    }
  };

  const updateItem = (id: string, field: keyof FeeItem, val: string | number) => {
    setFeeItems(feeItems.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={16} className="text-cyan-600" /> Student & Period
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Searchable Student Dropdown */}
              <div className="space-y-1 relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Search Student</label>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Type name or ID..."
                    value={searchQuery}
                    onFocus={() => setShowDropdown(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                {showDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl max-h-48 overflow-y-auto">
                        {filteredStudents.map(s => (
                            <div 
                                key={s.id}
                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                                onClick={() => {
                                    setFormData({...formData, studentId: s.id, studentName: s.full_name});
                                    setSearchQuery(s.full_name);
                                    setShowDropdown(false);
                                }}
                            >
                                <span className="text-sm font-bold text-slate-700">{s.full_name}</span>
                                <span className="text-[10px] font-bold text-slate-400">{s.admission_number}</span>
                            </div>
                        ))}
                    </div>
                )}
              </div>

              {/* Academic Year Selection */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Year</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none"
                  value={formData.academicYearId}
                  onChange={(e) => setFormData({...formData, academicYearId: e.target.value})}
                >
                  <option value="">Select Year</option>
                  {academicYears.map(y => (
                    <option key={y.id} value={y.id}>{y.year_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Calculator size={16} className="text-cyan-600" /> Fee Items
            </h2>

            {/* Fee Items Table... (Keep your existing mapping logic here) */}
            <div className="space-y-3">
              {feeItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="col-span-7">
                    <input 
                      placeholder="Description"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    />
                  </div>
                  <div className="col-span-4">
                    <input 
                      type="number"
                      placeholder="Amount"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-1">
                     <button onClick={() => setFeeItems(feeItems.filter(f => f.id !== item.id))} className="text-rose-500"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
              <button onClick={() => setFeeItems([...feeItems, {id: Date.now().toString(), description: "", qty: 1, unitPrice: 0}])} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold">+ ADD ITEM</button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
               <button 
                onClick={handleGenerateAndSend}
                disabled={loading}
                className="px-8 py-4 bg-cyan-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
               >
                 {loading ? "SAVING..." : "GENERATE & SEND"}
               </button>
            </div>
          </div>
        </div>

        {/* PREVIEW SECTION - Use formData.studentName for the "Bill To" section */}
        <div className="lg:col-span-5">
           <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-8">
              <h3 className="text-xl font-black mb-4">Preview</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-400 uppercase text-[10px] font-black">Student:</span> <span className="font-bold">{formData.studentName}</span></p>
                <p><span className="text-slate-400 uppercase text-[10px] font-black">Total:</span> <span className="font-bold text-cyan-600">${total.toLocaleString()}</span></p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}