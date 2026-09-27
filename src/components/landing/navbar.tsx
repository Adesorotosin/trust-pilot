"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "How it works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Landed cost", href: "#calculator" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm transition-transform group-hover:scale-105">
            <ArrowUpRight className="h-5 w-5" />
          </div>

          <span className="text-lg font-bold tracking-tight text-foreground">
            TradePilot
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
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

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
          >
            Analyze a shipment
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-border/60 py-4 text-base font-medium text-foreground transition-colors hover:text-emerald-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Analyze a shipment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}