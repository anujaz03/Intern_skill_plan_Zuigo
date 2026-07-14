"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  Search,
  PlusCircle,
  Database,
} from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Button } from "@/components/ui/button";

interface CustomerRecord {
  "Customer Name": string;
  Email: string;
  Phone: string;
  Company: string;
  Status: string;
  "Lead Source": string;
}

export default function ImportReviewPage() {
  const router = useRouter();

  // Mobile sidebar visibility toggle state
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Search filter query state
  const [searchQuery, setSearchQuery] = React.useState("");

  // Customer record data state (fallbacks to mock data if empty)
  const [records, setRecords] = React.useState<CustomerRecord[]>([]);

  React.useEffect(() => {
    // Attempt to load imported data from the window namespace object
    const imported = typeof window !== "undefined" ? (window as typeof window & { __leadflowImportedData?: CustomerRecord[] }).__leadflowImportedData : null;

    if (imported && Array.isArray(imported) && imported.length > 0) {
      setRecords(imported);
    } else {
      // Fallback mock records in case of page refresh or direct navigation
      setRecords([
        {
          "Customer Name": "Rohan Deshmukh",
          Email: "rohan@deshmukh.co",
          Phone: "9876543210",
          Company: "Deshmukh Consulting",
          Status: "VIP",
          "Lead Source": "Website Referral",
        },
        {
          "Customer Name": "Ananya Iyer",
          Email: "ananya.iyer@gmail.com",
          Phone: "8765432109",
          Company: "Iyer Tech Solutions",
          Status: "Lead",
          "Lead Source": "Cold Outreach",
        },
        {
          "Customer Name": "Vikram Chauhan",
          Email: "vikram@chauhanholdings.in",
          Phone: "7654321098",
          Company: "Chauhan Holdings",
          Status: "Partner",
          "Lead Source": "LinkedIn",
        },
        {
          "Customer Name": "Siddharth Malhotra",
          Email: "siddharth@malhotra.in",
          Phone: "6543210987",
          Company: "Malhotra Enterprises",
          Status: "VIP",
          "Lead Source": "Ad Campaign",
        },
        {
          "Customer Name": "Meera Sen",
          Email: "meera.sen@outlook.com",
          Phone: "5432109876",
          Company: "Sen Creative Agency",
          Status: "Lead",
          "Lead Source": "LinkedIn Referral",
        },
      ]);
    }
  }, []);

  // Filter records based on name/email/company search query
  const filteredRecords = React.useMemo(() => {
    if (!searchQuery.trim()) return records;
    const query = searchQuery.toLowerCase();
    return records.filter(
      (rec) =>
        rec["Customer Name"]?.toLowerCase().includes(query) ||
        rec.Email?.toLowerCase().includes(query) ||
        rec.Company?.toLowerCase().includes(query)
    );
  }, [records, searchQuery]);

  // TanStack Table columns definition
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
          <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
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
    data: filteredRecords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar Nav */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-grow flex flex-col lg:pl-[260px] min-h-screen">
        <TopNavbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Outer Content Pane */}
        <div className="flex-grow p-6 lg:p-8 max-w-5xl mx-auto w-full flex flex-col justify-start">
          
          {/* Header titles */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
                <Database className="h-6 w-6 text-blue-600" /> Review Imported Customers
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                View all parsed and formatted customer records in your workspace cache.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => router.push("/import")}
                variant="outline"
                className="flex items-center gap-2 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 font-semibold text-xs py-4"
              >
                <PlusCircle className="h-4 w-4 text-blue-600" /> Import New File
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="navy"
                className="flex items-center gap-2 font-semibold text-xs py-4"
              >
                <ArrowLeft className="h-4 w-4" /> Go to Dashboard
              </Button>
            </div>
          </div>

          {/* Search bar & count details */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              {/* Search Box */}
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by customer name, email, or company..."
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-xs placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 justify-end">
                <Users className="h-4 w-4 text-slate-400" /> {filteredRecords.length} records found
              </span>
            </div>

            {/* TanStack Table Records Grid */}
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
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-slate-400 font-semibold">
                        No matches found for search query.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50/50">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-3.5 font-medium whitespace-nowrap">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
