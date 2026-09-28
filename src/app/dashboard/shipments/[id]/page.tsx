"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowLeft,
  FileText,
  MapPin,
  Package,
  Pencil,
  Sparkles,
  Truck,
} from "lucide-react";

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
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function statusTone(status?: string | null) {
  const value = (status || "").toLowerCase();

  if (value.includes("clear")) {
    return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  }

  if (value.includes("review") || value.includes("hold")) {
    return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  }

  if (value.includes("document")) {
    return "bg-violet-500/10 text-violet-700 dark:text-violet-400";
  }

  return "bg-sky-500/10 text-sky-700 dark:text-sky-400";
}

function isDevMode() {
  return (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "development" &&
    window.location.search.includes("dev=1")
  );
}

export default function ShipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const shipmentId = params?.id;

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadShipment() {
      if (!shipmentId) return;

      setLoading(true);
      setError("");
      setNotFound(false);

      if (isDevMode()) {
        try {
          const saved = JSON.parse(
            window.localStorage.getItem("trade-copilot-dev-shipments") || "[]"
          ) as Shipment[];

          const found = saved.find((item) => item.id === shipmentId);

          if (!found) {
            setNotFound(true);
          } else {
            setShipment(found);
          }
        } catch {
          setError("We couldn't load this test shipment.");
        } finally {
          setLoading(false);
        }

        return;
      }

      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/login");
        return;
      }

      const { data, error: shipmentError } = await supabase
        .from("shipments")
        .select("id,title,origin,destination,value,status,hs_code,created_at")
        .eq("id", shipmentId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (shipmentError) {
        console.error("Shipment details query error:", shipmentError);
        setError("We couldn't load this shipment right now.");
      } else if (!data) {
        setNotFound(true);
      } else {
        setShipment(data as Shipment);
      }

      setLoading(false);
    }

    loadShipment();
  }, [router, shipmentId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f7] dark:bg-[#07100d]">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <Sparkles className="h-4 w-4 animate-pulse text-emerald-500" />
          Loading shipment...
        </div>
      </div>
    );
  }

  if (notFound || !shipment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8f7] px-5 dark:bg-[#07100d]">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5">
            <Package className="h-5 w-5 text-slate-400" />
          </div>
          <h1 className="mt-5 text-xl font-semibold">Shipment not found</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This shipment may have been removed or is no longer available.
          </p>
          <Link
            href={isDevMode() ? "/dashboard?dev=1" : "/dashboard"}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#06100b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-slate-950 dark:bg-[#07100d] dark:text-white">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/8 dark:bg-[#0a1511]/90">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-7 lg:px-10">
          <Link
            href={isDevMode() ? "/dashboard?dev=1" : "/dashboard"}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-slate-400 sm:inline">
              Shipment record
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusTone(
                shipment.status
              )}`}
            >
              {shipment.status?.trim() || "Created"}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            Shipment
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {shipment.title || "Untitled shipment"}
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Created {formatDate(shipment.created_at)}
              </p>
            </div>

            <button
              disabled
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-400 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit shipment
            </button>
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            {error}
          </div>
        )}

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <div className="overflow-hidden rounded-3xl bg-[#0a1511] p-7 text-white sm:p-9">
            <div className="flex items-center gap-2 text-emerald-400">
              <Truck className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">
                Trade route
              </span>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <RoutePoint label="Origin" value={shipment.origin || "Not provided"} />
              <div className="hidden h-px bg-white/15 sm:block" />
              <RoutePoint
                label="Destination"
                value={shipment.destination || "Not provided"}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Declared value
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {formatCurrency(Number(shipment.value || 0))}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              USD
            </p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <InfoCard icon={Package} label="Shipment status" value={shipment.status?.trim() || "Created"} />
          <InfoCard icon={MapPin} label="HS code" value={shipment.hs_code || "Not provided"} />
          <InfoCard icon={FileText} label="Documents" value="No documents yet" />
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Documents
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  Add the paperwork for this shipment.
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Commercial invoices, packing lists, bills of lading, and other shipment documents will be connected to this record here.
            </p>

            <button
              disabled
              className="mt-6 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-400 dark:border-white/10"
            >
              Add document
            </button>
          </div>

          <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.04] p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
              Analysis
            </p>
            <h2 className="mt-2 text-lg font-semibold">
              Trade analysis comes after the inputs.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Once shipment and document data are available, this area can surface useful trade context without inventing findings.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function RoutePoint({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <Icon className="h-4 w-4 text-slate-400" />
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
