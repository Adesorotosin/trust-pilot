"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowUpRight,
  Bell,
  ChevronRight,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  Plus,
  Search,
  Settings,
  Ship,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

type Shipment = {
  id: string;
  title: string | null;
  origin: string | null;
  destination: string | null;
  value: number | null;
  status: string | null;
  hs_code: string | null;
  created_at?: string | null;
};

function initials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value?: string | null) {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function statusTone(status?: string | null) {
  const value = (status || "").toLowerCase();
  if (value.includes("clear")) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (value.includes("review") || value.includes("hold")) return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  if (value.includes("document")) return "bg-violet-500/10 text-violet-700 dark:text-violet-400";
  return "bg-sky-500/10 text-sky-700 dark:text-sky-400";
}

function displayStatus(status?: string | null) {
  return status?.trim() || "Created";
}

export default function DashboardShell({ showEmptyState = false }: { showEmptyState?: boolean }) {
  const isLocalDev = process.env.NODE_ENV === "development";
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [userName, setUserName] = useState("there");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [showNewShipment, setShowNewShipment] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  const loadDashboard = async () => {
    if (isLocalDev && window.location.search.includes("dev=1")) {
      setUserName("Test User");
      setUserEmail("dev@local.test");
      setShipments([]);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push("/login");
      return;
    }

    setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "there");
    setUserEmail(user.email || "");

    const { data, error: shipmentError } = await supabase
      .from("shipments")
      .select("id,title,origin,destination,value,status,hs_code,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (shipmentError) {
      console.error("Dashboard shipment query error:", shipmentError);
      setError("We couldn't load your shipments right now.");
      setShipments([]);
    } else {
      setShipments((data || []) as Shipment[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const filteredShipments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return shipments;

    return shipments.filter((shipment) =>
      [shipment.title, shipment.origin, shipment.destination, shipment.status, shipment.hs_code]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [search, shipments]);

  const totalValue = shipments.reduce((sum, shipment) => sum + Number(shipment.value || 0), 0);
  const activeCount = shipments.filter(
    (shipment) => !shipment.status?.toLowerCase().includes("clear")
  ).length;
  const reviewCount = shipments.filter((shipment) =>
    /review|hold|document/i.test(shipment.status || "")
  ).length;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 animate-pulse text-emerald-500" />
          Preparing your trade workspace...
        </div>
      </div>
    );
  }

  const firstName = userName.split(" ")[0];

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-slate-950 dark:bg-[#07100d] dark:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-[250px] shrink-0 border-r border-slate-200/80 bg-white lg:flex lg:flex-col dark:border-white/8 dark:bg-[#0a1511]">
          <div className="px-6 pb-5 pt-7">
            <Brand />
          </div>

          <div className="px-4">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Workspace
            </p>
            <nav className="space-y-1">
              <SideNav icon={LayoutDashboard} label="Overview" active />
              <SideNav icon={Ship} label="Shipments" href="#shipments" />
              <SideNav icon={FileText} label="Documents" href="#documents" />
            </nav>

            <p className="mt-8 px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Account
            </p>
            <nav className="space-y-1">
              <SideNav icon={Settings} label="Settings" href="/settings" />
              <SideNav icon={CircleHelp} label="Help & Support" href="/help" />
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                  {initials(userName)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{userName}</p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{userEmail}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 flex w-full items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-950 dark:hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {mobileNav && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Close navigation"
              onClick={() => setMobileNav(false)}
              className="absolute inset-0 bg-black/50"
            />
            <aside className="relative h-full w-72 bg-white p-5 dark:bg-[#0a1511]">
              <div className="flex items-center justify-between">
                <Brand />
                <button onClick={() => setMobileNav(false)} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-8 space-y-1">
                <SideNav icon={LayoutDashboard} label="Overview" active />
                <SideNav icon={Ship} label="Shipments" href="#shipments" />
                <SideNav icon={FileText} label="Documents" href="#documents" />
                <SideNav icon={Settings} label="Settings" href="/settings" />
                <SideNav icon={CircleHelp} label="Help & Support" href="/help" />
              </nav>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#f6f8f7]/90 backdrop-blur-xl dark:border-white/8 dark:bg-[#07100d]/90">
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-7 lg:px-10">
              <div className="flex items-center gap-3">
                <button
                  aria-label="Open navigation"
                  onClick={() => setMobileNav(true)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-200/60 lg:hidden dark:hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-sm font-semibold">Overview</p>
                  <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
                    Your trade command center
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative hidden xl:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search shipments..."
                    className="h-10 w-64 rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04]"
                  />
                </div>

                <button
                  aria-label="Toggle theme"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                >
                  {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>

                <button
                  aria-label="Notifications"
                  className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                >
                  <Bell className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setShowNewShipment(true)}
                  className="hidden h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-semibold text-white transition hover:bg-slate-800 sm:flex dark:bg-emerald-500 dark:text-[#06100b] dark:hover:bg-emerald-400"
                >
                  <Plus className="h-4 w-4" />
                  New shipment
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
            <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Trade workspace
                </div>
                <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  Good to see you, {firstName}.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  See what is moving, what needs attention, and what is coming next.
                </p>
              </div>

              <button
                onClick={() => setShowNewShipment(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-[#06100b] transition hover:bg-emerald-400"
              >
                <Plus className="h-4 w-4" />
                New shipment
              </button>
            </section>

            {error && (
              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
                {error}
              </div>
            )}

            <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Stat label="Total shipments" value={shipments.length} detail="All shipment records" />
              <Stat label="Active shipments" value={activeCount} detail="Not marked cleared" />
              <Stat label="Declared value" value={formatCurrency(totalValue)} detail="Across current records" />
              <Stat label="Needs attention" value={reviewCount} detail="Review / hold / documents" />
            </section>

            {showEmptyState ? (
              <section className="mt-6 grid gap-4 xl:grid-cols-[1.45fr_.75fr]">
                <div className="relative overflow-hidden rounded-3xl bg-[#0a1511] p-7 text-white sm:p-9">
                  <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                      First move
                    </p>
                    <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                      Start with the shipment you are preparing right now.
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                      Add the basic route, value, and classification details. The shipment record becomes the foundation for documents and future analysis.
                    </p>
                    <button
                      onClick={() => setShowNewShipment(true)}
                      className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#06100b] hover:bg-emerald-400"
                    >
                      Create shipment
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Trade Copilot
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">One record. More intelligence over time.</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    We will build the workflow around real shipment information rather than simulated findings.
                  </p>
                </div>
              </section>
            ) : (
              <section className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_.8fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Shipment activity</p>
                      <h2 className="mt-1 text-lg font-semibold">Recent movement</h2>
                    </div>
                    <Link href="#shipments" className="text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
                      View all
                    </Link>
                  </div>
                  <div className="mt-6 space-y-4">
                    {filteredShipments.slice(0, 3).map((shipment) => (
                      <button
                        key={shipment.id}
                        onClick={() => router.push(`/dashboard/shipments/${shipment.id}`)}
                        className="flex w-full items-center gap-4 rounded-2xl bg-slate-50 p-4 text-left transition hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm dark:bg-white/10 dark:text-slate-300">
                          <Ship className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{shipment.title || "Untitled shipment"}</p>
                          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                            {shipment.origin || "—"} → {shipment.destination || "—"} · {formatDate(shipment.created_at)}
                          </p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusTone(shipment.status)}`}>
                          {displayStatus(shipment.status)}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                      </button>
                    ))}
                    {filteredShipments.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-10 text-center dark:border-white/10">
                        <Package className="mx-auto h-7 w-7 text-slate-400" />
                        <p className="mt-3 text-sm font-semibold">No shipment activity yet</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Create a shipment to start seeing activity here.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-[#0a1511] p-6 text-white">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">Copilot</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold">Ready when your data is.</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Trade intelligence will be surfaced from the shipment and document data you provide.
                  </p>
                  <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Next layer</p>
                    <p className="mt-2 text-sm font-medium">Documents → analysis → decisions</p>
                  </div>
                </div>
              </section>
            )}

            <section id="shipments" className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Records</p>
                  <h2 className="mt-1 text-lg font-semibold">Shipments</h2>
                </div>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search shipments..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-white/[0.04]"
                  />
                </div>
              </div>

              {filteredShipments.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5">
                    <Package className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">
                    {shipments.length === 0 ? "Your shipment list is empty" : "No matching shipments"}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {shipments.length === 0
                      ? "Create a shipment to begin building your trade workspace."
                      : "Try a different name, route, status, or HS code."}
                  </p>
                  {shipments.length === 0 && (
                    <button
                      onClick={() => setShowNewShipment(true)}
                      className="mt-5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-[#06100b] hover:bg-emerald-400"
                    >
                      Create shipment
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.14em] text-slate-400 dark:bg-white/[0.025]">
                        <th className="px-6 py-3 font-bold">Shipment</th>
                        <th className="px-6 py-3 font-bold">Route</th>
                        <th className="px-6 py-3 font-bold">Value</th>
                        <th className="px-6 py-3 font-bold">Status</th>
                        <th className="px-6 py-3 font-bold">Created</th>
                        <th className="px-6 py-3 text-right font-bold"> </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/7">
                      {filteredShipments.map((shipment) => (
                        <tr key={shipment.id} className="transition hover:bg-slate-50 dark:hover:bg-white/[0.025]">
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold">{shipment.title || "Untitled shipment"}</p>
                            <p className="mt-1 text-[11px] text-slate-400">
                              {shipment.hs_code ? `HS ${shipment.hs_code}` : "No HS code added"}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                            {shipment.origin || "—"} → {shipment.destination || "—"}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold">{formatCurrency(Number(shipment.value || 0))}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusTone(shipment.status)}`}>
                              {displayStatus(shipment.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{formatDate(shipment.created_at)}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => router.push(`/dashboard/shipments/${shipment.id}`)}
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                              Open <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section id="documents" className="grid gap-4 pb-8 pt-2 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-300">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Documents</p>
                <h3 className="mt-2 text-lg font-semibold">Keep shipment paperwork in context.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Documents will live against individual shipment records so the trade workflow stays connected.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.04] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Analysis</p>
                <h3 className="mt-2 text-lg font-semibold">Turn shipment data into useful trade context.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Analysis will be based on actual shipment and document inputs. Nothing here is simulated.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>

      {showNewShipment && (
        <CreateShipmentModal
          onClose={() => setShowNewShipment(false)}
          onSuccess={async () => {
            setShowNewShipment(false);
            await loadDashboard();
          }}
        />
      )}
    </div>
  );
}

function Brand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-sm font-extrabold text-[#06100b]">
        TC
      </span>
      <div>
        <span className="block text-[15px] font-bold tracking-tight">Trade Copilot</span>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">Trade intelligence</span>
      </div>
    </Link>
  );
}

function SideNav({
  icon: Icon,
  label,
  href,
  active = false,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  href?: string;
  active?: boolean;
}) {
  const className = `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
    active
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
  }`;

  if (!href) return <div className={className}><Icon className="h-4 w-4" />{label}</div>;
  return <Link href={href} className={className}><Icon className="h-4 w-4" />{label}</Link>;
}

function Stat({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detail}</p>
    </div>
  );
}

function CreateShipmentModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    origin: "",
    destination: "",
    value: "",
    hsCode: "",
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.origin.trim() || !form.destination.trim()) {
      setError("Shipment name, origin, and destination are required.");
      return;
    }

    const numericValue = Number(form.value);
    if (!Number.isFinite(numericValue) || numericValue < 0) {
      setError("Enter a valid declared value.");
      return;
    }

    setSubmitting(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        routerToLogin();
        return;
      }

      const { error: insertError } = await supabase.from("shipments").insert({
        user_id: user.id,
        title: form.title.trim(),
        origin: form.origin.trim(),
        destination: form.destination.trim(),
        value: numericValue,
        hs_code: form.hsCode.trim() || null,
        status: "Created",
      });

      if (insertError) throw insertError;
      await onSuccess();
    } catch (err) {
      console.error("Create shipment error:", err);
      setError(err instanceof Error ? err.message : "Unable to create shipment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a1511]">
        <div className="flex items-start justify-between border-b border-slate-200 p-6 dark:border-white/10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Shipment</p>
            <h2 className="mt-1 text-lg font-semibold">Create a shipment</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Start with the core details.</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <Field label="Shipment name / reference">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Industrial machinery" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Origin">
              <input required value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} placeholder="e.g. China" />
            </Field>
            <Field label="Destination">
              <input required value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="e.g. Nigeria" />
            </Field>
          </div>

          <Field label="Declared value (USD)">
            <input required min="0" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="25000" />
          </Field>

          <Field label="HS code (optional)">
            <input value={form.hsCode} onChange={(e) => setForm({ ...form, hsCode: e.target.value })} placeholder="e.g. 8471.30" />
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">
              Cancel
            </button>
            <button disabled={submitting} className="flex-1 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#06100b] hover:bg-emerald-400 disabled:opacity-60">
              {submitting ? "Creating..." : "Create shipment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium">{label}</span>
      {children}
    </label>
  );
}

function routerToLogin() {
  window.location.href = "/login";
}
