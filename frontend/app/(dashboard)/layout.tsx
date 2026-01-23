import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
// import RightPanel from "@/components/dashboard/RightPanel";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        // <div className="flex h-screen overflow-hidden bg-surface-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <div className="flex h-screen overflow-hidden bg-surface-light text-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav />
                <section className="flex-1 overflow-y-auto p-8 space-y-8">{children}</section>
            </div>
            {/* <RightPanel /> */}
        </div >
    );
}
