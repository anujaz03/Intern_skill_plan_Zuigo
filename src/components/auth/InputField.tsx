import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  registration: UseFormRegisterReturn;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, hint, error, optional, registration, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label and Optional indicator */}
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">
            {label}
          </label>
          {optional && (
            <span className="text-[10px] text-slate-400 font-medium">Optional</span>
          )}
        </div>

        {/* Input element */}
        <input
          className={cn(
            "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400",
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

        {/* Description hint text */}
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
InputField.displayName = "InputField";
