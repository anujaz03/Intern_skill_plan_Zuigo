"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Zap, Sparkles, Loader2, ArrowRight, AlertCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/auth/InputField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Initialize react-hook-form with Zod validation resolver
  // Using onChange validation mode for immediate feedback on user input
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle mock credentials submission
  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setErrorMessage(null); // Clear previous errors

    try {
      // Simulate network request delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const emailLower = data.email.toLowerCase().trim();
      const password = data.password;

      // Mock user database credentials check
      // - admin@leadflow.ai (companySetupCompleted: true)
      // - setup@leadflow.ai (companySetupCompleted: false)
      // - Password for both: Password123!
      if (password === "Password123!") {
        if (emailLower === "admin@leadflow.ai") {
          // Navigate to Dashboard
          router.push("/dashboard");
          return;
        } else if (emailLower === "setup@leadflow.ai") {
          // Navigate to Company Setup placeholder
          router.push("/company-setup");
          return;
        }
      }

      // Trigger login failure credentials error
      setErrorMessage("Invalid email or password.");
      
      // Clear only the password field as required by specs
      setValue("password", "", { shouldValidate: false });
      
      setIsLoading(false);
    } catch (err) {
      console.error("Mock auth error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-40">
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Click logo navigates back to landing page */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-white">
                <Zap className="h-5 w-5 fill-white text-white" />
              </div>
              <span className="text-xl font-bold text-[#0F172A] tracking-tight">LeadFlow AI</span>
            </Link>
            <div className="text-sm font-medium text-[#475569]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5"
              >
                Register <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Login Card Layout */}
      <div className="flex-grow py-16 lg:py-24 flex items-center justify-center">
        <Container className="max-w-md w-full px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl">
            {/* Header info */}
            <div className="mb-8 text-center sm:text-left">
              <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                <Sparkles className="h-3 w-3 fill-blue-600" />
                WELCOME BACK
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Sign in to your account</h2>
              <p className="text-xs text-[#475569] mt-1">
                Enter your credentials to manage your business relationships.
              </p>
            </div>

            {/* Error Banner displayed above form fields */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs font-semibold leading-relaxed">
                  {errorMessage}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <InputField
                label="Email Address"
                type="email"
                placeholder="jane@yourcompany.com"
                error={errors.email?.message}
                registration={register("email")}
                disabled={isLoading}
              />

              {/* Password Input */}
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                registration={register("password")}
                disabled={isLoading}
              />

              {/* Helper Options: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    disabled={isLoading}
                    {...register("rememberMe")}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-slate-600 cursor-pointer select-none font-medium">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
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
                    Signing In...
                  </>
                ) : (
                  "Sign In →"
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
              Continue with Google
            </Button>

            {/* Footer switcher */}
            <div className="mt-8 text-center text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                Create Free Account
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
