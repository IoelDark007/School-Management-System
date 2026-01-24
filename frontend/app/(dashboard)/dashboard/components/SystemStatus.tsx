// app/(dashboard)/dashboard/components/SystemStatus.tsx
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function SystemStatus() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/10 via-primary/5 to-accent-teal/10 p-8 text-foreground shadow-sm transition-all hover:shadow-md">
      {/* Decorative background circle */}
      <div className="absolute -right-6 -bottom-6 size-32 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-125" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-bold uppercase tracking-wide">
            System Status
          </h4>
          <ShieldCheck className="size-5 text-primary" />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative size-2.5">
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
            <div className="relative size-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-[14px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
            All Modules Online
          </span>
        </div>

        <p className="text-[12px] leading-relaxed text-muted-foreground">
          Last security scan completed 20 minutes ago. Database latency: 14ms.
        </p>

        {/* Optional extra status lines */}
        <div className="mt-3 grid grid-cols-2 gap-3 text-[10px] text-muted-foreground">
          <div>
            <span className="font-semibold text-foreground">API</span> • 99.98%
          </div>
          <div>
            <span className="font-semibold text-foreground">Storage</span> • 42%
          </div>
        </div>
      </div>
    </div>
  );
}