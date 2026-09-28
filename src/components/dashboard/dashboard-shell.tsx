"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Bell,
  ChevronRight,
  FileText,
  HelpCircle,
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
import type { LucideIcon } from "lucide-react";
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

function statusClass(status?: string | null) {
  const normalized = (status || "").toLowerCase();
  if (normalized.includes("clear")) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }
  if (normalized.includes("review") || normalized.includes("hold")) {
    return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  }
  if (normalized.includes("document")) {
    return "bg-violet-500/10 text-violet-700 dark:text-violet-400";
  }
  return "bg-sky-500/10 text-sky-700 dark:text-sky-400";
}

function getDisplayStatus(status?: string | null) {
  return status?.trim() || "Created";
}

export default function DashboardShell({ showEmptyState = false }: { showEmptyState?: boolean }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [userName, setUserName] = useState("there");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [showNewShipment, setShowNewShipment] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push("/login");
      return;
    }

    const name =
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "there";

    setUserName(name);
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
      [
        shipment.title,
        shipment.origin,
        shipment.destination,
        shipment.status,
        shipment.hs_code,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [search, shipments]);

  const totalValue = shipments.reduce(
    (sum, shipment) => sum + Number(shipment.value || 0),
    0
  );

  const activeCount = shipments.filter(
    (shipment) => !shipment.status?.toLowerCase().includes("clear")
  ).length;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 animate-pulse text-emerald-500" />
          Loading your workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-5 lg:flex">
          <Brand />

          <nav className="mt-8 space-y-1">
            <NavItem icon={LayoutDashboard} label="Overview" active />
            <NavItem icon={Ship} label="Shipments" href="#shipments" />
            <NavItem icon={FileText} label="Documents" href="#documents" />
            <NavItem icon={Settings} label="Settings" href="/settings" />
            <NavItem icon={HelpCircle} label="Help & Support" href="/help" />
          </nav>

          <div className="mt-auto rounded-2xl border border-border bg-muted/40 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {initials(userName)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{userName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </aside>

        {mobileNav && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Close navigation"
              onClick={() => setMobileNav(false)}
              className="absolute inset-0 bg-black/50"
            />
            <aside className="relative h-full w-72 border-r border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <Brand />
                <button
                  aria-label="Close navigation"
                  onClick={() => setMobileNav(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-8 space-y-1">
                <NavItem icon={LayoutDashboard} label="Overview" active />
                <NavItem icon={Ship} label="Shipments" href="#shipments" />
                <NavItem icon={FileText} label="Documents" href="#documents" />
                <NavItem icon={Settings} label="Settings" href="/settings" />
                <NavItem icon={HelpCircle} label="Help & Support" href="/help" />
              </nav>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                aria-label="Open navigation"
                onClick={() => setMobileNav(true)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Overview</p>
                <p className="text-xs text-muted-foreground">
                  Your trade workspace
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search shipments..."
                  className="h-9 w-64 rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-xs outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                />
              </div>

              <button
                aria-label="Toggle theme"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              <button
                aria-label="Notifications"
                className="relative rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
              </button>

              <button
                onClick={() => setShowNewShipment(true)}
                className="hidden h-9 items-center gap-2 rounded-lg bg-emerald-500 px-3.5 text-xs font-semibold text-white transition hover:bg-emerald-600 sm:flex"
              >
                <Plus className="h-4 w-4" />
                New Shipment
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                  Trade Copilot
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Good to see you, {userName.split(" ")[0]}.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Keep your shipments, documents, and trade analysis in one workspace.
                </p>
              </div>

              <button
                onClick={() => setShowNewShipment(true)}
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:hidden"
              >
                <Plus className="h-4 w-4" />
                New Shipment
              </button>
            </section>

            {error && (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
                {error}
              </div>
            )}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Metric label="Shipments" value={shipments.length} hint="Total created" />
              <Metric label="Active" value={activeCount} hint="Not marked cleared" />
              <Metric label="Declared value" value={formatCurrency(totalValue)} hint="Across your shipments" />
              <Metric label="Documents" value="—" hint="Connect documents to shipments" />
            </section>

            {showEmptyState ? (
              <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Package className="h-5 w-5" />
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Start here
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    Create your first shipment
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                    Add the basic shipment information first. You can then build the shipment record with documents and analysis as those capabilities become available.
                  </p>
                  <button
                    onClick={() => setShowNewShipment(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    <Plus className="h-4 w-4" />
                    Create shipment
                  </button>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                      Trade Copilot
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold">
                    Your workspace is ready.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Start with a shipment. More trade intelligence can be layered onto the record as the product grows.
                  </p>
                </div>
              </section>
            ) : null}

            <section id="shipments" className="rounded-2xl border border-border bg-card">
              <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Shipments</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your shipment records from Supabase.
                  </p>
                </div>
                <div className="relative md:hidden">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search..."
                    className="h-9 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {filteredShipments.length === 0 ? (
                <div className="px-6 py-14 text-center">
                  <Package className="mx-auto h-8 w-8 text-muted-foreground/50" />
                  <h3 className="mt-4 text-sm font-semibold">
                    {shipments.length === 0 ? "No shipments yet" : "No matching shipments"}
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-muted-foreground">
                    {shipments.length === 0
                      ? "Create a shipment to start building your trade workspace."
                      : "Try a different shipment name, route, status, or HS code."}
                  </p>
                  {shipments.length === 0 && (
                    <button
                      onClick={() => setShowNewShipment(true)}
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
                    >
                      <Plus className="h-4 w-4" />
                      Create shipment
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead>
                      <tr className="bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="px-5 py-3 font-semibold">Shipment</th>
                        <th className="px-5 py-3 font-semibold">Route</th>
                        <th className="px-5 py-3 font-semibold">Value</th>
                        <th className="px-5 py-3 font-semibold">Status</th>
                        <th className="px-5 py-3 font-semibold">Created</th>
                        <th className="px-5 py-3 text-right font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredShipments.map((shipment) => (
                        <tr key={shipment.id} className="transition hover:bg-muted/30">
                          <td className="px-5 py-4">
                            <p className="text-sm font-semibold">
                              {shipment.title || "Untitled shipment"}
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {shipment.hs_code ? `HS ${shipment.hs_code}` : "No HS code added"}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-xs text-muted-foreground">
                            {(shipment.origin || "—") + " → " + (shipment.destination || "—")}
                          </td>
                          <td className="px-5 py-4 text-sm font-semibold">
                            {formatCurrency(Number(shipment.value || 0))}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-medium ${statusClass(shipment.status)}`}>
                              {getDisplayStatus(shipment.status)}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-muted-foreground">
                            {formatDate(shipment.created_at)}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => router.push(`/dashboard/shipments/${shipment.id}`)}
                              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-muted"
                            >
                              View
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section id="documents" className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <FileText className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">Documents</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Documents will be attached to individual shipment records. This area is ready for the document workflow.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">Analysis</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Analysis should be based on actual shipment and document data. No simulated AI findings are shown here.
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
    <Link href="/dashboard" className="flex items-center gap-3 px-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-white">
        TC
      </span>
      <span className="text-lg font-semibold tracking-tight">Trade Copilot</span>
    </Link>
  );
}

function NavItem({
  icon: Icon,
  label,
  href,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  href?: string;
  active?: boolean;
}) {
  const className = `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
    active
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  }`;

  if (!href) return <div className={className}><Icon className="h-4 w-4" />{label}</div>;

  return <Link href={href} className={className}><Icon className="h-4 w-4" />{label}</Link>;
}

function Metric({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-base font-semibold">Create shipment</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Add the basic shipment record to your workspace.
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 p-5">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <Field label="Shipment name / reference">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Industrial machinery"
              className="h-10 w-full rounded-lg border border-border bg-muted/40 px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Origin">
              <input
                required
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
                placeholder="e.g. China"
                className="input"
              />
            </Field>
            <Field label="Destination">
              <input
                required
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                placeholder="e.g. Nigeria"
                className="input"
              />
            </Field>
          </div>

          <Field label="Declared value (USD)">
            <input
              required
              min="0"
              type="number"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              placeholder="25000"
              className="input"
            />
          </Field>

          <Field label="HS code (optional)">
            <input
              value={form.hsCode}
              onChange={(e) => setForm({ ...form, hsCode: e.target.value })}
              placeholder="e.g. 8471.30"
              className="input"
            />
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">
              Cancel
            </button>
            <button disabled={submitting} className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60">
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
