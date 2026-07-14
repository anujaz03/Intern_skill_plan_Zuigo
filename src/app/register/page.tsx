"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Zap, Sparkles, Check, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/auth/InputField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

export default function RegisterPage() {
  const router = useRouter();
  
  // State to handle submission loading and success screens
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Initialize react-hook-form with Zod validation resolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      companyName: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      businessType: "",
      agreeToTerms: undefined,
    },
  });

  const businessOptions = [
    "Retail / E-commerce",
    "Professional services",
    "Real estate",
    "Healthcare",
    "Agency / Consulting",
    "Other",
  ];

  // Handle form submission and simulate API response
  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    console.log("Simulating registration for workspace:", data);

    try {
      // Simulate network request delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Trigger success state
      setIsSuccess(true);
      setIsLoading(false);

      // Wait 1.5 seconds, then navigate to Company Setup
      setTimeout(() => {
        router.push("/company-setup");
      }, 1500);
    } catch (err) {
      console.error("Simulation error during registration:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-40">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-white">
                <Zap className="h-5 w-5 fill-white text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A] tracking-tight">LeadFlow AI</span>
            </Link>
            <div className="text-sm font-medium text-[#475569]">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5">
                Log in <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Registration Layout */}
      <div className="flex-grow py-12 lg:py-20">
        <Container className="max-w-4xl">
          {/* Header Title Section */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
              Everything your business needs to grow customer relationships
            </h1>
            <p className="mt-4 text-base text-[#475569]">
              Start managing your customers, leads and follow-ups in one place — built for small businesses, not enterprise complexity.
            </p>
          </div>

          {/* CRM Productivity Illustration Placeholder */}
          <div className="border border-dashed border-slate-200 rounded-3xl bg-white p-8 md:p-12 text-center mb-10 shadow-sm flex items-center justify-center min-h-[160px]">
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              CRM productivity illustration
            </span>
          </div>

          {/* Core Content: Split layout for benefits & the form card */}
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: Benefits & Trust badges */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Benefits</span>
                <div className="mt-4 flex flex-col gap-5">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">Manage customers</h3>
                      <p className="text-xs text-[#475569] mt-0.5">Centralize all your contacts, notes, and history in one place.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">Track leads</h3>
                      <p className="text-xs text-[#475569] mt-0.5">Visualize your pipeline and never lose a deal in your inbox.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A]">Never miss follow-ups</h3>
                      <p className="text-xs text-[#475569] mt-0.5">Automated reminders keep every customer conversation moving.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust block */}
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex -space-x-2 shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-slate-800 text-[10px] font-semibold text-white shadow-sm">RD</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-blue-600 text-[10px] font-semibold text-white shadow-sm">AI</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-emerald-600 text-[10px] font-semibold text-white shadow-sm">VC</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-amber-500 text-[10px] font-semibold text-white shadow-sm">PK</div>
                </div>
                <p className="text-[11px] font-medium text-[#475569] leading-tight">
                  Trusted by <span className="font-semibold text-[#0F172A]">200+</span> small businesses to manage their customer relationships.
                </p>
              </div>
            </div>

            {/* Right Column: Registration Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
                {/* Success Overlay Screen */}
                {isSuccess && (
                  <div className="absolute inset-0 bg-white z-50 flex flex-col justify-center items-center p-6 text-center animate-fade-in">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4 animate-bounce">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Account Created!</h2>
                    <p className="mt-2 text-sm text-[#475569]">
                      Welcome to LeadFlow AI. Redirecting to workspace setup...
                    </p>
                  </div>
                )}

                {/* Form Header */}
                <div className="mb-8">
                  <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                    <Sparkles className="h-3 w-3 fill-blue-600" />
                    CREATE YOUR FREE ACCOUNT
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Set up your workspace</h2>
                  <p className="text-xs text-[#475569] mt-1">
                    Start managing your customers, leads and follow-ups in one place.
                  </p>
                </div>

                {/* React Hook Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Company Name */}
                  <InputField
                    label="Company Name"
                    placeholder="e.g. Acme Corp"
                    hint="Your business or organization name"
                    error={errors.companyName?.message}
                    registration={register("companyName")}
                    disabled={isLoading}
                  />

                  {/* Full Name */}
                  <InputField
                    label="Full Name"
                    placeholder="e.g. Jane Smith"
                    hint="Your first and last name"
                    error={errors.fullName?.message}
                    registration={register("fullName")}
                    disabled={isLoading}
                  />

                  {/* Work Email */}
                  <InputField
                    label="Work Email"
                    type="email"
                    placeholder="jane@yourcompany.com"
                    hint="Use your business email address"
                    error={errors.email?.message}
                    registration={register("email")}
                    disabled={isLoading}
                  />

                  {/* Phone Number */}
                  <InputField
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="+1 (555) 000-0000"
                    hint="Used for account recovery only"
                    optional
                    error={errors.phone?.message}
                    registration={register("phone")}
                    disabled={isLoading}
                  />

                  {/* Password */}
                  <PasswordInput
                    label="Password"
                    placeholder="Create a strong password"
                    hint="Min. 8 characters, include a number"
                    error={errors.password?.message}
                    registration={register("password")}
                    disabled={isLoading}
                  />

                  {/* Confirm Password */}
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    error={errors.confirmPassword?.message}
                    registration={register("confirmPassword")}
                    disabled={isLoading}
                  />

                  {/* Business Type selector and checkboxes */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
                      Business Type
                    </label>
                    <select
                      {...register("businessType")}
                      disabled={isLoading}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select your business type...</option>
                      {businessOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Interactive checkboxes linked directly with select field */}
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5">
                      {businessOptions.map((opt) => {
                        const isSelected = watch("businessType") === opt;
                        return (
                          <label key={opt} className="flex items-center gap-3 cursor-pointer text-sm text-slate-700 select-none">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              disabled={isLoading}
                              onChange={() => setValue("businessType", opt, { shouldValidate: true })}
                              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.businessType && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {errors.businessType.message}
                      </p>
                    )}
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        disabled={isLoading}
                        {...register("agreeToTerms")}
                        className="h-4 w-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="agreeToTerms" className="text-xs text-slate-600 cursor-pointer leading-normal select-none">
                        I agree to the{" "}
                        <Link href="#" className="underline font-medium text-slate-900 hover:text-blue-600">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline font-medium text-slate-900 hover:text-blue-600">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-xs text-red-600 font-semibold mt-1">
                        {errors.agreeToTerms.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="navy"
                    disabled={isLoading}
                    className="w-full py-6 text-sm font-semibold justify-center flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create free account →"
                    )}
                  </Button>
                </form>

                {/* OR Divider */}
                <div className="my-6 flex items-center justify-between text-xs text-slate-400">
                  <hr className="w-full border-slate-200" />
                  <span className="px-3 shrink-0">OR</span>
                  <hr className="w-full border-slate-200" />
                </div>

                {/* Google OAuth Mock Button */}
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center flex items-center gap-2"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign up with Google
                </Button>

                {/* Alt Login Footer */}
                <div className="mt-8 text-center text-xs text-slate-500">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                    Log in
                  </Link>
                </div>

                {/* Mock Bottom subtext */}
                <div className="mt-4 flex justify-center gap-4 text-[10px] text-slate-400 font-medium">
                  <span>• No credit card required</span>
                  <span>• Free 14-day trial</span>
                  <span>• Cancel anytime</span>
                </div>
              </div>
            </div>
            
          </div>
        </Container>
      </div>
    </div>
  );
}
