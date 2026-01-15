// frontend/src/app/dashboard/layout.tsx
import { Sidebar } from "@/src/assets/components/dashboard/Sidebar";
import { TopNav } from "@/src/assets/components/dashboard/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Side Navigation Bar on the left as seen in screen.png */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar for search and profile */}
        <TopNav />
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}