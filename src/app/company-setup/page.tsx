"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Zap,
  Sparkles,
  Loader2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Building2,
  Settings,
  CheckCircle2,
  Database,
  X,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/auth/InputField";
import {
  businessInfoSchema,
  workspacePrefSchema,
  type BusinessInfoInput,
  type WorkspacePrefInput,
} from "@/lib/validations/onboarding";

type OnboardingStage = "welcome" | "step1" | "step2" | "success" | "dashboard-welcome";

export default function CompanySetupPage() {
  const router = useRouter();

  // Wizard onboarding stage state
  const [stage, setStage] = React.useState<OnboardingStage>("welcome");

  // Loading state for each transition step
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Consolidated onboarding data storage
  const [businessData, setBusinessData] = React.useState<BusinessInfoInput | null>(null);

  // Logo upload state management
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [logoError, setLogoError] = React.useState<string | null>(null);

  // --- Step 1: Business Information Form ---
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
  } = useForm<BusinessInfoInput>({
    resolver: zodResolver(businessInfoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // --- Step 2: Workspace Preferences Form ---
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
  } = useForm<WorkspacePrefInput>({
    resolver: zodResolver(workspacePrefSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Handle Step 1 continue click
  const onStep1Submit = async (data: BusinessInfoInput) => {
    setIsSubmitting(true);
    // Simulate short compilation/validation delay (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setBusinessData(data);
    setIsSubmitting(false);
    setStage("step2");
  };

  // Handle Logo Upload and Validation
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Maximum 2MB size check
    if (file.size > 2 * 1024 * 1024) {
      setLogoError("Logo size must be less than 2 MB.");
      return;
    }

    // Supported formats validation
    const validFormats = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!validFormats.includes(file.type)) {
      setLogoError("Unsupported format. Please upload PNG, JPEG or SVG.");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // Remove uploaded logo file and clear preview
  const removeLogo = () => {
    setLogoFile(null);
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoPreview(null);
    setLogoError(null);
  };

  // Handle Step 2 final onboarding submission
  const onStep2Submit = async (data: WorkspacePrefInput) => {
    setIsSubmitting(true);
    // Simulate final workspace setup build delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Save state and redirect to Success page
    console.log("Workspace settings configured:", {
      ...businessData,
      ...data,
      logoName: logoFile?.name,
    });

    setIsSubmitting(false);
    setStage("success");
  };

  // Automatic timer transition from Success Screen to Dashboard Welcome
  React.useEffect(() => {
    if (stage === "success") {
      const timer = setTimeout(() => {
        setStage("dashboard-welcome");
      }, 2500); // Wait 2.5 seconds as per requirements
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Handle navigation redirecting to mock Dashboard route
  const handleGoToDashboard = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  const businessTypes = [
    "Retail",
    "Healthcare",
    "Education",
    "Technology",
    "Finance",
    "Manufacturing",
    "Real Estate",
    "Hospitality",
    "Other",
  ];

  const companySizes = ["1–10", "11–50", "51–200", "201–500", "500+"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navbar Header */}
      <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-40">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-white">
                <Zap className="h-5 w-5 fill-white text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A] tracking-tight">LeadFlow AI</span>
            </div>
            {stage === "welcome" && (
              <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </Link>
            )}
          </div>
        </Container>
      </header>

      {/* Main Setup Content Area */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Container className="max-w-xl w-full">
          
          {/* STAGE 1: Welcome Onboarding Screen */}
          {stage === "welcome" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl text-center flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                <Sparkles className="h-9 w-9 fill-blue-600/10" />
              </div>
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                ONBOARDING SETUP
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-2">
                Welcome to LeadFlow AI
              </h1>
              <p className="mt-4 text-sm text-[#475569] leading-relaxed max-w-sm">
                Your account has been created successfully. Let&apos;s spend less than one minute setting up your workspace to personalize your CRM experience.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={() => setStage("step1")}
                  variant="navy"
                  className="w-full py-6 font-semibold justify-center flex items-center gap-2"
                >
                  Start Setup <ArrowRight className="h-4 w-4" />
                </Button>
                <Link href="/login" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full py-6 font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center"
                  >
                    Back
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* STAGE 2: Step 1 (Business Information Form) */}
          {stage === "step1" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl">
              {/* Wizard Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-semibold text-[#475569] mb-2">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-blue-600">
                    <Building2 className="h-4 w-4" /> Step 1: Business Info
                  </span>
                  <span>Step 1 of 2</span>
                </div>
                {/* Horizontal Progress bar fill */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-300 w-1/2" />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-2">
                Tell us about your business
              </h2>
              <p className="text-xs text-[#475569] mb-6">
                Please fill in your company details to customize your sales tools.
              </p>

              <form onSubmit={handleSubmitStep1(onStep1Submit)} className="space-y-5">
                {/* Company Name */}
                <InputField
                  label="Company Name *"
                  placeholder="e.g. Acme Corp"
                  error={errorsStep1.companyName?.message}
                  registration={registerStep1("companyName")}
                  disabled={isSubmitting}
                />

                {/* Business Type dropdown selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
                    Business Type *
                  </label>
                  <select
                    {...registerStep1("businessType")}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select business type...</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errorsStep1.businessType && (
                    <p className="text-xs text-red-600 font-semibold leading-normal">
                      {errorsStep1.businessType.message}
                    </p>
                  )}
                </div>

                {/* Industry Input */}
                <InputField
                  label="Industry *"
                  placeholder="e.g. Software, E-Commerce, Consulting"
                  error={errorsStep1.industry?.message}
                  registration={registerStep1("industry")}
                  disabled={isSubmitting}
                />

                {/* Company Size select dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
                    Company Size *
                  </label>
                  <select
                    {...registerStep1("companySize")}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select size...</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errorsStep1.companySize && (
                    <p className="text-xs text-red-600 font-semibold leading-normal">
                      {errorsStep1.companySize.message}
                    </p>
                  )}
                </div>

                {/* Business Email */}
                <InputField
                  label="Business Email *"
                  type="email"
                  placeholder="info@acmecorp.com"
                  error={errorsStep1.businessEmail?.message}
                  registration={registerStep1("businessEmail")}
                  disabled={isSubmitting}
                />

                {/* Business Phone (Optional) */}
                <InputField
                  label="Business Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  optional
                  error={errorsStep1.businessPhone?.message}
                  registration={registerStep1("businessPhone")}
                  disabled={isSubmitting}
                />

                {/* Company Website (Optional) */}
                <InputField
                  label="Company Website"
                  type="text"
                  placeholder="www.acmecorp.com"
                  optional
                  error={errorsStep1.companyWebsite?.message}
                  registration={registerStep1("companyWebsite")}
                  disabled={isSubmitting}
                />

                {/* Navigation Buttons for Step 1 */}
                <div className="mt-8 pt-4 flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    type="submit"
                    variant="navy"
                    disabled={isSubmitting}
                    className="w-full py-6 font-semibold justify-center flex items-center gap-2 order-last sm:order-first"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStage("welcome")}
                    variant="outline"
                    disabled={isSubmitting}
                    className="w-full py-6 font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center"
                  >
                    Back
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* STAGE 3: Step 2 (Workspace Preferences Form) */}
          {stage === "step2" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl">
              {/* Wizard Progress Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-semibold text-[#475569] mb-2">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-blue-600">
                    <Settings className="h-4 w-4" /> Step 2: Preferences
                  </span>
                  <span>Step 2 of 2</span>
                </div>
                {/* Horizontal Progress bar fill */}
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-300 w-full" />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight mb-2">
                Workspace preferences
              </h2>
              <p className="text-xs text-[#475569] mb-6">
                Configure your region, currency, time zone, and workspace branding.
              </p>

              <form onSubmit={handleSubmitStep2(onStep2Submit)} className="space-y-5">
                {/* Country Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
                    Country *
                  </label>
                  <select
                    {...registerStep2("country")}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select country...</option>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Other">Other</option>
                  </select>
                  {errorsStep2.country && (
                    <p className="text-xs text-red-600 font-semibold leading-normal">
                      {errorsStep2.country.message}
                    </p>
                  )}
                </div>

                {/* State (Optional) */}
                <InputField
                  label="State"
                  placeholder="e.g. California"
                  optional
                  error={errorsStep2.state?.message}
                  registration={registerStep2("state")}
                  disabled={isSubmitting}
                />

                {/* City (Optional) */}
                <InputField
                  label="City"
                  placeholder="e.g. San Francisco"
                  optional
                  error={errorsStep2.city?.message}
                  registration={registerStep2("city")}
                  disabled={isSubmitting}
                />

                {/* Time Zone dropdown selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
                    Time Zone *
                  </label>
                  <select
                    {...registerStep2("timeZone")}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select time zone...</option>
                    <option value="GMT">GMT (Greenwich Mean Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="CST">CST (Central Standard Time)</option>
                    <option value="IST">IST (Indian Standard Time)</option>
                    <option value="CET">CET (Central European Time)</option>
                    <option value="AEST">AEST (Australian Eastern Standard Time)</option>
                  </select>
                  {errorsStep2.timeZone && (
                    <p className="text-xs text-red-600 font-semibold leading-normal">
                      {errorsStep2.timeZone.message}
                    </p>
                  )}
                </div>

                {/* Preferred Currency dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
                    Preferred Currency *
                  </label>
                  <select
                    {...registerStep2("preferredCurrency")}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select currency...</option>
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                  {errorsStep2.preferredCurrency && (
                    <p className="text-xs text-red-600 font-semibold leading-normal">
                      {errorsStep2.preferredCurrency.message}
                    </p>
                  )}
                </div>

                {/* Company Logo Upload Component */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
                      Company Logo
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Optional</span>
                  </div>

                  {/* Logo Upload Interface Block */}
                  {logoPreview ? (
                    <div className="relative border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-slate-50">
                      <div className="h-16 w-16 rounded-lg border border-slate-200 bg-white overflow-hidden flex items-center justify-center shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-xs font-bold text-[#0F172A] truncate">
                          {logoFile?.name}
                        </p>
                        <p className="text-[10px] text-[#475569] mt-0.5">
                          {(logoFile!.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="h-7 w-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors shrink-0"
                        title="Remove logo"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors text-center">
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        onChange={handleLogoChange}
                        disabled={isSubmitting}
                        className="hidden"
                      />
                      <Upload className="h-6 w-6 text-slate-400 mb-2" />
                      <span className="text-xs font-semibold text-slate-600">
                        Click to upload logo
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        PNG, JPEG or SVG (max. 2MB)
                      </span>
                    </label>
                  )}

                  {/* Display Logo Validation Errors */}
                  {logoError && (
                    <p className="text-xs text-red-600 font-semibold mt-1">
                      {logoError}
                    </p>
                  )}
                </div>

                {/* Wizard navigation buttons */}
                <div className="mt-8 pt-4 flex flex-col sm:flex-row gap-3 w-full">
                  <Button
                    type="submit"
                    variant="navy"
                    disabled={isSubmitting}
                    className="w-full py-6 font-semibold justify-center flex items-center gap-2 order-last sm:order-first"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Finishing Setup...
                      </>
                    ) : (
                      "Finish Setup"
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStage("step1")}
                    variant="outline"
                    disabled={isSubmitting}
                    className="w-full py-6 font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center"
                  >
                    Back
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* STAGE 4: Success Screen */}
          {stage === "success" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl text-center flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6">
                <CheckCircle2 className="h-12 w-12 animate-bounce" />
              </div>
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600">
                SUCCESS
              </span>
              <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight mt-2">
                Workspace Created Successfully!
              </h1>
              <p className="mt-4 text-sm text-[#475569] leading-relaxed max-w-xs">
                Your LeadFlow workspace has been configured successfully. Your CRM is ready.
              </p>

              {/* Progress animation loader */}
              <div className="mt-8 w-full">
                <div className="flex justify-between items-center text-[11px] text-slate-400 font-semibold mb-1.5">
                  <span>Loading your workspace...</span>
                  <span>90%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-[pulse_1.5s_infinite] w-[90%]" />
                </div>
              </div>
            </div>
          )}

          {/* STAGE 5: Welcome to Dashboard Screen */}
          {stage === "dashboard-welcome" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl text-center flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
                <Database className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                Welcome to LeadFlow AI
              </h1>
              <p className="mt-4 text-sm text-[#475569] leading-relaxed max-w-sm">
                Your workspace is now ready. The next step is importing your existing business data so LeadFlow can begin managing your customers and leads.
              </p>

              {/* CRM onboarding Mock Illustration Box */}
              <div className="mt-6 w-full border border-[#E2E8F0] rounded-2xl p-6 bg-slate-50 flex flex-col items-center justify-center min-h-[140px]">
                <div className="flex gap-2 mb-3">
                  <div className="h-3 w-8 rounded-full bg-blue-200" />
                  <div className="h-3 w-16 rounded-full bg-blue-100" />
                  <div className="h-3 w-12 rounded-full bg-blue-200" />
                </div>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                  CSV / EXCEL DATA IMPORT PREVIEW
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  onClick={handleGoToDashboard}
                  variant="navy"
                  disabled={isSubmitting}
                  className="w-full py-6 font-semibold justify-center flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading Dashboard...
                    </>
                  ) : (
                    "Continue to Dashboard"
                  )}
                </Button>
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="outline"
                  disabled={isSubmitting}
                  className="w-full py-6 font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50 justify-center"
                >
                  Skip for Now
                </Button>
              </div>
            </div>
          )}

        </Container>
      </div>
    </div>
  );
}
