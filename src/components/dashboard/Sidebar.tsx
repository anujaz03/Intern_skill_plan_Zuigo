"use client";

import * as React from "react";
import Link from "next/link";
import {
  Zap,
  LayoutDashboard,
  Users,
  TrendingUp,
  Clock,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Navigation links array
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Customers", icon: Users, active: false },
    { name: "Leads", icon: TrendingUp, active: false },
    { name: "Follow-ups", icon: Clock, active: false },
    { name: "Documents", icon: FileText, active: false },
    { name: "Reports", icon: BarChart3, active: false },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 w-[260px] bg-white border-r border-[#E2E8F0] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header Logo section */}
        <div className="h-16 px-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-white">
              <Zap className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="text-lg font-bold text-[#0F172A] tracking-tight">LeadFlow AI</span>
          </Link>
          {/* Close button on mobile views */}
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-[#475569] lg:hidden hover:bg-slate-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Link Area */}
        <nav className="flex-grow px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all select-none",
                item.active
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] cursor-not-allowed opacity-50"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", item.active ? "text-blue-600" : "text-[#475569]")} />
              <span>{item.name}</span>
            </div>
          ))}

          {/* Settings Section (placed in nav list as disabled action) */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] transition-all cursor-not-allowed opacity-50 select-none">
            <Settings className="h-5 w-5 shrink-0 text-[#475569]" />
            <span>Settings</span>
          </div>
        </nav>

        {/* Footer Sidebar Actions */}
        <div className="p-4 border-t border-[#E2E8F0] space-y-1.5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#475569] hover:bg-slate-50 hover:text-[#0F172A] transition-all cursor-not-allowed opacity-50 select-none">
            <HelpCircle className="h-5 w-5 shrink-0 text-[#475569]" />
            <span>Help & Docs</span>
          </div>
          
          <Link href="/login">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all cursor-pointer">
              <LogOut className="h-5 w-5 shrink-0 text-red-600" />
              <span>Logout</span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
