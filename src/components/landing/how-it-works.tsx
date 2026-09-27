"use client";

export function HowItWorks() {
  const steps = [
    { number: "01", title: "Upload", description: "Add your commercial invoice, packing list, bill of lading or other shipment documents as PDFs or images." },
    { number: "02", title: "Analyze", description: "Trade Copilot extracts the important shipment, pricing, quantity and classification information from your documents." },
    { number: "03", title: "Detect", description: "Review mismatches, missing information, cost drivers and potential compliance issues highlighted for attention." },
    { number: "04", title: "Decide", description: "Use the resulting shipment summary, landed-cost view and action list to make a clearer decision before you ship." },
  ];

  return (
    <section id="how-it-works" className="w-full border-b border-border bg-muted/40 py-20 transition-colors duration-200 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">HOW IT WORKS</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">From documents to a clearer shipment decision.</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">A simple workflow for turning scattered trade documents into information you can actually use.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step) => (
            <div key={step.number} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <span className="text-4xl font-black tracking-tight text-primary">{step.number}</span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
