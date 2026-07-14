"use client";

import * as React from "react";
import { Menu, Search, Bell, HelpCircle, User } from "lucide-react";

interface TopNavbarProps {
  workspaceName?: string;
  onOpenSidebar: () => void;
}

export function TopNavbar({ workspaceName = "Acme Corp Workspace", onOpenSidebar }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-6 shadow-sm">
      {/* Left side actions: hamburger menu & workspace name */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 text-[#475569] hover:bg-slate-50 lg:hidden transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
          {workspaceName}
        </span>
      </div>

      {/* Right side actions: Search, Bell, Help, Profile Avatar */}
      <div className="flex items-center gap-4 flex-grow max-w-md sm:max-w-xs md:max-w-sm justify-end ml-4">
        {/* Search Bar */}
        <div className="relative w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search workspace..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            className="h-8 w-8 flex items-center justify-center rounded-lg text-[#475569] hover:bg-slate-50 transition-colors relative"
            title="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
          </button>
          <button
            className="h-8 w-8 flex items-center justify-center rounded-lg text-[#475569] hover:bg-slate-50 transition-colors"
            title="Help"
          >
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* User profile avatar info */}
        <div className="flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 bg-slate-50 text-[#475569]">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
