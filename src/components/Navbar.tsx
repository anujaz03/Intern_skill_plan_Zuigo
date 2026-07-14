"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { Container } from "./ui/container";
import { Button } from "./ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F172A] text-white">
              <Zap className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="text-xl font-bold text-[#0F172A] tracking-tight">LeadFlow AI</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">
              Pricing
            </a>
            <a href="#integrations" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">
              Integrations
            </a>
            <a href="#docs" className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors">
              Docs
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="navy">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[#475569] hover:bg-slate-100 hover:text-[#0F172A] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 shadow-inner">
          <div className="flex flex-col gap-4">
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#475569] hover:text-[#0F172A] py-1"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#475569] hover:text-[#0F172A] py-1"
            >
              Pricing
            </a>
            <a
              href="#integrations"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#475569] hover:text-[#0F172A] py-1"
            >
              Integrations
            </a>
            <a
              href="#docs"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#475569] hover:text-[#0F172A] py-1"
            >
              Docs
            </a>
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full justify-center">
                  Log in
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button variant="navy" className="w-full justify-center">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
