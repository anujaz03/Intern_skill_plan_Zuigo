import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import { Container } from "./ui/container";

export function ComparisonSection() {
  const comparisons = [
    {
      competitor: "Salesforce",
      complexity: "Very High",
      setupTime: "Weeks",
      reminders: "Requires custom setup",
      pricing: "Expensive",
    },
    {
      competitor: "HubSpot CRM",
      complexity: "High",
      setupTime: "Days",
      reminders: "Premium features only",
      pricing: "High (for paid tiers)",
    },
    {
      competitor: "Zoho CRM",
      complexity: "Medium",
      setupTime: "Days",
      reminders: "Basic reminders",
      pricing: "Moderate",
    },
    {
      competitor: "LeadFlow AI",
      complexity: "Extremely Low",
      setupTime: "Under 5 Minutes",
      reminders: "Active AI suggestions",
      pricing: "Affordable / Free Trial",
      isHighlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
            Built for simplicity, not complexity
          </h2>
          <p className="mt-4 text-lg text-[#475569]">
            We don&apos;t compete with Salesforce on features. We compete on how quickly your team can actually start tracking customer relationships.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100/50">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-[#F8FAFC]">
                  <th className="px-6 py-5 text-sm font-semibold text-[#0F172A]">Platform</th>
                  <th className="px-6 py-5 text-sm font-semibold text-[#0F172A]">Learning Curve</th>
                  <th className="px-6 py-5 text-sm font-semibold text-[#0F172A]">Setup Time</th>
                  <th className="px-6 py-5 text-sm font-semibold text-[#0F172A]">Follow-Up Reminders</th>
                  <th className="px-6 py-5 text-sm font-semibold text-[#0F172A]">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisons.map((row, index) => (
                  <tr
                    key={index}
                    className={
                      row.isHighlight
                        ? "bg-blue-50/40 font-medium transition-colors hover:bg-blue-50/70"
                        : "transition-colors hover:bg-slate-50/50"
                    }
                  >
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        {row.competitor}
                        {row.isHighlight && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                            <Sparkles className="h-2.5 w-2.5 fill-blue-700" />
                            Best Choice
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#475569]">
                      <span
                        className={
                          row.isHighlight
                            ? "text-blue-700 font-semibold"
                            : "text-[#475569]"
                        }
                      >
                        {row.complexity}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#475569]">
                      <span
                        className={
                          row.isHighlight
                            ? "text-blue-700 font-semibold"
                            : "text-[#475569]"
                        }
                      >
                        {row.setupTime}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#475569]">
                      <div className="flex items-center gap-1.5">
                        {row.isHighlight ? (
                          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                            <Check className="h-4 w-4 stroke-[3]" />
                            {row.reminders}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-slate-500">
                            {row.reminders}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#475569]">
                      <span
                        className={
                          row.isHighlight
                            ? "text-blue-700 font-semibold"
                            : "text-[#475569]"
                        }
                      >
                        {row.pricing}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
