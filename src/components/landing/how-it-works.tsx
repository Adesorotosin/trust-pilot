"use client";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Drop your files",
      description:
        "Upload PDFs or photos of your Proforma Invoice, Packing List, or Bill of Lading. Any format, standard or scanned.",
    },
    {
      number: "02",
      title: "AI engine cross-checks",
      description:
        "Our trade-trained engine extracts unit values, matching quantities, validating HS classifications and flagging document mismatches instantly.",
    },
    {
      number: "03",
      title: "Action list ready",
      description:
        "Get an interactive dashboard detailing precise landed cost breakdowns, custom compliance alerts, and ready-to-use solutions.",
    },
  ];

  return (
    <section className="w-full bg-[#F8FAFC] py-20 md:py-28 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow & Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#10B981]">
            SIMPLE THREE-STEP PILOT
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Upload once. Verify everything.
          </h2>
        </div>

        {/* 3-Step Process Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 relative">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col text-left">
              
              {/* Connecting Divider Line (Only between columns on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 right-[-20%] lg:right-[-25%] w-[40%] lg:w-[50%] h-[1px] bg-slate-200/80 z-0" />
              )}

              {/* Number Badge */}
              <span className="text-4xl sm:text-5xl font-black text-[#10B981] tracking-tight relative z-10">
                {step.number}
              </span>

              {/* Step Title */}
              <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="mt-2.5 text-sm text-slate-500 font-normal leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}