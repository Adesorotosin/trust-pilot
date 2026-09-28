"use client";

import {
  Calculator,
  FileCheck2,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: FileCheck2,
      number: "01",
      badge: "DOCUMENT INTELLIGENCE",
      title: "Understand your trade documents",
      description:
        "Upload invoices, packing lists, bills of lading, and other shipment documents. Trade Copilot extracts the information that matters and brings it into one place.",
      points: [
        "Extract key shipment details",
        "Compare information across documents",
        "Surface missing or inconsistent data",
      ],
    },
    {
      icon: Calculator,
      number: "02",
      badge: "COST VISIBILITY",
      title: "See the real cost of your shipment",
      description:
        "Go beyond the supplier's product price. Build a clearer picture of the costs involved in getting your goods from origin to destination.",
      points: [
        "Estimate landed cost components",
        "Understand duty and shipping impact",
        "Review the numbers before committing",
      ],
    },
    {
      icon: ShieldAlert,
      number: "03",
      badge: "RISK SIGNALS",
      title: "Spot issues before they become problems",
      description:
        "Trade Copilot highlights information that may deserve a closer look, helping you identify potential inconsistencies and compliance-related concerns earlier.",
      points: [
        "Flag unusual document differences",
        "Highlight potential risk areas",
        "Get suggested areas to review",
      ],
    },
  ];

  return (
    <section
      id="features"
      className="overflow-hidden bg-background py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between md:pb-14">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
              FEATURES
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
              The information you need,{" "}
              <span className="text-emerald-500">in one place.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Trade Copilot is designed around the decisions importers actually
            need to make — not just around extracting text from documents.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-3xl font-black tracking-tight text-muted-foreground/15">
                    {feature.number}
                  </span>
                </div>

                {/* Badge */}
                <div className="mt-7">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-500">
                    {feature.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                {/* Feature Points */}
                <div className="mt-7 border-t border-border pt-5">
                  <ul className="space-y-3">
                    {feature.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom indicator */}
                <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-emerald-500">
                  <span>Explore this capability</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 rounded-2xl border border-border bg-muted/30 px-6 py-7 text-center md:mt-16 md:px-10">
          <p className="mx-auto max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            The goal isn't to replace your customs agent, freight forwarder,
            or trade professional. It's to help you arrive at those
            conversations with better information.
          </p>
        </div>
      </div>
    </section>
  );
}