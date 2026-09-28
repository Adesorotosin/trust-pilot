"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Calculator,
  FileCheck2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export function MetricsAndTestimonials() {
  const principles = [
    {
      icon: FileCheck2,
      number: "01",
      title: "Clarity",
      description:
        "Turn scattered shipment documents into information that is easier to understand and review.",
    },
    {
      icon: Calculator,
      number: "02",
      title: "Cost visibility",
      description:
        "Bring the different cost components of an import into one clearer picture before you commit.",
    },
    {
      icon: ShieldCheck,
      number: "03",
      title: "Early awareness",
      description:
        "Surface inconsistencies and potential areas of concern while there is still time to investigate them.",
    },
  ];

  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % principles.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [principles.length]);

  return (
    <section className="w-full bg-muted/30 py-20 transition-colors duration-300 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">
            BUILT FOR BETTER DECISIONS
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            More visibility before you{" "}
            <span className="text-emerald-500">make the move.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Trade Copilot is designed to help importers understand the
            information behind a shipment before committing time, money, or
            inventory.
          </p>
        </div>

        {/* Main feature panel */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12 md:mt-16">
          {/* Left statement */}
          <div className="relative overflow-hidden rounded-3xl bg-emerald-500 p-7 text-white shadow-xl shadow-emerald-500/10 sm:p-9 lg:col-span-5 lg:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Sparkles className="h-5 w-5" />
                </div>

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                  TRADE COPILOT
                </p>

                <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  Know what deserves your attention.
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                  Good trade decisions start with good information. Trade
                  Copilot helps organize the details so you can review a
                  shipment with more context.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-2 text-sm font-bold">
                <span>Understand. Review. Decide.</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Principles */}
          <div className="grid gap-4 lg:col-span-7">
            {principles.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeCard === index;

              return (
                <motion.div
                  key={item.number}
                  onMouseEnter={() => setActiveCard(index)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex gap-5 rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                    isActive
                      ? "border-emerald-500/30 bg-background shadow-sm"
                      : "border-border bg-background/60"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black tracking-[0.15em] text-muted-foreground/50">
                        {item.number}
                      </span>

                      <h3 className="text-base font-bold text-foreground sm:text-lg">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-14 max-w-3xl text-center md:mt-16">
          <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Trade Copilot is an information and decision-support tool. It
            doesn't replace customs authorities, licensed professionals,
            freight forwarders, or your own judgment.
          </p>
        </div>
      </div>
    </section>
  );
}