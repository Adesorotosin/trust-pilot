"use client";

import {
  ArrowRight,
  CheckCircle2,
  FileText,
  SearchCheck,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export function ProductShowcase() {
  const checks = [
    {
      icon: FileText,
      title: "Document overview",
      description:
        "Key shipment information extracted and organized from your uploaded files.",
    },
    {
      icon: SearchCheck,
      title: "Consistency checks",
      description:
        "Compare important details across documents and surface differences worth reviewing.",
    },
    {
      icon: ShieldAlert,
      title: "Risk signals",
      description:
        "See areas that may require additional attention before you proceed.",
    },
  ];

  return (
    <section
      id="product"
      className="overflow-hidden bg-muted/30 py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
            PRODUCT VIEW
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From scattered documents to{" "}
            <span className="text-emerald-500">one clear picture.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Trade Copilot gives you a single place to review what was uploaded,
            what was detected, and what deserves your attention.
          </p>
        </div>

        {/* Main Showcase */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-14 md:mt-16">
          {/* Product preview */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-4xl bg-emerald-500/10 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                {/* Browser-style header */}
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>

                  <div className="hidden rounded-md border border-border bg-background px-4 py-1 text-[10px] font-medium text-muted-foreground sm:block">
                    app.tradecopilot
                  </div>

                  <div className="h-5 w-12" />
                </div>

                {/* Dashboard */}
                <div className="p-4 sm:p-6">
                  {/* Dashboard heading */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-500">
                        SHIPMENT ANALYSIS
                      </p>

                      <h3 className="mt-1.5 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                        Your shipment overview
                      </h3>
                    </div>

                    <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold text-emerald-500 sm:flex">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      ANALYSIS READY
                    </div>
                  </div>

                  {/* Summary cards */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <p className="text-[10px] font-medium text-muted-foreground">
                        Documents
                      </p>
                      <p className="mt-2 text-xl font-black text-foreground">
                        04
                      </p>
                      <p className="mt-1 text-[10px] text-emerald-500">
                        Ready for review
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <p className="text-[10px] font-medium text-muted-foreground">
                        Checks
                      </p>
                      <p className="mt-2 text-xl font-black text-foreground">
                        12
                      </p>
                      <p className="mt-1 text-[10px] text-emerald-500">
                        Completed
                      </p>
                    </div>

                    <div className="col-span-2 rounded-xl border border-border bg-muted/30 p-4 sm:col-span-1">
                      <p className="text-[10px] font-medium text-muted-foreground">
                        Attention
                      </p>
                      <p className="mt-2 text-xl font-black text-foreground">
                        02
                      </p>
                      <p className="mt-1 text-[10px] text-amber-500">
                        Items to review
                      </p>
                    </div>
                  </div>

                  {/* Analysis panel */}
                  <div className="mt-4 rounded-xl border border-border bg-background">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-500" />
                        <span className="text-xs font-bold text-foreground">
                          Copilot analysis
                        </span>
                      </div>

                      <span className="text-[10px] font-medium text-muted-foreground">
                        Just now
                      </span>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="flex items-start gap-3 rounded-lg bg-emerald-500/5 p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            Documents are ready for review
                          </p>
                          <p className="mt-1 text-[10px] leading-5 text-muted-foreground">
                            Key shipment information has been extracted from
                            the uploaded documents.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-lg bg-amber-500/5 p-3">
                        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />

                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            Two items may need attention
                          </p>
                          <p className="mt-1 text-[10px] leading-5 text-muted-foreground">
                            Review the highlighted information before making
                            your next shipping decision.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="lg:col-span-5">
            <div className="max-w-lg">
              <p className="text-sm font-semibold text-emerald-500">
                ONE WORKSPACE
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Know what was found before you decide what to do next.
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Instead of jumping between PDFs, spreadsheets, messages, and
                different sources of information, Trade Copilot gives you a
                structured starting point for reviewing a shipment.
              </p>

              <div className="mt-8 space-y-6">
                {checks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                        <Icon className="h-4.5 w-4.5" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {item.title}
                        </h4>

                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-9">
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-emerald-500"
                >
                  See Trade Copilot in action
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}