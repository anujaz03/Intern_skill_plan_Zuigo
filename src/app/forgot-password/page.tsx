import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function ForgotPasswordPlaceholder() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6">
          <KeyRound className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Reset Password</h1>
        <p className="mt-4 text-sm text-[#475569] leading-relaxed">
          Forgot Password functionality will be implemented later.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Login
        </Link>
      </Container>
    </div>
  );
}
