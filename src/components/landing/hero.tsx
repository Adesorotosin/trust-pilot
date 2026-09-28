"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  FileSearch,
  Sparkles,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-14 transition-colors duration-300 md:pt-20">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0  h-105 w-180 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute left-[8%] top-[20%] h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="absolute right-[8%] top-[35%] h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Announcement */}
        <div className="flex justify-center">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />

            <span className="font-semibold text-emerald-500">
              AI TRADE INTELLIGENCE
            </span>

            <span className="hidden sm:inline">
              Built for modern African importers
            </span>
          </div>
        </div>

        {/* Main Hero Copy */}
        <div className="mx-auto mt-7 max-w-4xl text-center">
          <h1 className="text-4xl font-black tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]">
            Know your true{" "}
            <span className="text-emerald-500">landed cost</span>{" "}
            before you ship.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Trade Copilot helps Nigerian importers understand shipment
            documents, identify inconsistencies, estimate landed costs, and
            spot potential compliance issues before they become expensive
            problems.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:w-auto"
            >
              Analyze a shipment
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted sm:w-auto"
            >
              See how it works
            </Link>
          </div>

          {/* Supporting Signals */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xs font-medium text-muted-foreground sm:flex-row sm:gap-6">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Your documents stay private</span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />

            <div className="flex items-center gap-1.5">
              <FileSearch className="h-4 w-4 text-emerald-500" />
              <span>Document-first analysis</span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />

            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>AI-assisted insights</span>
            </div>
          </div>
        </div>

        {/* Hero Dashboard Image */}
        <div className="mx-auto mt-14 max-w-6xl md:mt-20">
          <div className="relative">
            {/* Soft glow behind dashboard */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-4xl bg-emerald-500/10 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10">
              <div className="relative aspect-video w-full">
                <img
                  src="/images/trade-copilot-dashboard.png"
                  alt="Trade Copilot dashboard showing shipment analysis"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Positioning Statement */}
        <div className="mx-auto max-w-3xl pb-20 pt-10 text-center md:pb-28">
          <p className="text-sm leading-6 text-muted-foreground">
            Built to turn complex trade documents into information you can
            actually act on.
          </p>
        </div>
      </div>
    </section>
  );
}