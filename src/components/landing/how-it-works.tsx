"use client";

import {
  UploadCloud,
  ScanSearch,
  TriangleAlert,
  ArrowRight,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UploadCloud,
      title: "Upload",
      description:
        "Upload your commercial invoice, packing list, bill of lading, or other shipment documents.",
    },
    {
      number: "02",
      icon: ScanSearch,
      title: "Analyze",
      description:
        "TradePilot extracts the important information from your documents and organizes your shipment data.",
    },
    {
      number: "03",
      icon: TriangleAlert,
      title: "Detect",
      description:
        "Spot document inconsistencies, potential compliance issues, cost gaps, and areas that need attention.",
    },
    {
      number: "04",
      icon: ArrowRight,
      title: "Decide",
      description:
        "Get a clear shipment summary, estimated landed costs, risk signals, and recommended next actions.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full border-y border-border/60 bg-muted/30 py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From shipment documents to a clearer decision.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            TradePilot turns scattered shipping documents into an
            understandable picture of your shipment, its costs, and the
            issues that may need your attention.
          </p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-[calc(100%+4px)] top-10 hidden w-8 border-t border-dashed border-border lg:block" />
                )}

                <div className="h-full rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-3xl font-black tracking-tight text-emerald-500/20">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
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