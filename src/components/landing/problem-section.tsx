"use client";

import { AlertCircle, TrendingDown, FileX } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: AlertCircle,
      title: "Sudden customs penalties",
      description:
        "Mismatched HS codes or slight weight discrepancies on packing lists trigger costly PAAR queries and heavy demurrage fees at Apapa or Tin Can ports.",
    },
    {
      icon: TrendingDown,
      title: "Hidden forex & landed leaks",
      description:
        "Uncalculated port handling fees, custom agency commissions, and variable CBN official exchange rates destroy profit margins without warning.",
    },
    {
      icon: FileX,
      title: "Unstructured supplier data",
      description:
        "Suppliers in Shenzhen or Istanbul write descriptions that don't match NCS requirements. Manual cross-referencing takes hours and misses discrepancies.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#0B0F19] transition-colors duration-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#10B981]">
            THE REALITY OF NIGERIAN TRADE
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            Port delays aren't bad luck. They're bad paperwork.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            Relying on custom agents' guesswork, scattered WhatsApp chats, and spreadsheet formulas leads to expensive surprises at the port.
          </p>
        </div>

        {/* Problem Cards: Mobile Snap Carousel -> Desktop 3-Col Grid */}
        <div className="mt-16 flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="w-[85vw] max-w-[340px] sm:w-[380px] md:w-auto flex-shrink-0 snap-center rounded-2xl border border-slate-200/70 bg-[#F8FAFC] dark:bg-[#111726] dark:border-slate-800/80 p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:border-slate-300 dark:hover:border-slate-700 text-left flex flex-col justify-between"
              >
                <div>
                  {/* Red Soft Badge Icon Container */}
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400 border border-transparent dark:border-red-900/30">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>

                  {/* Card Title & Copy */}
                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}