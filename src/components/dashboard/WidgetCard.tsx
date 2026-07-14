"use client";

import * as React from "react";
import { LucideIcon, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetCardProps {
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  activeContent: React.ReactNode;
}

export function WidgetCard({ title, icon: Icon, isActive, activeContent }: WidgetCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-white p-6 shadow-sm flex flex-col justify-between min-h-[200px] transition-all duration-300",
        isActive ? "border-slate-200" : "border-slate-200 bg-[#FAFAFA] opacity-75"
      )}
    >
      {/* Widget Header Area */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
              isActive ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-400"
            )}
          >
            <Icon className="h-4.5 w-4.5" />
          </div>
          <span className={cn("text-xs font-bold tracking-tight", isActive ? "text-[#0F172A]" : "text-slate-500")}>
            {title}
          </span>
        </div>
        <HelpCircle className="h-4 w-4 text-slate-300 cursor-help" />
      </div>

      {/* Widget Content Area */}
      <div className="flex-grow flex flex-col justify-center">
        {isActive ? (
          <div className="animate-fade-in text-slate-700 h-full">{activeContent}</div>
        ) : (
          <div className="border border-dashed border-slate-200 rounded-2xl py-6 flex flex-col items-center justify-center bg-slate-50/50">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              No data yet
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              Upload business files to activate
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
