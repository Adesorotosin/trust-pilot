"use client";

import {
  FileText,
  ShieldCheck,
  Calculator,
  SearchCheck,
  Globe2,
  BrainCircuit,
} from "lucide-react";

export function TrustBar() {
  const capabilities = [
    {
      icon: FileText,
      label: "Trade Documents",
    },
    {
      icon: SearchCheck,
      label: "Document Checks",
    },
    {
      icon: Calculator,
      label: "Landed Cost",
    },
    {
      icon: ShieldCheck,
      label: "Compliance Signals",
    },
    {
      icon: Globe2,
      label: "Import Intelligence",
    },
    {
      icon: BrainCircuit,
      label: "AI Trade Insights",
    },
  ];

  return (
    <section className="border-y border-border bg-muted/30 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-10">
          {/* Intro */}
          <div className="max-w-sm text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">
              Built for real trade workflows
            </p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Turn shipment documents and trade information into a clearer
              picture of your next import.
            </p>
          </div>

          {/* Capabilities */}
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:max-w-3xl">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3 py-3 shadow-sm transition-colors hover:bg-muted"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="text-xs font-semibold text-foreground sm:text-sm">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}