"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, Search, Download, Eye, RefreshCcw, 
  CheckCircle2, Clock, AlertCircle, X, Check, 
  Banknote, Landmark, CreditCard, Loader2 
} from "lucide-react";

// --- TYPES ---
interface Payment {
  id: number;
  student_name: string;
  invoice_ref: string;
  amount: number;
  method: string;
  date: string;
  total_amount?: number;
  status: 'paid' | 'pending' | 'failed';
}

// --- MODAL COMPONENT ---
function RecordPaymentModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState<Payment[]>([]);
  const [formData, setFormData] = useState({
    invoice_id: "",
    amount: "",
    payment_method: "cash",
    reference_number: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:8000/invoices/?status=pending')
        .then(res => res.json())
        .then(data => setInvoices(Array.isArray(data) ? data : []))
        .catch(() => setInvoices([]));
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/payments/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
        onClose();
      } else { alert("Error saving payment"); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm">
      <div className="h-full w-full max-w-md bg-white shadow-2xl p-8 animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Record Payment</h2>
            <p className="text-sm text-slate-500">Log a new fee transaction</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Invoice</label>
            <select 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
              onChange={(e) => setFormData({...formData, invoice_id: e.target.value})}
            >
              <option value="">Select an unpaid invoice</option>
              {invoices.map((inv: any) => (
                <option key={inv.id} value={inv.id}>{inv.invoice_number} - {inv.student_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Amount</label>
            <input 
              type="number" required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              placeholder="0.00"
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 text-center">Method</label>
            <div className="grid grid-cols-3 gap-3">
              {['cash', 'transfer', 'card'].map((m) => (
                <button
                  key={m} type="button"
                  onClick={() => setFormData({...formData, payment_method: m})}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${formData.payment_method === m ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
                >
                  {m === 'cash' && <Banknote size={20}/>}
                  {m === 'transfer' && <Landmark size={20}/>}
                  {m === 'card' && <CreditCard size={20}/>}
                  <span className="text-[10px] font-bold uppercase mt-2">{m}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Check size={18}/>}
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPayments = async () => {
    try {
      const res = await fetch('http://localhost:8000/payments/');
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : dummyData);
    } catch { setPayments(dummyData); }
  };

  useEffect(() => { fetchPayments(); }, []);

  const filtered = payments.filter(p => 
    p.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.invoice_ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payments Management</h1>
          <p className="text-slate-500">Track and manage student fee transactions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          <Plus size={20} /> Record New Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Clock/>} label="Revenue (YTD)" value="$124,500" color="blue" />
        <StatCard icon={<CheckCircle2/>} label="Transactions" value="345" color="emerald" />
        <StatCard icon={<AlertCircle/>} label="Pending" value="$8,250" color="rose" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between bg-slate-50/50">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Search transactions..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold hover:bg-white transition-all">
            <Download size={16}/> Export
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Invoice</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 group transition-all">
                <td className="px-6 py-4 font-bold text-slate-700">{p.student_name}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{p.invoice_ref}</td>
                <td className="px-6 py-4 font-bold text-slate-900">${p.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"><Eye size={16}/></button>
                    <button className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"><RefreshCcw size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RecordPaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchPayments} 
      />
    </div>
  );
}

// --- HELPERS ---
function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${color}-50 text-${color}-600`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}

const dummyData: Payment[] = [
  { id: 1, student_name: "Alice Smith", invoice_ref: "INV-001", amount: 1200, method: "Card", date: "Oct 25", status: 'paid' },
  { id: 2, student_name: "Bob Johnson", invoice_ref: "INV-002", amount: 450, method: "Cash", date: "Oct 24", status: 'pending' },
];