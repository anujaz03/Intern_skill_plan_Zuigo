import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function CompanySetupPlaceholder() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Account Created Successfully!</h1>
        <p className="mt-4 text-sm text-[#475569] leading-relaxed">
          Welcome to LeadFlow AI. Your workspace is ready for setup.
        </p>
        
        <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl w-full text-left">
          <h3 className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2">Next Step</h3>
          <p className="text-xs text-[#475569] leading-relaxed">
            You will now set up your company details, invite team members, and configure your CRM preferences.
          </p>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Go back to Landing Page <ArrowRight className="h-4 w-4" />
        </Link>
      </Container>
    </div>
  );
}
