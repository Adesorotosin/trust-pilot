"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Landed Cost Calculator", href: "#calculator" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981] font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            T
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Trade Copilot
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Theme Toggle, Sign In & Primary CTA (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <Link
            href="/signin"
            className="text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/analyze"
            className="rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
          >
            Start Free Analysis
          </Link>
        </div>

        {/* Mobile Right Menu Trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-muted focus:outline-none"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background px-4 pb-6 pt-3 md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-base font-semibold text-foreground border border-border rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/analyze"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-base font-semibold text-white bg-[#10B981] rounded-lg shadow-sm hover:bg-[#059669]"
              >
                Start Free Analysis
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}