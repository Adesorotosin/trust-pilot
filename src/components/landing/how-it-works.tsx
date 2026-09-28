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
        "Trade Copilot extracts important shipment information and organizes it into a clear view.",
    },
    {
      number: "03",
      icon: TriangleAlert,
      title: "Detect",
      description:
        "Identify inconsistencies, potential compliance issues, missing information, and cost gaps.",
    },
    {
      number: "04",
      icon: ArrowRight,
      title: "Decide",
      description:
        "Get a clearer shipment summary, estimated landed costs, risk signals, and suggested next actions.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full bg-muted/30 py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From shipment documents to a clearer decision.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Trade Copilot turns scattered shipping documents into an
            understandable picture of your shipment, its costs, and the areas
            that may need your attention.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 md:mt-16">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-10 hidden border-t border-dashed border-border lg:block"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Icon and number */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-3xl font-black tracking-tight text-emerald-500/15">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom message */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-sm font-medium leading-6 text-muted-foreground">
            You don't need to understand every line in every document. Trade
            Copilot helps surface the information that matters.
          </p>
        </div>
      </div>
    </section>
  );
}