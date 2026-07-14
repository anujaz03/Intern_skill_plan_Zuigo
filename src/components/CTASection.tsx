import * as React from "react";
import { Sparkles } from "lucide-react";
import { Container } from "./ui/container";
import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] px-8 py-16 shadow-2xl sm:px-16 sm:py-20 lg:flex lg:items-center lg:justify-between lg:gap-12">
          {/* Subtle AI gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(37,99,235,0.15),transparent_50%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              14-Day Free Trial
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
              Ready to protect your business from missed follow-ups?
            </h2>
            <p className="mt-4 text-base text-slate-300 max-w-lg mx-auto lg:mx-0">
              Join small businesses and startups who use LeadFlow AI to organize customer communication and build relationships that last.
            </p>
          </div>

          <div className="relative z-10 mt-8 flex flex-col sm:flex-row justify-center lg:justify-end gap-3 w-full sm:w-auto shrink-0">
            <Button variant="default" size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-6">
              Create free account
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 py-6">
              See how it works
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
