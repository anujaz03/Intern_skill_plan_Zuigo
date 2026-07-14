"use client";

import * as React from "react";
import { Zap, Upload, Sparkles, CheckCircle2, FileSpreadsheet } from "lucide-react";
import { Container } from "./ui/container";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC] py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start lg:col-span-6">
            {/* Pill Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600 border border-blue-100/50">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              CRM FOR SMALL BUSINESS
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.1]">
              Grow your customer relationships <span className="text-blue-600">without</span> the complexity
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg leading-relaxed text-[#475569] max-w-xl">
              LeadFlow AI helps small businesses track customers, manage leads, and never miss a follow-up again — with AI doing the remembering for you.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button variant="navy" size="lg" className="px-7 py-6 text-sm font-semibold shadow-md shadow-slate-900/10">
                Create free account
              </Button>
              <Button variant="outline" size="lg" className="px-7 py-6 text-sm font-semibold border-slate-200 text-slate-700 bg-white hover:bg-slate-50">
                See how it works
              </Button>
            </div>

            {/* Social Proof (User Personas) */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {/* Rohan Deshmukh */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#1E293B] text-xs font-semibold text-white shadow-sm" title="Rohan Deshmukh">
                  RD
                </div>
                {/* Ananya Iyer */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-xs font-semibold text-white shadow-sm" title="Ananya Iyer">
                  AI
                </div>
                {/* Vikram Chauhan */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-xs font-semibold text-white shadow-sm" title="Vikram Chauhan">
                  VC
                </div>
              </div>
              <p className="text-sm font-medium text-[#475569]">
                Trusted by <span className="font-semibold text-[#0F172A]">200+</span> small businesses
              </p>
            </div>
          </div>

          {/* Right Column: Interactive CSS Dashboard Mockup */}
          <div className="relative w-full lg:col-span-6">
            <div className="relative mx-auto max-w-[580px] lg:max-w-none rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl shadow-blue-900/10">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-100 bg-[#F8FAFC] flex">
                
                {/* Dashboard Mock Sidebar */}
                <div className="w-16 md:w-20 border-r border-slate-100 bg-white p-3 flex flex-col items-center gap-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Zap className="h-5 w-5 fill-blue-600 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-4 w-full items-center">
                    <div className="h-7 w-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <div className="h-7 w-7 rounded bg-slate-50" />
                    <div className="h-7 w-7 rounded bg-slate-50" />
                    <div className="h-7 w-7 rounded bg-slate-50" />
                    <div className="h-7 w-7 rounded bg-slate-50" />
                  </div>
                </div>

                {/* Dashboard Mock Main Content Area */}
                <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div className="h-6 w-32 rounded bg-slate-100 md:w-48" />
                    <div className="h-6 w-6 rounded-full bg-slate-100" />
                  </div>

                  {/* Header Text */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-800">Welcome to LeadFlow AI</h3>
                    <p className="text-[10px] text-slate-400 mt-1">Workspace ready. Let&apos;s import data.</p>
                  </div>

                  {/* Mock content grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left Column: Upload card */}
                    <div className="md:col-span-2 border border-dashed border-slate-200 rounded-lg bg-white p-4 flex flex-col items-center justify-center text-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-2">
                        <Upload className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">No data found</span>
                      <p className="text-[9px] text-slate-400 mt-1 max-w-[150px]">Upload CSV/Excel to organize your CRM</p>
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded bg-[#0F172A] px-2.5 py-1 text-[9px] font-semibold text-white">
                        <FileSpreadsheet className="h-3 w-3" />
                        Upload file
                      </div>
                    </div>

                    {/* Right Column: AI Assistant card */}
                    <div className="border border-slate-100 rounded-lg bg-white p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-700">
                        <Sparkles className="h-3 w-3 text-blue-600" />
                        <span>AI Assistant</span>
                      </div>
                      <div className="flex flex-col gap-1.5 mt-1">
                        <div className="flex items-center gap-1 text-[8px] text-slate-500">
                          <CheckCircle2 className="h-2.5 w-2.5 text-[#16A34A] shrink-0" />
                          <span>Detect duplicates</span>
                        </div>
                        <div className="flex items-center gap-1 text-[8px] text-slate-500">
                          <CheckCircle2 className="h-2.5 w-2.5 text-[#16A34A] shrink-0" />
                          <span>Identify gaps</span>
                        </div>
                        <div className="flex items-center gap-1 text-[8px] text-slate-500">
                          <CheckCircle2 className="h-2.5 w-2.5 text-[#16A34A] shrink-0" />
                          <span>Recommend follow-ups</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
