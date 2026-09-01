"use client";

export function ProductShowcase() {
  return (
    <section className="w-full bg-[#F8FAFC] dark:bg-[#0B0F19] py-20 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Badge & Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#10B981]">
            DEEP DIVE SCREENSHOT
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            Everything under control, in one interface
          </h2>
        </div>

        {/* 2-Column Content Layout */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Feature Breakdown */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Mismatch Detection Engine
              </h3>
              <p className="mt-2.5 text-sm text-[#64748B] dark:text-slate-400 font-normal leading-relaxed">
                We analyze proforma vs commercial invoices instantly. If unit prices or packing details mismatch, you know instantly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Customs Valuation Matching
              </h3>
              <p className="mt-2.5 text-sm text-[#64748B] dark:text-slate-400 font-normal leading-relaxed">
                We match items to previous historic clearance pricing databases to prevent custom officials claiming undervaluation queries.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">
                Consolidated Packing Integrity
              </h3>
              <p className="mt-2.5 text-sm text-[#64748B] dark:text-slate-400 font-normal leading-relaxed">
                Cross-checks actual volume weight calculations against sea freight shipping guidelines for precise density estimates.
              </p>
            </div>
          </div>

          {/* Right Column: Dark Interface Preview Card (Fixed Dark Styling as per image) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0C1019] p-7 sm:p-9 text-white shadow-2xl text-left">
              
              {/* Card Header: Title + PASSED Pill */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
                <h4 className="text-base font-bold text-slate-100">
                  Clearance Document Review
                </h4>
                <span className="rounded-md bg-[#004D34] px-2.5 py-1 text-[11px] font-bold text-[#10B981] tracking-wider uppercase">
                  PASSED
                </span>
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-5">
                  <span className="text-slate-400 font-medium">PAAR HS-Code Fitment</span>
                  <span className="font-mono font-extrabold text-slate-100 tracking-wide">
                    8504.40.90 – Verified
                  </span>
                </div>

                <div className="flex items-center justify-between py-5">
                  <span className="text-slate-400 font-medium">Net Weight Consistency</span>
                  <span className="font-mono font-extrabold text-slate-100 tracking-wide">
                    14,820 KG – Accurate
                  </span>
                </div>

                <div className="flex items-center justify-between py-5">
                  <span className="text-slate-400 font-medium">Commercial Invoice Match</span>
                  <span className="font-mono font-extrabold text-slate-100 tracking-wide">
                    100% Sourcing Match
                  </span>
                </div>
              </div>

              {/* Copilot Advice Sub-Card */}
              <div className="mt-6 rounded-xl bg-[#161D2F] p-5">
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#10B981] font-mono">
                  COPILOT ADVICE
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  Documents are mathematically aligned. Estimated Apapa customs clearance duty is roughly ₦8.4M based on current tariff lists.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}