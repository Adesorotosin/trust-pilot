"use client";

import {
  AlertTriangle,
  Calculator,
  FileWarning,
  ArrowDown,
} from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: FileWarning,
      number: "01",
      title: "Documents don't always agree",
      description:
        "A commercial invoice, packing list, and bill of lading can contain different quantities, descriptions, weights, or values. Finding those differences manually takes time.",
    },
    {
      icon: Calculator,
      number: "02",
      title: "The real cost is hard to see",
      description:
        "Product price is only one part of an import. Duties, freight, port charges, exchange rates, and other costs can change what a shipment actually costs you.",
    },
    {
      icon: AlertTriangle,
      number: "03",
      title: "Small issues can become expensive",
      description:
        "An overlooked document inconsistency or classification issue can create delays, additional costs, or questions that could have been identified earlier.",
    },
  ];

  return (
    <section className="overflow-hidden bg-background py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
            THE PROBLEM
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Importing gets complicated when the information is scattered.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Before you can make a confident shipping decision, you often have
            to piece together information from invoices, shipping documents,
            suppliers, agents, spreadsheets, and other sources.
          </p>
        </div>

        {/* Problems */}
        <div className="relative mt-14 md:mt-16">
          {/* Connecting line - desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-[3.5rem] hidden border-t border-dashed border-border lg:block"
          />

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {problems.map((problem) => {
              const Icon = problem.icon;

              return (
                <article
                  key={problem.number}
                  className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-7"
                >
                  {/* Number + icon */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/10 bg-red-500/10 text-red-500">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-3xl font-black tracking-tight text-muted-foreground/20">
                      {problem.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold tracking-tight text-foreground">
                    {problem.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {problem.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Transition into solution */}
        <div className="mt-14 flex flex-col items-center text-center md:mt-16">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40">
            <ArrowDown className="h-4 w-4 text-emerald-500" />
          </div>

          <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-muted-foreground">
            Trade Copilot brings these pieces together so you can understand
            what is happening with a shipment before making the next move.
          </p>
        </div>
      </div>
    </section>
  );
}