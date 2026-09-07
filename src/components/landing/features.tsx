"use client";

import { Calculator, FileText, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Calculator,
      badge: "PRECISE FOREX",
      title: "Landed Cost Breakdown",
      description:
        "Estimates duties, levies, clearing commissions, shipping costs, and surcharge projections at CBN official rates.",
      widget: (
        <div className="mt-6 rounded-xl border border-slate-200/60 dark:border-transparent bg-white dark:bg-[#070A11] p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Estimated Duty &amp; Levy
            </span>
            <span className="font-mono font-extrabold text-[#10B981]">
              ₦8,410,200
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Clearing &amp; Port Cost
            </span>
            <span className="font-mono font-extrabold text-slate-900 dark:text-slate-200">
              ₦1,250,000
            </span>
          </div>
        </div>
      ),
    },
    {
      icon: FileText,
      badge: "NIGERIAN REGULATIONS",
      title: "PAAR Pre-Assessment",
      description:
        "Auto-classifies items to exact HS codes and cross-checks matching details across SONCAP and Form M schemas.",
      widget: (
        <div className="mt-6 rounded-xl border border-slate-200/60 dark:border-transparent bg-white dark:bg-[#070A11] p-4 space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#10B981] shrink-0" />
            <span>HS Code 8504.40.90 is active</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#10B981] shrink-0" />
            <span>SONCAP certificate linked</span>
          </div>
        </div>
      ),
    },
    {
      icon: Shield,
      badge: "PREVENT PENALTIES",
      title: "Intelligent Risk Scoring",
      description:
        "Rates the safety, weight accuracy, price validity, and potential flags of your shipment on a structured index.",
      widget: (
        <div className="mt-6 rounded-xl border border-slate-200/60 dark:border-transparent bg-white dark:bg-[#070A11] p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Risk Rating
            </span>
            <span className="font-mono font-extrabold text-[#10B981] tracking-wider">
              LOW RISK (96/100)
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-[96%] rounded-full bg-[#10B981]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="w-full bg-white dark:bg-[#0B0F19] border-b border-slate-200/50 dark:border-none py-20 md:py-28 transition-colors duration-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric Header Split */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 sm:pb-16">
          <div className="max-w-2xl text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#10B981]">
              LOGISTICS COGNITION
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              Built for the nuances of <br className="hidden sm:inline" />
              African trade
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed text-left font-normal">
            Unlike generic document AI, TradePilot understands Nigeria Customs Form M templates, SONCAP certificates, NAFDAC requirements, and Apapa clearing timelines.
          </p>
        </div>

        {/* Feature Cards: Mobile Snap Carousel -> Desktop 3-Col Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 lg:gap-7 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="w-[85vw] max-w-[340px] sm:w-[380px] md:w-auto flex-shrink-0 snap-center rounded-2xl border border-slate-200/70 dark:border-transparent bg-[#F8FAFC] dark:bg-[#0E1320] p-6 sm:p-7 transition-colors duration-200 text-left flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Green Bare Icon + Badge Tag */}
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-[#10B981] stroke-[2]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 font-mono">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Inner Bottom Widget Box */}
                {item.widget}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}