"use client";

import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, hint, error, registration, className, ...props }, ref) => {
    // State to toggle password visibility
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
          {label}
        </label>
        
        {/* Input container with absolute positioned toggle button */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "w-full rounded-lg border border-slate-200 bg-white pl-3.5 pr-16 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...registration}
            ref={(e) => {
              registration.ref(e);
              if (typeof ref === "function") {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
            }}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 bg-slate-50 px-2.5 py-1 rounded-md transition-all active:scale-95"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Hint text */}
        {hint && !error && (
          <p className="text-[11px] text-slate-400 font-medium leading-normal">
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p className="text-xs text-red-600 font-semibold leading-normal">
            {error}
          </p>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
