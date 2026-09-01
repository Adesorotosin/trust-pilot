"use client";

import Link from "next/link";

export function Footer() {
  const navigation = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Landed Costs", href: "#landed-costs" },
      { name: "Security", href: "#security" },
    ],
    resources: [
      { name: "Apapa Tariffs", href: "#apapa-tariffs" },
      { name: "CBN Forex Lists", href: "#cbn-forex" },
      { name: "Guides", href: "#guides" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Careers", href: "#careers" },
    ],
  };

  return (
    <footer className="w-full bg-white dark:bg-[#0B0F19] pt-16 pb-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Brand Info on Left, Links on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Brand Left Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#10B981] text-white font-bold text-base">
                T
              </div>
              <span className="text-lg font-bold text-[#0F172A] dark:text-white tracking-tight">
                Trade Copilot
              </span>
            </Link>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm font-normal leading-relaxed">
              Making African cross-border trade clear, predictable, and compliant.
            </p>
          </div>

          {/* Links Right Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 sm:gap-8">
            
            {/* Product Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#10B981] font-mono">
                PRODUCT
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#10B981] font-mono">
                RESOURCES
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#10B981] font-mono">
                COMPANY
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-transparent text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>© 2026 Trade Copilot. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="#privacy"
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}