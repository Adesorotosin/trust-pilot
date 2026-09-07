"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  HelpCircle,
  Plus,
  Search,
  Bell,
  CheckCircle2,
  Circle,
  Sparkles,
  RefreshCw,
  PackageX,
  Upload,
  Link as LinkIcon,
  X,
  Loader2,
  DollarSign,
  Globe,
  Tag,
} from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  actionLabel: string | null;
  icon?: React.ElementType;
}

export default function NewUserDashboard() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Create Your Account",
      description: "Completed setup and team authorization",
      actionLabel: null,
    },
    {
      id: 2,
      title: "Add Your First Shipment",
      description: "Enter shipment details to start tracking",
      actionLabel: "Add Shipment",
      icon: Plus,
    },
    {
      id: 3,
      title: "Upload Trade Documents",
      description: "Upload invoices, packing lists, or certificates for AI validation",
      actionLabel: "Upload",
      icon: Upload,
    },
    {
      id: 4,
      title: "Connect Your Freight Forwarder",
      description: "Link logistics partners for real-time tracking integration",
      actionLabel: "Connect",
      icon: LinkIcon,
    },
  ];

  const handleStepClick = (stepId: number) => {
    if (stepId === 2) {
      setIsModalOpen(true);
    } else {
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps((prev) => [...prev, stepId]);
      }
    }
  };

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
            AO
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">
              Amara Osei 👋
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
              Welcome, Amara 👋
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Let&apos;s get your first shipment set up.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search shipments..."
                className="pl-9 pr-4 py-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:outline-none focus:border-[#10B981] transition-all"
              />
            </div>

            {/* Notification Bell */}
            <button 
              aria-label="Notifications"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#10B981]"></span>
            </button>

            {/* Primary Action Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="h-4 w-4" />
              New Shipment
            </button>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* METRICS CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Active Shipments
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                0
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                No active trackers
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Needs Attention
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                0
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                All systems clear
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Shipment Value
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                $0
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                No active portfolio value
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Est. Additional Cost
              </p>
              <h3 className="text-2xl font-extrabold mt-1 text-slate-900 dark:text-white">
                $0
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                No risks detected
              </p>
            </div>

          </div>

          {/* MAIN TWO-COLUMN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT 2 COLUMNS: ONBOARDING CHECKLIST */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#10B981]/10 text-[#10B981]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Get Started with TradePilot
                    </h2>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981]">
                  {completedSteps.length} / {onboardingSteps.length} Complete
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-6">
                Complete these onboarding steps to unlock real-time predictive analytics and continuous automated customs compliance.
              </p>

              {/* Onboarding List */}
              <div className="space-y-3">
                {onboardingSteps.map((step) => {
                  const isDone = completedSteps.includes(step.id);
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        isDone
                          ? "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-800/50 opacity-75"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#10B981]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-[#10B981] flex-shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                        )}
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isDone
                                ? "line-through text-slate-400 dark:text-slate-500"
                                : "text-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {step.actionLabel && !isDone && (
                        <button
                          onClick={() => handleStepClick(step.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          {step.icon && <step.icon className="h-3.5 w-3.5" />}
                          {step.actionLabel}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: AI RECOMMENDATIONS & LIVE LOG */}
            <div className="space-y-6">
              
              {/* AI Recommendation Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold tracking-wider uppercase mb-3">
                  <Sparkles className="h-3 w-3" />
                  AI Recommendation
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  TradePilot AI is waiting for shipment data to begin optimization.
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Once you upload commercial invoices, packing lists, or carrier documents, we&apos;ll automatically scan for classification errors, duty savings, and missing certs.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center text-xs text-slate-400 font-medium">
                  Waiting for Data...
                </div>
              </div>

              {/* Live Operations Log */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    Live Operations Log
                  </h3>
                  <button 
                    aria-label="Refresh log"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0"></span>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                      TradePilot organization account created
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Just now
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM SECTION: ACTIVE SHIPMENTS TRACKER TABLE (EMPTY STATE) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1320] border border-slate-200 dark:border-slate-800/80">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Active Shipments Tracker
            </h2>

            {/* Table Header Structure */}
            <div className="grid grid-cols-7 text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 mb-8">
              <span>Shipment</span>
              <span>Route</span>
              <span>Value</span>
              <span>Status</span>
              <span>Risk</span>
              <span>Readiness</span>
              <span className="text-right">Action</span>
            </div>

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <PackageX className="h-6 w-6" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                No shipments tracked yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                Create your first shipment to activate live transit monitoring and predictive risk analysis.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Plus className="h-4 w-4" />
                Create First Shipment
              </button>
            </div>
          </div>

        </div>
      </main>

{/* CREATE SHIPMENT MODAL / SLIDE-OVER */}
      <CreateShipmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          setIsModalOpen(false);
          router.refresh(); // Triggers server re-check so user transitions to ExistingUserDashboard
        }}
      />
    </div>
  );
}

{/* CREATE SHIPMENT MODAL COMPONENT */}
function CreateShipmentModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    origin: "",
    destination: "",
    value: "",
    hsCode: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      // Ensure valid UUID format to prevent database syntax errors
      const userId = user?.id || "00000000-0000-0000-0000-000000000000";

      const { error: insertError } = await supabase.from("shipments").insert([
        {
          user_id: userId,
          title: formData.title,
          origin: formData.origin,
          destination: formData.destination,
          value: parseFloat(formData.value) || 0,
          hs_code: formData.hsCode || null,
          status: "In Transit",
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message || "Failed to save shipment to database.");
      }

      // Reset form fields on successful creation
      setFormData({
        title: "",
        origin: "",
        destination: "",
        value: "",
        hsCode: "",
      });

      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create shipment";
      setError(message);
      console.error("Create Shipment Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-white dark:bg-[#0E1320] border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Create New Shipment
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Enter details to enable real-time tracking and compliance.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form id="create-shipment-form" onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Shipment Name / Reference
              </label>
              <div className="relative">
                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Industrial Machinery Spare Parts"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#10B981] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Origin Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. China"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#10B981] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Destination Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nigeria"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#10B981] transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Declared Value (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  required
                  placeholder="25000"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#10B981] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                HS Code (Optional)
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. 8471.30"
                  value={formData.hsCode}
                  onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#10B981] transition-all"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button
            form="create-shipment-form"
            type="submit"
            disabled={submitting}
            className="flex-1 py-2 rounded-xl bg-[#10B981] hover:bg-[#0D9668] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Save Shipment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}