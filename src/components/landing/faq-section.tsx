"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs = [
    {
      question: "Is my commercial invoice data safe?",
      answer:
        "Yes. All uploaded files are highly encrypted and instantly anonymized. We never share your price lists or supplier identities with competitors or regulatory bodies.",
    },
    {
      question: "How does the estimated customs duty match real payments?",
      answer:
        "Our calculations are based directly on standard Nigeria Customs Service tariff rules. We monitor regular policy changes so your estimates stay within 3% variance.",
    },
    {
      question: "Can you fix mismatched HS codes automatically?",
      answer:
        "Trade Copilot flags the mismatches and recommends the exact standard HS code. You can quickly edit your documents before final submissions.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F8FAFC] dark:bg-[#0B0F19] py-20 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#10B981] font-mono">
            QUESTIONS & ANSWERS
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold tracking-tight text-[#0F172A] dark:text-white">
            Common Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl sm:rounded-[20px] bg-[#F4F6F8] dark:bg-[#0E1320] border border-[#E2E8F0] dark:border-slate-800/80 transition-colors duration-200 overflow-hidden"
              >
                {/* Accordion Header / Trigger Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white tracking-tight pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 text-[#0F172A] dark:text-white">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#10B981] stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}