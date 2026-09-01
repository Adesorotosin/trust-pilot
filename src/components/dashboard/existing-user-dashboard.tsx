"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  HelpCircle,
  Plus,
  Search,
  Bell,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Filter,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function ExistingUserDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const shipments = [
    {
      id: "SHP-1845",
      name: "Solar Equipment",
      type: "AI Monitored",
      route: "China → Lagos",
      value: "$75,000",
      status: "In Transit",
      statusBg: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      risk: "MEDIUM",
      riskBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
      readiness: "82%",
      readinessBar: "w-[82%] bg-[#10B981]",
    },
    {
      id: "SHP-1847",
      name: "Pharmaceutical Supplies",
      type: "AI Monitored",
      route: "India → Abuja",
      value: "$42,000",
      status: "Documentation",
      statusBg: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      risk: "HIGH",
      riskBg: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      readiness: "45%",
      readinessBar: "w-[45%] bg-rose-500",
    },
    {
      id: "SHP-1842",
      name: "Electronics Components",
      type: "AI Monitored",
      route: "Taiwan → Accra",
      value: "$120,500",
      status: "Customs Review",
      statusBg: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      risk: "MEDIUM",
      riskBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
      readiness: "68%",
      readinessBar: "w-[68%] bg-amber-500",
    },
    {
      id: "SHP-1839",
      name: "Textiles & Fabrics",
      type: "AI Monitored",
      route: "Turkey → Dar es Salaam",
      value: "$47,000",
      status: "Cleared",
      statusBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
      risk: "LOW",
      riskBg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
      readiness: "100%",
      readinessBar: "w-[100%] bg-[#10B981]",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] dark:bg-[#080C14] text-slate-300 flex flex-col justify-between p-4 border-r border-slate-800">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 px-3 py-4">
            <div className="h-8 w-8 rounded-lg bg-[#10B981] flex items-center justify-center font-bold text-white shadow-md shadow-[#10B981]/20">
              TP
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              TradePilot
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#10B981]/10 text-[#10B981] font-medium text-sm transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium text-sm transition-all"
            >
              <Truck className="h-4 w-4" />
              Shipments
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium text-sm transition-all"
            >
              <FileText className="h-4 w-4" />
              Documents
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium text-sm transition-all"
            >
              <Settings className="h-4 w-4" />
              Settings
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium text-sm transition-all"
            >
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </a>
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="p-3 bg-slate-800/60 dark:bg-slate-900/60 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-xs font-bold text-[#10B981]">
            C
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">
              Chinedu 👋
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              Trade Operations Manager
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0E1320] px-8 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Good afternoon, Chinedu 👋
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Here's what's happening with your shipments.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shipments..."
                className="pl-9 pr-4 py-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:outline-none focus:border-[#10B981] transition-all"
              />
            </div>

            {/* Notification Bell */}
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
            </button>

            {/* Primary Action Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-semibold shadow-sm transition-all">
              <Plus className="h-4 w-4" />
              New Shipment
            </button>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* METRICS CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Active Shipments */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Active Shipments
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                12
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Live tracking active
              </p>
            </div>

            {/* Needs Attention */}
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 relative">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-wider text-amber-800 dark:text-amber-400 uppercase">
                  Needs Attention
                </p>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  Action
                </span>
              </div>
              <h3 className="text-2xl font-extrabold mt-1 text-amber-900 dark:text-amber-200">
                3
              </h3>
              <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-2 font-medium">
                Critical AI alerts found
              </p>
            </div>

            {/* Shipment Value */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Shipment Value
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                $284,500
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Total active portfolio
              </p>
            </div>

            {/* Est. Additional Cost */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Est. Additional Cost
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                $8,420
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                AI calculation estimate
              </p>
            </div>

          </div>

          {/* TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT 2 COLUMNS: AI TRADE OPERATIONS ACTION ITEMS */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/60 dark:border-amber-900/30 space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-amber-200/40 dark:border-amber-900/30">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    AI Trade Operations - Action Required
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold">
                  3 Issues Found
                </span>
              </div>

              {/* 1. CRITICAL ALERT */}
              <div className="p-5 rounded-xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 text-[10px] font-bold uppercase tracking-wider">
                    • Critical
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                    <Sparkles className="h-3 w-3" /> AI Prediction
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    Missing NAFDAC Certificate
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Your Pharmaceutical Supplies shipment (SHP-1847) requires a NAFDAC certificate for customs clearance. Estimated delay: 5–7 days if not resolved.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] text-slate-400">
                    Estimate based on historical clearance data
                  </span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-medium transition-colors">
                    Review Certificate
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. WARNING ALERT */}
              <div className="p-5 rounded-xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    • Warning
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                    <Sparkles className="h-3 w-3" /> AI Prediction
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    Invoice & Packing List Mismatch
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Quantities on the commercial invoice for Electronics shipment (SHP-1842) don't match the packing list. 3 line items differ by 10–15%.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] text-slate-400">
                    Estimate based on historical clearance data
                  </span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-medium transition-colors">
                    Compare Discrepancies
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* 3. ADVISORY ALERT */}
              <div className="p-5 rounded-xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    • Advisory
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                    <Sparkles className="h-3 w-3" /> AI Prediction
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    HS Code Classification Review
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    AI suggests reclassifying item 'Industrial Sensors' from 9031.80 to 9025.19, which could reduce duty by ~$1,200. Estimate based on ECOWAS tariff book.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] text-slate-400">
                    Estimate based on historical clearance data
                  </span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-medium transition-colors">
                    Apply Recommendation
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: AI RECOMMENDATIONS & LIVE OPERATIONS LOG */}
            <div className="space-y-6">
              
              {/* AI Recommendation Box */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold tracking-wider uppercase mb-3">
                  <Sparkles className="h-3 w-3" />
                  AI Recommendation
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  Your Electronics shipment has a higher documentation risk because the invoice and packing list contain inconsistent quantities.
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Potential Impact: Resolving this discrepancy now before customs review could save 2–3 days in port delays.
                </p>
                <button className="mt-4 w-full py-2 rounded-xl bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-semibold shadow-sm transition-all">
                  View Shipment
                </button>
              </div>

              {/* Live Operations Log */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    Live Operations Log
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">
                        AI analysis completed for Electronics shipment
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">
                        Commercial invoice uploaded for Textiles shipment
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        5 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">
                        Quantity discrepancy detected in Pharma shipment
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Yesterday
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">
                        New shipment created: Solar Equipment
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        2 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM SECTION: ACTIVE SHIPMENTS TRACKER TABLE */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Active Shipments Tracker
              </h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <Filter className="h-3.5 w-3.5" />
                Filter & Sort
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-xl">Shipment</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Value</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Risk</th>
                    <th className="py-3 px-4">Readiness</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                  {shipments.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                        {row.name}
                        <span className="block text-[10px] font-normal text-slate-400 mt-0.5">
                          {row.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
                        {row.route}
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                        {row.value}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${row.statusBg}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.riskBg}`}>
                          • {row.risk}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-medium">
                            Readiness
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {row.readiness}
                          </span>
                        </div>
                        <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div className={`h-full rounded-full ${row.readinessBar}`}></div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}