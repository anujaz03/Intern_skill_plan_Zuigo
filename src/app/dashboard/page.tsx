"use client";

import * as React from "react";
import {
  Sparkles,
  Download,
  AlertCircle,
  FileSpreadsheet,
  Users,
  Clock,
  TrendingUp,
  BarChart3,
  FileText,
  Upload,
  UserPlus,
  Calendar,
} from "lucide-react";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { UploadCard } from "@/components/dashboard/UploadCard";
import { WidgetCard } from "@/components/dashboard/WidgetCard";
import { ChecklistCard } from "@/components/dashboard/ChecklistCard";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // Mobile sidebar visibility toggle state
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // File upload state check to activate widgets
  const [uploadState, setUploadState] = React.useState<"idle" | "uploading" | "processing" | "success">("idle");
  const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(null);

  const handleUploadSuccess = (fileName: string) => {
    setUploadedFileName(fileName);
    setUploadState("success");
  };

  // handleUploadStart is ready for future custom upload integrations

  const isWorkspaceActive = uploadState === "success";

  // Quick action mock behaviors
  const handleQuickAction = (actionName: string) => {
    if (!isWorkspaceActive) return;
    alert(`${actionName} triggered successfully!`);
  };

  // --- High-Fidelity Active Widget Contents ---
  const activeCustomersContent = (
    <div className="space-y-3.5">
      <div className="flex justify-between items-center text-xs">
        <div>
          <p className="font-bold text-[#0F172A]">Rohan Deshmukh</p>
          <p className="text-[10px] text-slate-400">rohan@deshmukh.co</p>
        </div>
        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[9px] font-bold">VIP</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div>
          <p className="font-bold text-[#0F172A]">Ananya Iyer</p>
          <p className="text-[10px] text-slate-400">ananya.iyer@gmail.com</p>
        </div>
        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-bold">Lead</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div>
          <p className="font-bold text-[#0F172A]">Vikram Chauhan</p>
          <p className="text-[10px] text-slate-400">vikram@chauhanholdings.in</p>
        </div>
        <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-[9px] font-bold">Partner</span>
      </div>
    </div>
  );

  const activeFollowupsContent = (
    <div className="space-y-3">
      <div className="flex items-start gap-2.5 text-xs">
        <span className="h-2 w-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-ping" />
        <div>
          <p className="font-bold text-[#0F172A]">Call Rohan Deshmukh</p>
          <p className="text-[10px] text-slate-400">Scheduled for 2:00 PM today</p>
        </div>
      </div>
      <div className="flex items-start gap-2.5 text-xs">
        <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
        <div>
          <p className="font-bold text-[#0F172A]">Send proposal to Ananya</p>
          <p className="text-[10px] text-slate-400">Before 4:30 PM today</p>
        </div>
      </div>
    </div>
  );

  const activePipelineContent = (
    <div className="space-y-3.5">
      <div>
        <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1">
          <span>Discovery (3 leads)</span>
          <span>$12,500</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-[65%] rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1">
          <span>Won (2 deals)</span>
          <span>$32,700</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
        </div>
      </div>
    </div>
  );

  const activeSalesContent = (
    <div className="space-y-2">
      <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
        $45,200
      </div>
      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
        <span className="bg-emerald-50 px-1.5 py-0.5 rounded-md">+12.5%</span>
        <span className="text-slate-400">vs target goal</span>
      </div>
    </div>
  );

  const activeDocumentsContent = (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-[#0F172A] truncate max-w-[150px]">
          {uploadedFileName || "LeadList_AcmeCorp.csv"}
        </span>
        <span className="text-[9px] text-slate-400 font-medium">Just imported</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-[#0F172A] truncate max-w-[150px]">
          SampleTemplate_CRM.xlsx
        </span>
        <span className="text-[9px] text-slate-400 font-medium">Downloaded</span>
      </div>
    </div>
  );

  const activeInsightsContent = (
    <div className="space-y-2.5 text-[11px] leading-relaxed text-[#475569]">
      <p className="flex items-start gap-1.5">
        <span className="text-emerald-500 font-bold shrink-0">✔</span>
        <span>Rohan Deshmukh matches VIP high value customer parameters. Contact today.</span>
      </p>
      <p className="flex items-start gap-1.5">
        <span className="text-emerald-500 font-bold shrink-0">✔</span>
        <span>Ananya Iyer matches high intent pattern. Recommend sending proposal.</span>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Fixed Left Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Pane Wrapper */}
      <div className="flex-grow flex flex-col lg:pl-[260px] min-h-screen">
        {/* Top Navbar */}
        <TopNavbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Outer Grid Wrapper */}
        <div className="flex-grow p-6 lg:p-8 grid gap-8 lg:grid-cols-12 items-start max-w-7xl mx-auto w-full">
          
          {/* Left Column: Welcome, Uploader, and Grid Widgets */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Welcome onboarding card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_-20%,rgba(37,99,235,0.05),transparent_40%)] pointer-events-none" />
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600">
                  <Sparkles className="h-3 w-3 fill-blue-600/10" /> GETTING STARTED
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                  Welcome to LeadFlow AI
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] max-w-lg leading-relaxed">
                  Your workspace is ready. Import your customer or lead data using the excel/csv uploader to start utilizing AI CRM features.
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 sm:max-w-[200px] w-full">
                <Button
                  onClick={() => document.getElementById("dashboard-file-upload")?.click()}
                  variant="navy"
                  disabled={uploadState !== "idle"}
                  className="w-full justify-center text-xs font-semibold py-5"
                >
                  <Upload className="h-4 w-4" /> Upload Excel / CSV
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full justify-center text-xs font-semibold border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed py-5"
                >
                  Add Customer Manually
                </Button>
                <a
                  href="#"
                  className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 mt-1"
                >
                  <Download className="h-3 w-3" /> Download Sample Template
                </a>
              </div>
            </div>

            {/* Interactive Upload Card component */}
            <UploadCard
              onUploadSuccess={handleUploadSuccess}
            />

            {/* Widgets Dashboard Grid Area */}
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-4">
                CRM Overview
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* 1. Recent Customers Widget */}
                <WidgetCard
                  title="Recent Customers"
                  icon={Users}
                  isActive={isWorkspaceActive}
                  activeContent={activeCustomersContent}
                />

                {/* 2. Today's Follow-ups Widget */}
                <WidgetCard
                  title="Today's Follow-ups"
                  icon={Clock}
                  isActive={isWorkspaceActive}
                  activeContent={activeFollowupsContent}
                />

                {/* 3. Lead Pipeline Widget */}
                <WidgetCard
                  title="Lead Pipeline"
                  icon={TrendingUp}
                  isActive={isWorkspaceActive}
                  activeContent={activePipelineContent}
                />

                {/* 4. Sales Overview Widget */}
                <WidgetCard
                  title="Sales Overview"
                  icon={BarChart3}
                  isActive={isWorkspaceActive}
                  activeContent={activeSalesContent}
                />

                {/* 5. Recent Documents Widget */}
                <WidgetCard
                  title="Recent Documents"
                  icon={FileText}
                  isActive={isWorkspaceActive}
                  activeContent={activeDocumentsContent}
                />

                {/* 6. AI Insights Widget */}
                <WidgetCard
                  title="AI Insights"
                  icon={Sparkles}
                  isActive={isWorkspaceActive}
                  activeContent={activeInsightsContent}
                />
              </div>
            </div>
          </div>

          {/* Right Column Side Panel: Checklist, AI Info Card, and Quick Actions */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Onboarding Checklist Widget */}
            <ChecklistCard uploadState={uploadState} />

            {/* AI Assistant Explanation Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-blue-50/50 rounded-bl-full flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-blue-600 fill-blue-50/10 translate-x-2 -translate-y-2" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-2">
                What AI will do for you
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed mb-4">
                After importing your spreadsheet, the built-in LeadFlow AI parses records automatically:
              </p>
              <ul className="space-y-2.5 text-xs text-[#475569]">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span>Detect duplicate customer listings.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span>Identify and flag missing email or phone metrics.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span>Recommend custom smart follow-up reminders.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span>Generate customer behavior insight profiles.</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => document.getElementById("dashboard-file-upload")?.click()}
                  variant="outline"
                  disabled={uploadState !== "idle"}
                  className="w-full justify-start text-xs font-semibold py-5 border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                >
                  <Upload className="h-4 w-4 text-blue-600" /> Upload Excel
                </Button>
                <Button
                  onClick={() => document.getElementById("dashboard-file-upload")?.click()}
                  variant="outline"
                  disabled={uploadState !== "idle"}
                  className="w-full justify-start text-xs font-semibold py-5 border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                >
                  <FileSpreadsheet className="h-4 w-4 text-blue-600" /> Import CSV
                </Button>
                <Button
                  onClick={() => handleQuickAction("Add Customer")}
                  variant="outline"
                  disabled={!isWorkspaceActive}
                  className="w-full justify-start text-xs font-semibold py-5 border-slate-200 text-slate-400 bg-slate-50/50 cursor-not-allowed disabled:opacity-50"
                >
                  <UserPlus className="h-4 w-4" /> Add Customer
                </Button>
                <Button
                  onClick={() => handleQuickAction("Create Lead")}
                  variant="outline"
                  disabled={!isWorkspaceActive}
                  className="w-full justify-start text-xs font-semibold py-5 border-slate-200 text-slate-400 bg-slate-50/50 cursor-not-allowed disabled:opacity-50"
                >
                  <TrendingUp className="h-4 w-4" /> Create Lead
                </Button>
                <Button
                  onClick={() => handleQuickAction("Schedule Follow-up")}
                  variant="outline"
                  disabled={!isWorkspaceActive}
                  className="w-full justify-start text-xs font-semibold py-5 border-slate-200 text-slate-400 bg-slate-50/50 cursor-not-allowed disabled:opacity-50"
                >
                  <Calendar className="h-4 w-4" /> Schedule Follow-up
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer help desk block */}
        <footer className="border-t border-[#E2E8F0] py-6 px-8 bg-white mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#475569]">
            <p className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-blue-600" /> Need help importing your data?
            </p>
            <div className="flex gap-4">
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View Documentation
              </a>
              <span className="text-slate-300">|</span>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
