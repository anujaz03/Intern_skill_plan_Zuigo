import * as React from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description, className, ...props }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-blue-100 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[#0F172A]">{title}</h3>
      <p className="text-sm leading-relaxed text-[#475569]">{description}</p>
    </div>
  );
}
