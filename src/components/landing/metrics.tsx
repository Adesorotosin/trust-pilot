"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useInView, useMotionValue, useSpring, motion, AnimatePresence } from "framer-motion";

// Helper component for animated numbers
function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function MetricsAndTestimonials() {
  const testimonials = [
    {
      quote:
        '"We used to lose thousands of dollars on Apapa port delays due to simple invoice typos. Trade Copilot flags document mistakes in minutes. Absolute game-changer."',
      author: "Alhaji Musa Kabir",
      company: "Kano General Electronics LTD",
    },
    {
      quote:
        '"The Landed Cost calculator is remarkably accurate. Knowing exact customs duty costs in Naira before shipping allows us to price products profitably."',
      author: "Nneka Obi",
      company: "Obi Textiles & Spares Lagos",
    },
    {
      quote:
        '"Clearing containers used to take weeks of back-and-forth document verification. With Trade Copilot, we verify everything pre-arrival seamlessly."',
      author: "Emeka Okonkwo",
      company: "Mainland Logistics & Haulage",
    },
    {
      quote:
        '"The automated HS-code compliance checks saved us from hefty custom query penalties twice this quarter already."',
      author: "Bisi Adebayo",
      company: "Lekki Global Maritime Ltd",
    },
  ];

  // Pair up testimonials (2 cards per slide on desktop)
  const slides = [
    [testimonials[0], testimonials[1]],
    [testimonials[2], testimonials[3]],
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <section className="w-full bg-white dark:bg-[#0B0F19] py-20 md:py-28 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Animated Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pb-16 sm:pb-20">
          
          {/* $4.8M */}
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#10B981] font-mono">
              <AnimatedNumber value={4.8} prefix="$" suffix="M" decimals={1} />
            </span>
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
              Demurrage Costs Saved
            </span>
          </div>

          {/* 18,200+ */}
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#10B981] font-mono">
              <AnimatedNumber value={18200} suffix="+" />
            </span>
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
              Documents Analyzed
            </span>
          </div>

          {/* 99.2% */}
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#10B981] font-mono">
              <AnimatedNumber value={99.2} suffix="%" decimals={1} />
            </span>
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400">
              Compliance Accuracy
            </span>
          </div>

        </div>

        {/* Testimonial Slider Container */}
        <div
          className="relative min-h-[280px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {slides[activeSlide].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-[24px] bg-[#F8FAFC] dark:bg-[#0E1320] p-8 sm:p-10 border border-[#E2E8F0] dark:border-slate-800/80 text-left transition-colors duration-200"
                >
                  <div>
                    <div className="flex items-center gap-1.5 text-[#10B981]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-transparent stroke-[2.2]"
                        />
                      ))}
                    </div>

                    <p className="mt-6 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-normal leading-relaxed">
                      {item.quote}
                    </p>
                  </div>

                  <div className="mt-8">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.author}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {item.company}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Slider Indicators at Bottom */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === index
                    ? "w-8 bg-[#10B981]"
                    : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}