"use client";

export function TrustBar() {
  const partners = [
    "Alaba Electronics",
    "VGC General Trading",
    "Idumota Textiles",
    "Lekki Spares LTD",
    "Kano Allied Importers",
  ];

  // Quadruple the list so the loop stays continuous and fills wide screens
  const marqueePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="w-full bg-[#F8FAFC] dark:bg-[#0B0F19] border-b border-slate-200/50 dark:border-slate-800/50 py-10 transition-colors duration-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
          TRUSTED BY 500+ IMPORTERS IN LAGOS, KANO &amp; ONITSHA
        </p>
      </div>

      {/* Marquee Track Container */}
      <div className="mt-7 relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,_transparent_0,_black_96px,_black_calc(100%-96px),_transparent_100%)]">
        <div className="flex w-max animate-marquee gap-10 md:gap-14 hover:[animation-play-state:paused]">
          {marqueePartners.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 md:text-base tracking-tight whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}