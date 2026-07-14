import * as React from "react";
import { LayoutDashboard, Sparkles, Target, Users, MessageSquarePlus, FileUp } from "lucide-react";
import { Container } from "./ui/container";
import { FeatureCard } from "./ui/feature-card";

export function FeatureSection() {
  const features = [
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: "Daily Action Dashboard",
      description: "Start your day with a clear view. See pending follow-ups, new leads, and recent customer activities immediately on login.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Follow-Up Suggestions",
      description: "Let AI analyze your customer interaction logs to recommend who needs attention next, protecting you from losing hot deals.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Visual Lead Tracking",
      description: "Track sales leads separately from confirmed customers. Monitor status changes (New, Contacted, Follow-Up, Converted) at a glance.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Centralized Customer Notes",
      description: "Store client contact details, files, and chronological meeting notes in one unified workspace, easily accessible by your team.",
    },
    {
      icon: <MessageSquarePlus className="h-6 w-6" />,
      title: "AI-Drafted Messages",
      description: "Draft follow-up emails and WhatsApp replies automatically based on last conversations, saving hours of manual drafting.",
    },
    {
      icon: <FileUp className="h-6 w-6" />,
      title: "Instant Spreadsheet Import",
      description: "Upload existing Excel or CSV files. The platform automatically maps fields, cleans up duplicate records, and builds your database.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#FFFFFF] border-y border-[#E2E8F0]">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
            Everything you need to close more deals
          </h2>
          <p className="mt-4 text-lg text-[#475569]">
            LeadFlow AI provides a clean CRM and lightweight AI assistance to keep small teams organized without the enterprise learning curve.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
