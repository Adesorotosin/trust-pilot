"use client";

import { UploadCloud } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full bg-[#F8FAFC] dark:bg-[#0B0F19] py-20 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Heading & Subtitle */}
        <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold tracking-tight text-[#0F172A] dark:text-white">
          Stop guessing your shipping costs
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload your shipping documents now for a complete compliance audit and duty estimation in minutes. No credit card required.
        </p>

        {/* Upload Box Container */}
        <div className="mt-10 sm:mt-12">
          <label className="relative flex flex-col items-center justify-center w-full min-h-[220px] sm:min-h-[240px] p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0E1320] border-2 border-dashed border-[#10B981] cursor-pointer hover:bg-slate-50/50 dark:hover:bg-[#121827] transition-all duration-200 group shadow-sm">
            
            {/* Circular Icon Wrapper */}
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/10 text-[#10B981] group-hover:scale-105 transition-transform duration-200">
              <UploadCloud className="w-6 h-6 stroke-[2.2]" />
            </div>

            {/* Prompt Text */}
            <p className="mt-5 text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
              Click to upload or drag documents here
            </p>

            {/* Supported Formats */}
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
              Supports PDF, PNG, JPG (Invoice, Packing List, BOL)
            </p>

            {/* Hidden File Input */}
            <input type="file" className="hidden" multiple accept=".pdf,.png,.jpg,.jpeg" />
          </label>
        </div>

        {/* Footer Guarantee / Trust Badges */}
        <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          <span>First analysis is free</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span>Confidential data protection</span>
        </div>

      </div>
    </section>
  );
}