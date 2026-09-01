"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Badge */}
<div className="flex justify-center">
  <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-[#F8FAFC] px-4 py-1.5 text-xs font-medium text-slate-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
    <span className="font-bold text-[#10B981] uppercase tracking-wider text-[11px]">
      NEW RELEASE
    </span>
    <span className="text-slate-600 font-medium">
      Form M &amp; PAAR Validation Engine v2.0
    </span>
  </div>
</div>

        {/* Main Hero Header & Copy */}
        <div className="mt-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.15]">
            Know your true import cost and compliance risks before shipping
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For Nigerian SME importers purchasing from China, Turkey, and UAE. Upload your commercial invoices and bills of lading to instantly identify compliance gaps, avoid port delays, and calculate exact landed costs.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#059669] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10B981]"
            >
              Analyze Free Shipment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              Watch Interactive Demo
            </Link>
          </div>

          {/* Trust Micro-Badges */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              <span>100% Confidential Document Processing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#10B981]" />
              <span>Results in under 2 minutes</span>
            </div>
          </div>
        </div>

        {/* Hero Product UI Mockup Window */}
        <div className="mt-12 md:mt-16 mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-800 bg-[#0A0F1D] p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
            
            {/* Window Top Controls */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[11px] tracking-wider text-slate-400 uppercase">
                ANALYZING: PL_CN_8802.pdf
              </span>
            </div>

            {/* Application Mockup Body */}
            <div className="space-y-3.5">
              
              {/* Alert Card (Quantity Mismatch) */}
              <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-4 text-left backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-red-500/10 p-1.5 text-red-400 mt-0.5">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-red-200">
                      Quantity Mismatch Identified
                    </h4>
                    <p className="mt-0.5 text-xs text-red-300/80">
                      Commercial Invoice states 4,200 units, but Bill of Lading shows 3,800 units.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Row 1: HS Code */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800/90 bg-[#111827]/70 px-4 py-3.5">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">HS Code Detected</p>
                  <p className="text-sm font-bold font-mono text-slate-100 mt-0.5">8504.40.90</p>
                </div>
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  Verified
                </span>
              </div>

              {/* Data Row 2: Total Declared Value */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800/90 bg-[#111827]/70 px-4 py-3.5">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Total Declared Value</p>
                  <p className="text-sm font-bold font-mono text-slate-100 mt-0.5">$48,250.00 USD</p>
                </div>
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  Matched
                </span>
              </div>

              {/* Data Row 3: Estimated Duty */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800/90 bg-[#111827]/70 px-4 py-3.5">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Estimated Nigeria Customs Duty (approx.)</p>
                  <p className="text-sm font-bold font-mono text-slate-100 mt-0.5">₦14,820,500.00</p>
                </div>
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  Calculated
                </span>
              </div>

              {/* Data Row 4: Importer of Record */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800/90 bg-[#111827]/70 px-4 py-3.5">
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Importer of Record</p>
                  <p className="text-sm font-bold font-mono text-slate-100 mt-0.5">Akin &amp; Sons Logistics LTD</p>
                </div>
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  Verified
                </span>
              </div>

              {/* Bottom Readiness Confirmation */}
              <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 px-4 py-3 text-left flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <p className="text-xs font-medium text-emerald-300">
                  Landed cost is within expected variance of ±3%. Form M ready for validation.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}