"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  TrendingUp,
  Download,
  AlertTriangle,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Button } from "@/components/ui/button";
import { downloadSampleTemplate } from "@/lib/utils/template";

// Interface defining parsed Customer record type
interface CustomerRecord {
  "Customer Name": string;
  Email: string;
  Phone: string;
  Company: string;
  Status: string;
  "Lead Source": string;
  [key: string]: string | number | boolean | undefined;
}

// Interface for validation warnings/errors
interface ValidationError {
  row?: number;
  column?: string;
  message: string;
  type: "error" | "warning";
}

export default function ImportWizardPage() {
  const router = useRouter();

  // Mobile sidebar visibility toggle state
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Stepper state: 1 (Upload), 2 (Validate), 3 (Preview), 4 (AI Analysis), 5 (Summary)
  const [step, setStep] = React.useState<1 | 2 | 3 | 4 | 5>(1);

  // Wizard state data
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [parsedData, setParsedData] = React.useState<CustomerRecord[]>([]);
  const [validationErrors, setValidationErrors] = React.useState<ValidationError[]>([]);
  
  // Drag and drop hover indicator
  const [dragActive, setDragActive] = React.useState(false);
  const [isParsing, setIsParsing] = React.useState(false);

  // AI checklist animation state
  const [aiChecklistIndex, setAiChecklistIndex] = React.useState(0);

  const aiTasks = [
    "Detecting duplicate customers...",
    "Cleaning phone numbers...",
    "Identifying missing emails...",
    "Standardizing company names...",
    "Finding follow-up opportunities...",
    "Preparing dashboard insights...",
  ];

  // Run SheetJS parsing on file input upload
  const handleFileUpload = (file: File) => {
    setIsParsing(true);
    setFileName(file.name);
    setValidationErrors([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Parse sheet into JSON object array
        const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

        if (!json || json.length === 0) {
          setValidationErrors([{ message: "The uploaded file is empty.", type: "error" }]);
          setStep(2);
          setIsParsing(false);
          return;
        }

        // Extract available columns
        const sheetHeaders = Object.keys(json[0] || {});
        
        // Validate required columns exist
        const requiredColumns = ["Customer Name", "Email", "Phone", "Company", "Status", "Lead Source"];
        const missingCols = requiredColumns.filter((col) => !sheetHeaders.includes(col));
        
        const errorsList: ValidationError[] = [];
        if (missingCols.length > 0) {
          missingCols.forEach((col) => {
            errorsList.push({
              message: `Missing required column: "${col}"`,
              type: "error",
            });
          });
        }

        // Run validation checks on each row
        const validatedRecords = json.map((row: Record<string, unknown>, index: number) => {
          const rowNum = index + 2; // offset for headers
          
          // Required field checks
          if (!row["Customer Name"] || String(row["Customer Name"]).trim() === "") {
            errorsList.push({
              row: rowNum,
              column: "Customer Name",
              message: `Empty required field: Customer Name is missing in Row ${rowNum}`,
              type: "error",
            });
          }

          // Email validation
          if (row.Email) {
            const emailStr = String(row.Email).trim();
            if (!emailStr.includes("@") || !emailStr.includes(".")) {
              errorsList.push({
                row: rowNum,
                column: "Email",
                message: `Invalid format: Email "${emailStr}" is invalid in Row ${rowNum}`,
                type: "warning",
              });
            }
          } else {
            errorsList.push({
              row: rowNum,
              column: "Email",
              message: `Missing recommended contact: Email is missing in Row ${rowNum}`,
              type: "warning",
            });
          }

          // Phone validation
          if (row.Phone) {
            const phoneStr = String(row.Phone).trim();
            const numericOnly = phoneStr.replace(/[^0-9]/g, "");
            if (numericOnly.length < 7) {
              errorsList.push({
                row: rowNum,
                column: "Phone",
                message: `Invalid format: Phone number "${phoneStr}" is invalid in Row ${rowNum}`,
                type: "warning",
              });
            }
          }

          return {
            "Customer Name": String(row["Customer Name"] || ""),
            Email: String(row.Email || ""),
            Phone: String(row.Phone || ""),
            Company: String(row.Company || ""),
            Status: String(row.Status || ""),
            "Lead Source": String(row["Lead Source"] || ""),
          } as CustomerRecord;
        });

        const seenNames = new Set<string>();
        validatedRecords.forEach((rec, idx) => {
          const name = String(rec["Customer Name"] || "").trim();
          if (name) {
            if (seenNames.has(name)) {
              errorsList.push({
                row: idx + 2,
                column: "Customer Name",
                message: `Duplicate record: Customer Name "${name}" is listed multiple times`,
                type: "warning",
              });
            }
            seenNames.add(name);
          }
        });

        // Store temporarily in state
        setParsedData(validatedRecords);
        setValidationErrors(errorsList);
        setIsParsing(false);
        setStep(2); // Advance to validation step
      } catch {
        setValidationErrors([{ message: "Corrupted file. SheetJS failed to read file bytes.", type: "error" }]);
        setIsParsing(false);
        setStep(2);
      }
    };

    reader.onerror = () => {
      setValidationErrors([{ message: "Failed to read file bytes.", type: "error" }]);
      setIsParsing(false);
      setStep(2);
    };

    reader.readAsArrayBuffer(file);
  };

  // Drag over handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Stepper triggers for AI animation
  React.useEffect(() => {
    if (step === 4) {
      setAiChecklistIndex(0);
      const interval = setInterval(() => {
        setAiChecklistIndex((prev) => {
          if (prev >= aiTasks.length - 1) {
            clearInterval(interval);
            // Wait 500ms after final check, then save state to window and transition to Summary
            setTimeout(() => {
              if (typeof window !== "undefined") {
                (window as typeof window & { __leadflowImportedData?: CustomerRecord[] }).__leadflowImportedData = parsedData;
              }
              setStep(5);
            }, 600);
            return prev;
          }
          return prev + 1;
        });
      }, 500); // 500ms per task simulation

      return () => clearInterval(interval);
    }
  }, [step, parsedData, aiTasks.length]);

  // Check if errors prevent import progression (Step 2 check)
  const hasCriticalErrors = validationErrors.some((err) => err.type === "error");

  // TanStack Table setup for Step 3 Preview (First 10 rows)
  const previewRows = parsedData.slice(0, 10);
  const columnHelper = createColumnHelper<CustomerRecord>();
  const columns = [
    columnHelper.accessor("Customer Name", {
      header: "Customer Name",
      cell: (info) => <span className="font-bold text-[#0F172A]">{info.getValue()}</span>,
    }),
    columnHelper.accessor("Email", {
      header: "Email",
      cell: (info) => info.getValue() || <span className="text-slate-400 font-medium">N/A</span>,
    }),
    columnHelper.accessor("Phone", {
      header: "Phone",
      cell: (info) => info.getValue() || <span className="text-slate-400 font-medium">N/A</span>,
    }),
    columnHelper.accessor("Company", {
      header: "Company",
      cell: (info) => info.getValue() || <span className="text-slate-400 font-medium">N/A</span>,
    }),
    columnHelper.accessor("Status", {
      header: "Status",
      cell: (info) => {
        const val = info.getValue();
        if (!val) return <span className="text-slate-400 font-medium">N/A</span>;
        return (
          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {val}
          </span>
        );
      },
    }),
    columnHelper.accessor("Lead Source", {
      header: "Lead Source",
      cell: (info) => info.getValue() || <span className="text-slate-400 font-medium">N/A</span>,
    }),
  ];

  const table = useReactTable({
    data: previewRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Calculate stats for Summary Step
  const recordCount = parsedData.length;
  const duplicateCount = validationErrors.filter((e) => e.message.includes("Duplicate")).length;
  const missingEmails = parsedData.filter((r) => !r.Email).length;
  const invalidPhones = validationErrors.filter((e) => e.column === "Phone").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Nav */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-grow flex flex-col lg:pl-[260px] min-h-screen">
        <TopNavbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Wizard Main Content Pane */}
        <div className="flex-grow p-6 lg:p-8 max-w-4xl mx-auto w-full flex flex-col justify-start">
          
          {/* Stepper Steps Navigation Indicator */}
          <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="h-6 w-6 text-blue-600" /> Business Data Import Wizard
            </h1>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <span className={step >= 1 ? "text-blue-600" : ""}>1</span>
              <span>•</span>
              <span className={step >= 2 ? "text-blue-600" : ""}>2</span>
              <span>•</span>
              <span className={step >= 3 ? "text-blue-600" : ""}>3</span>
              <span>•</span>
              <span className={step >= 4 ? "text-blue-600" : ""}>4</span>
              <span>•</span>
              <span className={step >= 5 ? "text-blue-600" : ""}>5</span>
            </div>
          </div>

          {/* STEP 1: Upload Step */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-4">
                  Select Import File
                </h3>

                {/* Upload drag dropzone */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all min-h-[220px]",
                    dragActive ? "border-blue-500 bg-blue-50/50" : "border-slate-200 bg-slate-50/50",
                    isParsing && "pointer-events-none"
                  )}
                >
                  <input
                    type="file"
                    id="wizard-file-chooser"
                    accept=".csv,.xlsx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    disabled={isParsing}
                  />

                  {isParsing ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                      <p className="text-sm font-bold text-slate-800">
                        Parsing spreadsheet data...
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Reading sheets and rows using SheetJS
                      </p>
                    </div>
                  ) : (
                    <label htmlFor="wizard-file-chooser" className="cursor-pointer flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                        <Upload className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        Drag & drop your file here, or <span className="text-blue-600 underline">browse</span>
                      </span>
                      <span className="text-xs text-slate-400 mt-1">
                        Supports Excel (.xlsx) and CSV (.csv) files up to 25 MB
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Sample file download block */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Need a structured template?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Download our ready-to-use template with required columns to ensure clean formatting.
                  </p>
                </div>
                <Button
                  onClick={downloadSampleTemplate}
                  variant="outline"
                  className="shrink-0 flex items-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  <Download className="h-4 w-4" /> Download Sample
                </Button>
              </div>

              {/* Tips Section */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
                  Upload Tips
                </h4>
                <ul className="space-y-2.5 text-xs text-[#475569]">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>First row must contain clear column headers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>Required columns: <b>Customer Name, Email, Phone, Company, Status, Lead Source</b>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>Ensure rows do not contain merged cells or raw calculation formulas.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* STEP 2: Validation Results */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                {hasCriticalErrors ? (
                  <div className="flex items-center gap-3 text-red-700 bg-red-50 p-4 border border-red-100 rounded-2xl mb-6">
                    <AlertCircle className="h-6 w-6 text-red-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold">Data Validation Failed</p>
                      <p className="text-xs text-red-600">Please resolve critical errors before continuing.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 border border-emerald-100 rounded-2xl mb-6">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold">File looks good!</p>
                      <p className="text-xs text-emerald-600">{recordCount} records detected and ready for preview.</p>
                    </div>
                  </div>
                )}

                <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-4">
                  Validation Log
                </h3>

                {validationErrors.length === 0 ? (
                  <div className="border border-slate-200 rounded-2xl p-6 text-center text-slate-500 bg-slate-50/50">
                    <span className="text-xs font-semibold">No issues or warning flags detected.</span>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2">
                    {validationErrors.map((err, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "p-3.5 border rounded-xl text-xs flex gap-3 items-start",
                          err.type === "error"
                            ? "bg-red-50/50 border-red-100 text-red-700"
                            : "bg-amber-50/30 border-amber-100 text-amber-800"
                        )}
                      >
                        {err.type === "error" ? (
                          <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <p className="font-bold flex items-center gap-1.5 text-slate-900">
                            {err.type === "error" ? "CRITICAL ERROR" : "WARNING"}
                            {err.row && <span className="font-normal text-slate-500">Row {err.row}</span>}
                          </p>
                          <p className="mt-1 text-slate-600 leading-normal">{err.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Wizard navigation */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={() => setStep(3)}
                  variant="navy"
                  disabled={hasCriticalErrors}
                  className="w-full py-6 font-semibold justify-center flex items-center gap-2 order-last sm:order-first"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => {
                    setStep(1);
                    setParsedData([]);
                    setFileName(null);
                  }}
                  variant="outline"
                  className="w-full py-6 font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center"
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Preview Table */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-2">
                  Import Preview
                </h3>
                <p className="text-xs text-[#475569] mb-6">
                  Review the first 10 rows of your file. Data will only be saved after confirmation.
                </p>

                {/* Import parameters summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl mb-6 text-center border border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">File Name</span>
                    <p className="text-xs font-bold text-[#0F172A] truncate mt-1">{fileName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Rows</span>
                    <p className="text-xs font-bold text-[#0F172A] mt-1">{recordCount}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Missing Emails</span>
                    <p className="text-xs font-bold text-[#0F172A] mt-1">{missingEmails}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Duplicate Rows</span>
                    <p className="text-xs font-bold text-[#0F172A] mt-1">{duplicateCount}</p>
                  </div>
                </div>

                {/* Spreadsheet TanStack Preview Table */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs text-slate-700">
                    <thead>
                      {table.getHeaderGroups().map((group) => (
                        <tr key={group.id} className="border-b border-slate-200 bg-slate-50">
                          {group.headers.map((header) => (
                            <th key={header.id} className="px-4 py-3.5 font-bold text-[#0F172A] uppercase tracking-wider text-[10px]">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50/50">
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-3.5 font-medium whitespace-nowrap">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mt-3 text-right">
                  Showing first 10 of {recordCount} rows
                </p>
              </div>

              {/* Wizard navigation */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={() => setStep(4)}
                  variant="navy"
                  className="w-full py-6 font-semibold justify-center flex items-center gap-2 order-last sm:order-first"
                >
                  Continue to AI Analysis <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="w-full py-6 font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center"
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: AI Analysis checklist simulation */}
          {step === 4 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6 relative">
                <Sparkles className="h-8 w-8 animate-pulse text-blue-600 fill-blue-50/10" />
                <Loader2 className="h-16 w-16 text-blue-200 animate-spin absolute" />
              </div>
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">
                Simulating AI Cleaning & Insights
              </h2>
              <p className="text-xs text-[#475569] mb-8 max-w-xs leading-normal">
                Structuring fields, parsing duplicate names, and building follow-up schedules.
              </p>

              {/* Animated Checklist box */}
              <div className="w-full max-w-sm border border-slate-100 rounded-2xl p-5 bg-slate-50/50 space-y-3.5 text-left">
                {aiTasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    {idx < aiChecklistIndex ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 fill-emerald-50 animate-fade-in" />
                    ) : idx === aiChecklistIndex ? (
                      <Loader2 className="h-4.5 w-4.5 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="h-4.5 w-4.5 rounded-full border border-slate-200 shrink-0" />
                    )}
                    <span
                      className={cn(
                        "font-medium transition-colors",
                        idx < aiChecklistIndex ? "text-slate-500 line-through" : idx === aiChecklistIndex ? "text-blue-600 font-bold" : "text-slate-400"
                      )}
                    >
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Import Summary & AI Recommendations */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              {/* Completed block */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 border border-emerald-100 rounded-2xl mb-6">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 fill-emerald-50" />
                  <div>
                    <p className="text-sm font-bold">Import Completed Successfully</p>
                    <p className="text-xs text-emerald-600">Your CRM data is structured and ready.</p>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#0F172A] tracking-tight mb-4">
                  Import Summary
                </h3>

                {/* Import parameters log values */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-400 uppercase text-[10px]">File Name</span>
                    <p className="font-bold text-[#0F172A] mt-1 truncate">{fileName}</p>
                  </div>
                  <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-400 uppercase text-[10px]">Imported Records</span>
                    <p className="font-bold text-slate-900 mt-1">{recordCount - duplicateCount} records</p>
                  </div>
                  <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-400 uppercase text-[10px]">Duplicates Merged</span>
                    <p className="font-bold text-slate-900 mt-1">{duplicateCount} duplicates</p>
                  </div>
                  <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    <span className="font-semibold text-slate-400 uppercase text-[10px]">Invalid Phone Numbers</span>
                    <p className="font-bold text-slate-900 mt-1">{invalidPhones} corrected</p>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Cards */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
                  LeadFlow AI Recommendations
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-slate-200 rounded-2xl bg-white p-5 flex gap-3.5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-10 w-10 bg-blue-50/50 rounded-bl-full flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-blue-600 fill-blue-50/10 translate-x-1.5 -translate-y-1.5" />
                    </div>
                    <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Follow-up Needed</h4>
                      <p className="text-[11px] text-[#475569] mt-1 leading-normal">
                        8 customer contacts require immediate follow-up based on lead status flags.
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl bg-white p-5 flex gap-3.5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-10 w-10 bg-blue-50/50 rounded-bl-full flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-blue-600 fill-blue-50/10 translate-x-1.5 -translate-y-1.5" />
                    </div>
                    <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Incomplete Contact Details</h4>
                      <p className="text-[11px] text-[#475569] mt-1 leading-normal">
                        {missingEmails} customer entries are missing email addresses. Clean profiles now.
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl bg-white p-5 flex gap-3.5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-10 w-10 bg-blue-50/50 rounded-bl-full flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-blue-600 fill-blue-50/10 translate-x-1.5 -translate-y-1.5" />
                    </div>
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">High Priority Leads</h4>
                      <p className="text-[11px] text-[#475569] mt-1 leading-normal">
                        12 incoming leads match high conversion patterns. Recommend prioritizing outreach.
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-2xl bg-white p-5 flex gap-3.5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-10 w-10 bg-blue-50/50 rounded-bl-full flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-blue-600 fill-blue-50/10 translate-x-1.5 -translate-y-1.5" />
                    </div>
                    <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Cleaned Listings</h4>
                      <p className="text-[11px] text-[#475569] mt-1 leading-normal">
                        {duplicateCount} duplicate companies and names resolved and consolidated automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wizard final actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="navy"
                  className="w-full py-6 font-semibold justify-center flex items-center gap-2 order-last sm:order-first"
                >
                  Go to Dashboard
                </Button>
                <Button
                  onClick={() => router.push("/import/review")}
                  variant="outline"
                  className="w-full py-6 font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center"
                >
                  Review Imported Data
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Simple CN Tailwind class merger helper
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
