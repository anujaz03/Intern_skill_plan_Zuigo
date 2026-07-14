"use client";

import * as React from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistCardProps {
  uploadState: "idle" | "uploading" | "processing" | "success";
}

export function ChecklistCard({ uploadState }: ChecklistCardProps) {
  const isProcessing = uploadState === "processing";
  const isSuccess = uploadState === "success";

  // Calculate dynamic checklist progress
  let completedCount = 2;
  if (isProcessing) completedCount = 3;
  if (isSuccess) completedCount = 5;

  const progressPercent = (completedCount / 5) * 100;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Card Header progress tracker */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
          Getting Started
        </h3>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {completedCount} of 5 completed
        </span>
      </div>

      {/* Progress fill bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist items list */}
      <div className="space-y-4">
        {/* Step 1: Create Account */}
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 fill-emerald-50" />
          <span className="text-xs font-medium text-slate-500 line-through">
            Create Account
          </span>
        </div>

        {/* Step 2: Company Setup */}
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 fill-emerald-50" />
          <span className="text-xs font-medium text-slate-500 line-through">
            Company Setup
          </span>
        </div>

        {/* Step 3: Upload Business Data */}
        <div className="flex items-center gap-3">
          {isSuccess || isProcessing ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 fill-emerald-50 animate-fade-in" />
          ) : (
            <Circle className="h-5 w-5 text-slate-300 shrink-0" />
          )}
          <span
            className={cn(
              "text-xs font-medium transition-colors",
              isSuccess || isProcessing ? "text-slate-500 line-through" : "text-[#0F172A]"
            )}
          >
            Upload Business Data
          </span>
        </div>

        {/* Step 4: AI Processing */}
        <div className="flex items-center gap-3">
          {isSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 fill-emerald-50 animate-fade-in" />
          ) : isProcessing ? (
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin shrink-0" />
          ) : (
            <Circle className="h-5 w-5 text-slate-300 shrink-0" />
          )}
          <span
            className={cn(
              "text-xs font-medium transition-colors",
              isSuccess ? "text-slate-500 line-through" : isProcessing ? "text-blue-600 font-bold" : "text-slate-400"
            )}
          >
            AI Processing
          </span>
        </div>

        {/* Step 5: CRM Ready */}
        <div className="flex items-center gap-3">
          {isSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 fill-emerald-50 animate-fade-in" />
          ) : (
            <Circle className="h-5 w-5 text-slate-300 shrink-0" />
          )}
          <span
            className={cn(
              "text-xs font-medium transition-colors",
              isSuccess ? "text-[#0F172A] font-bold" : "text-slate-400"
            )}
          >
            CRM Ready
          </span>
        </div>
      </div>
    </div>
  );
}
