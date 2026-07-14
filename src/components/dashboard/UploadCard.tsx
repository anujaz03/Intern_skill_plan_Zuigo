"use client";

import * as React from "react";
import { Upload, FileSpreadsheet, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  onUploadSuccess: (fileName: string) => void;
}

export function UploadCard({ onUploadSuccess }: UploadCardProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = React.useState<"idle" | "uploading" | "processing" | "success">("idle");
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // Handle drag hover states
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Validate file dimensions, formats, and simulate processing
  const validateAndUpload = async (file: File) => {
    setUploadError(null);

    // Limit to 25MB
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError("File size exceeds the 25 MB limit.");
      return;
    }

    // Format type check
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "csv" && extension !== "xlsx") {
      setUploadError("Invalid file type. Only .xlsx and .csv files are supported.");
      return;
    }

    setFileName(file.name);
    setUploadStatus("uploading");

    try {
      // Step 1: Simulate uploading (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUploadStatus("processing");

      // Step 2: Simulate AI processing & checks (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploadStatus("success");
      
      // Trigger parent callback to activate workspace checklist item
      onUploadSuccess(file.name);
    } catch {
      setUploadError("An error occurred while uploading. Please try again.");
      setUploadStatus("idle");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md">
      <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-4">
        Upload Business Data
      </h3>

      {/* Main Upload Drop Zone Wrapper */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[220px]",
          dragActive ? "border-blue-500 bg-blue-50/50" : "border-slate-200 bg-slate-50/50",
          uploadStatus !== "idle" && "pointer-events-none"
        )}
      >
        <input
          type="file"
          id="dashboard-file-upload"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploadStatus !== "idle"}
        />

        {/* State 1: Idle (Ready to upload) */}
        {uploadStatus === "idle" && (
          <label htmlFor="dashboard-file-upload" className="cursor-pointer flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6" />
            </div>
            <span className="text-sm font-bold text-slate-800">
              Drag & drop your file here, or <span className="text-blue-600 underline">browse</span>
            </span>
            <span className="text-xs text-slate-400 mt-1">
              Supports .xlsx and .csv files up to 25 MB
            </span>
          </label>
        )}

        {/* State 2: Uploading File */}
        {uploadStatus === "uploading" && (
          <div className="flex flex-col items-center animate-fade-in">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
            <p className="text-sm font-bold text-[#0F172A] truncate max-w-xs">
              Uploading {fileName}...
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Transferring file to secure workspace storage
            </p>
          </div>
        )}

        {/* State 3: AI Processing */}
        {uploadStatus === "processing" && (
          <div className="flex flex-col items-center animate-pulse">
            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 relative">
              <FileSpreadsheet className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </span>
            </div>
            <p className="text-sm font-bold text-[#0F172A] truncate max-w-xs">
              AI Processing {fileName}...
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Checking duplicate entries, structuring fields, and extracting CRM leads
            </p>
          </div>
        )}

        {/* State 4: Import Success */}
        {uploadStatus === "success" && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="text-sm font-bold text-emerald-700 truncate max-w-xs">
              Import Successful!
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              {fileName} has been processed. Dashboard is now ready for use.
            </p>
          </div>
        )}
      </div>

      {/* Inline File Errors */}
      {uploadError && (
        <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-700">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
          <span className="text-xs font-semibold leading-relaxed">{uploadError}</span>
        </div>
      )}

      {/* Upload Formatting Tips */}
      <div className="mt-6 border-t border-slate-100 pt-6">
        <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
          Upload Tips
        </h4>
        <ul className="space-y-2 text-xs text-[#475569]">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>First row must contain clear column headers.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>Customer Name or Company Name field is required.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>Email and Phone number columns recommended.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <span>Remove merged cells and formulas before importing.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Simple internal bullet indicator
function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
