"use client";

import KpiCard from "@/components/dashboard/KpiCard";
import {AttendanceChart} from "@/components/dashboard/AttendanceChart";
import {FeesChart} from "@/components/dashboard/FeesChart";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          title="Total Students"
          value={1200}
          icon="groups"
          change="+5%"
          color="white"
          bgColor="bg-blue-500"
        />
        <KpiCard
          title="Staff Members"
          value={85}
          icon="badge"
          change="+2%"
          color="white"
          bgColor="bg-green-500"
        />
        <KpiCard
          title="Fees Collected"
          value="$45,000"
          icon="payments"
          change="+12%"
          color="white"
          bgColor="bg-purple-500"
        />
        <KpiCard
          title="Exams Completed"
          value={340}
          icon="quiz"
          change="-1%"
          color="white"
          bgColor="bg-yellow-500"
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AttendanceChart />
        <FeesChart />
      </section>

      {/* Tables */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-slate-500 dark:text-slate-400 text-sm uppercase font-semibold">
                <tr>
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Student</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-200 text-sm">
                <tr className="border-t border-slate-200 dark:border-slate-700">
                  <td className="py-2 px-3">#1001</td>
                  <td className="py-2 px-3">John Doe</td>
                  <td className="py-2 px-3">$500</td>
                  <td className="py-2 px-3 text-green-600 font-semibold">Paid</td>
                  <td className="py-2 px-3">2026-01-20</td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-slate-700">
                  <td className="py-2 px-3">#1002</td>
                  <td className="py-2 px-3">Mary Smith</td>
                  <td className="py-2 px-3">$450</td>
                  <td className="py-2 px-3 text-red-600 font-semibold">Pending</td>
                  <td className="py-2 px-3">2026-01-21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
          <ul className="space-y-2 text-slate-700 dark:text-slate-200 text-sm">
            <li className="flex justify-between bg-slate-50 dark:bg-background-dark p-2 rounded-lg">
              <span>Science Fair</span>
              <span className="font-semibold text-blue-600">Jan 28</span>
            </li>
            <li className="flex justify-between bg-slate-50 dark:bg-background-dark p-2 rounded-lg">
              <span>Parent-Teacher Meeting</span>
              <span className="font-semibold text-green-600">Feb 5</span>
            </li>
            <li className="flex justify-between bg-slate-50 dark:bg-background-dark p-2 rounded-lg">
              <span>Exams Begin</span>
              <span className="font-semibold text-red-600">Feb 12</span>
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
}


