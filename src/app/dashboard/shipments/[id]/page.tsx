"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  MapPin,
  Package,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  Truck,
  Upload,
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

type DocumentRecord = {
  id: string;
  shipment_id: string;
  document_type: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  created_at: string;
};

const DOCUMENT_TYPES = [
  "Commercial Invoice",
  "Packing List",
  "Bill of Lading",
  "Certificate of Origin",
  "Other",
];

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

function formatFileSize(value?: number | null) {
  if (!value) return "Unknown size";
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function statusTone(status?: string | null) {
  const value = (status || "").toLowerCase();
  if (value.includes("clear")) return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (value.includes("review") || value.includes("hold")) return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  if (value.includes("document")) return "bg-violet-500/10 text-violet-700 dark:text-violet-400";
  return "bg-sky-500/10 text-sky-700 dark:text-sky-400";
}

function isDevMode(shipmentId?: string) {
  return (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "development" &&
    (window.location.search.includes("dev=1") ||
      String(shipmentId || "").startsWith("dev-"))
  );
}

export default function ShipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const shipmentId = params?.id;
  const dev = isDevMode(shipmentId);

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [documentError, setDocumentError] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  async function loadDocuments() {
    if (!shipmentId) return;

    setDocumentsLoading(true);
    setDocumentError("");

    if (dev) {
      try {
        const saved = JSON.parse(
          window.localStorage.getItem(`trade-copilot-dev-documents-${shipmentId}`) || "[]"
        ) as DocumentRecord[];
        setDocuments(saved);
      } catch {
        setDocuments([]);
        setDocumentError("We couldn't load the test documents.");
      } finally {
        setDocumentsLoading(false);
      }
      return;
    }

    const supabase = createClient();
    const { data, error: queryError } = await supabase
      .from("documents")
      .select("id,shipment_id,document_type,file_name,storage_path,mime_type,file_size,created_at")
      .eq("shipment_id", shipmentId)
      .order("created_at", { ascending: false });

    if (queryError) {
      console.error("Shipment documents query error:", queryError);
      setDocumentError(
        "Documents are not available yet. Make sure the documents migration has been run in Supabase."
      );
      setDocuments([]);
    } else {
      setDocuments((data || []) as DocumentRecord[]);
    }

    setDocumentsLoading(false);
  }

  useEffect(() => {
    async function loadShipment() {
      if (!shipmentId) return;

      setLoading(true);
      setError("");
      setNotFound(false);

      if (dev) {
        try {
          const saved = JSON.parse(
            window.localStorage.getItem("trade-copilot-dev-shipments") || "[]"
          ) as Shipment[];
          const found = saved.find((item) => item.id === shipmentId);

          if (!found) setNotFound(true);
          else setShipment(found);
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
    loadDocuments();
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
            href={dev ? "/dashboard?dev=1" : "/dashboard"}
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
            href={dev ? "/dashboard?dev=1" : "/dashboard"}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-slate-400 sm:inline">Shipment record</span>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusTone(shipment.status)}`}>
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
              <span className="text-xs font-bold uppercase tracking-[0.16em]">Trade route</span>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <RoutePoint label="Origin" value={shipment.origin || "Not provided"} />
              <div className="hidden h-px bg-white/15 sm:block" />
              <RoutePoint label="Destination" value={shipment.destination || "Not provided"} />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Declared value</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{formatCurrency(Number(shipment.value || 0))}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">USD</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <InfoCard icon={Package} label="Shipment status" value={shipment.status?.trim() || "Created"} />
          <InfoCard icon={MapPin} label="HS code" value={shipment.hs_code || "Not provided"} />
          <InfoCard icon={FileText} label="Documents" value={documents.length ? `${documents.length} added` : "No documents yet"} />
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_.8fr]">
          <DocumentsCard
            shipmentId={shipment.id}
            documents={documents}
            loading={documentsLoading}
            error={documentError}
            devMode={dev}
            onUpload={() => setShowUpload(true)}
            onChanged={loadDocuments}
          />

          <TradeAnalysisCard shipment={shipment} documents={documents} />
        </section>
      </main>

      {showUpload && (
        <UploadDocumentModal
          shipmentId={shipment.id}
          devMode={dev}
          onClose={() => setShowUpload(false)}
          onSuccess={async () => {
            setShowUpload(false);
            await loadDocuments();
          }}
        />
      )}
    </div>
  );
}

function DocumentsCard({
  shipmentId,
  documents,
  loading,
  error,
  devMode,
  onUpload,
  onChanged,
}: {
  shipmentId: string;
  documents: DocumentRecord[];
  loading: boolean;
  error: string;
  devMode: boolean;
  onUpload: () => void;
  onChanged: () => void | Promise<void>;
}) {
  const [busyId, setBusyId] = useState("");

  async function openDocument(document: DocumentRecord) {
    if (devMode) {
      alert(`Test document: ${document.file_name}`);
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(document.storage_path, 60);

    if (error || !data?.signedUrl) {
      alert("We couldn't open this document.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  async function deleteDocument(document: DocumentRecord) {
    if (!window.confirm(`Delete ${document.file_name}?`)) return;
    setBusyId(document.id);

    try {
      if (devMode) {
        const key = `trade-copilot-dev-documents-${shipmentId}`;
        const saved = JSON.parse(window.localStorage.getItem(key) || "[]") as DocumentRecord[];
        window.localStorage.setItem(
          key,
          JSON.stringify(saved.filter((item) => item.id !== document.id))
        );
        await onChanged();
        return;
      }

      const supabase = createClient();
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove([document.storage_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("documents")
        .delete()
        .eq("id", document.id);

      if (dbError) throw dbError;
      await onChanged();
    } catch (err) {
      console.error("Delete document error:", err);
      alert(err instanceof Error ? err.message : "Unable to delete document.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-300">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Documents</p>
            <h2 className="mt-1 text-lg font-semibold">Shipment paperwork</h2>
          </div>
        </div>
        <button
          onClick={onUpload}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-[#06100b] hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          Add document
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
        Keep invoices, packing lists, bills of lading, certificates of origin, and other files connected to this shipment.
      </p>

      {error && (
        <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading documents...
        </div>
      ) : documents.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center dark:border-white/10">
          <Upload className="mx-auto h-6 w-6 text-slate-400" />
          <p className="mt-3 text-sm font-semibold">No documents added yet</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Upload the first document for this shipment.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {documents.map((document) => (
            <div key={document.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 dark:border-white/10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5">
                <FileText className="h-4 w-4 text-slate-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{document.file_name}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  {document.document_type} · {formatFileSize(document.file_size)}
                </p>
              </div>
              <button onClick={() => openDocument(document)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white" title="Open">
                <Download className="h-4 w-4" />
              </button>
              <button
                disabled={busyId === document.id}
                onClick={() => deleteDocument(document)}
                className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                title="Delete"
              >
                {busyId === document.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UploadDocumentModal({
  shipmentId,
  devMode,
  onClose,
  onSuccess,
}: {
  shipmentId: string;
  devMode: boolean;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
}) {
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!file) {
      setError("Choose a file first.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Files must be 10 MB or smaller.");
      return;
    }

    setSubmitting(true);

    try {
      if (devMode) {
        const record: DocumentRecord = {
          id: `dev-doc-${Date.now()}`,
          shipment_id: shipmentId,
          document_type: documentType,
          file_name: file.name,
          storage_path: "",
          mime_type: file.type || null,
          file_size: file.size,
          created_at: new Date().toISOString(),
        };
        const key = `trade-copilot-dev-documents-${shipmentId}`;
        const saved = JSON.parse(window.localStorage.getItem(key) || "[]") as DocumentRecord[];
        window.localStorage.setItem(key, JSON.stringify([record, ...saved]));
        await onSuccess();
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const storagePath = `${user.id}/${shipmentId}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || "application/octet-stream",
        });

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("documents").insert({
        shipment_id: shipmentId,
        user_id: user.id,
        document_type: documentType,
        file_name: file.name,
        storage_path: storagePath,
        mime_type: file.type || null,
        file_size: file.size,
      });

      if (insertError) {
        await supabase.storage.from("documents").remove([storagePath]);
        throw insertError;
      }

      await onSuccess();
    } catch (err) {
      console.error("Upload document error:", err);
      setError(err instanceof Error ? err.message : "Unable to upload document.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a1511]">
        <div className="flex items-start justify-between border-b border-slate-200 p-6 dark:border-white/10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Documents</p>
            <h2 className="mt-1 text-lg font-semibold">Add shipment document</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">PDF, image, spreadsheet, or other trade file up to 10 MB.</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10">×</button>
        </div>

        <form onSubmit={submit} className="space-y-5 p-6">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium">Document type</span>
            <select
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-[#101c17] dark:text-white"
            >
              {DOCUMENT_TYPES.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>

          <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-300 p-6 text-center transition hover:border-emerald-500 dark:border-white/15">
            <input
              type="file"
              className="sr-only"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
            <Upload className="mx-auto h-7 w-7 text-slate-400" />
            <p className="mt-3 text-sm font-semibold">
              {file ? file.name : "Choose a document"}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {file ? formatFileSize(file.size) : "Click to browse your computer"}
            </p>
          </label>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">
              Cancel
            </button>
            <button disabled={submitting} className="flex-1 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-[#06100b] hover:bg-emerald-400 disabled:opacity-60">
              {submitting ? "Uploading..." : "Upload document"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TradeAnalysisCard({
  shipment,
  documents,
}: {
  shipment: Shipment;
  documents: DocumentRecord[];
}) {
  const [dutyRate, setDutyRate] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [freight, setFreight] = useState("");
  const [insurance, setInsurance] = useState("");
  const [otherCosts, setOtherCosts] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState("");
  const [analyzingDocumentId, setAnalyzingDocumentId] = useState("");
  const [savingExtraction, setSavingExtraction] = useState(false);
  const [extracted, setExtracted] = useState<{
    documentId: string;
    fileName: string;
    documentType: string;
    productDescription: string | null;
    quantity: number | null;
    unitPrice: number | null;
    currency: string | null;
    invoiceValue: number | null;
    freightCost: number | null;
    insuranceCost: number | null;
    hsCode: string | null;
    origin: string | null;
    destination: string | null;
    confidenceNotes: string[];
  } | null>(null);

  useEffect(() => {
    async function loadAnalysis() {
      setLoading(true);
      setError("");
      setSaveMessage("");

      if (isDevMode(shipment.id)) {
        try {
          const saved = JSON.parse(
            window.localStorage.getItem(`trade-copilot-dev-analysis-${shipment.id}`) || "null"
          ) as {
            dutyRate?: string;
            taxRate?: string;
            freight?: string;
            insurance?: string;
            otherCosts?: string;
          } | null;

          if (saved) {
            setDutyRate(saved.dutyRate || "");
            setTaxRate(saved.taxRate || "");
            setFreight(saved.freight || "");
            setInsurance(saved.insurance || "");
            setOtherCosts(saved.otherCosts || "");
          }
        } catch {
          setError("We couldn't load the saved analysis.");
        } finally {
          setLoading(false);
        }
        return;
      }

      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("shipment_analysis")
        .select("duty_rate,tax_rate,freight_cost,insurance_cost,other_cost")
        .eq("shipment_id", shipment.id)
        .maybeSingle();

      if (queryError) {
        console.error("Shipment analysis query error:", queryError);
        setError("Saved analysis is not available yet. Make sure the analysis migration has been run in Supabase.");
      } else if (data) {
        setDutyRate(data.duty_rate == null ? "" : String(data.duty_rate));
        setTaxRate(data.tax_rate == null ? "" : String(data.tax_rate));
        setFreight(data.freight_cost == null ? "" : String(data.freight_cost));
        setInsurance(data.insurance_cost == null ? "" : String(data.insurance_cost));
        setOtherCosts(data.other_cost == null ? "" : String(data.other_cost));
      }

      setLoading(false);
    }

    loadAnalysis();
  }, [shipment.id]);

  const declaredValue = Math.max(0, Number(shipment.value || 0));
  const duty = declaredValue * Math.max(0, Number(dutyRate || 0)) / 100;
  const taxBase = declaredValue + duty;
  const importTax = taxBase * Math.max(0, Number(taxRate || 0)) / 100;
  const logistics =
    Math.max(0, Number(freight || 0)) +
    Math.max(0, Number(insurance || 0)) +
    Math.max(0, Number(otherCosts || 0));
  const landedCost = declaredValue + duty + importTax + logistics;
  const hasEstimateInputs =
    dutyRate !== "" ||
    taxRate !== "" ||
    freight !== "" ||
    insurance !== "" ||
    otherCosts !== "";

  async function analyzeDocument(document: DocumentRecord) {
    setAnalyzingDocumentId(document.id);
    setError("");
    setSaveMessage("");
    setExtracted(null);

    try {
      const response = await fetch("/api/documents/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId: shipment.id,
          documentId: document.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to analyze document.");
      }

      const data = result.extracted;
      setExtracted({
        documentId: result.document.id,
        fileName: result.document.file_name,
        documentType: result.document.document_type,
        productDescription: data.product_description ?? null,
        quantity: data.quantity ?? null,
        unitPrice: data.unit_price ?? null,
        currency: data.currency ?? null,
        invoiceValue: data.invoice_value ?? null,
        freightCost: data.freight_cost ?? null,
        insuranceCost: data.insurance_cost ?? null,
        hsCode: data.hs_code ?? null,
        origin: data.origin ?? null,
        destination: data.destination ?? null,
        confidenceNotes: Array.isArray(data.confidence_notes) ? data.confidence_notes : [],
      });
    } catch (err) {
      console.error("Analyze document error:", err);
      setError(err instanceof Error ? err.message : "Unable to analyze document.");
    } finally {
      setAnalyzingDocumentId("");
    }
  }

  async function applyExtractedValues() {
    if (!extracted || savingExtraction) return;

    setSavingExtraction(true);
    setError("");
    setSaveMessage("");

    try {
      if (isDevMode(shipment.id)) {
        if (extracted.freightCost != null) setFreight(String(extracted.freightCost));
        if (extracted.insuranceCost != null) setInsurance(String(extracted.insuranceCost));

        window.localStorage.setItem(
          `trade-copilot-dev-document-analysis-${extracted.documentId}`,
          JSON.stringify({
            ...extracted,
            reviewStatus: "reviewed",
            reviewedAt: new Date().toISOString(),
          })
        );

        setSaveMessage("Extracted values applied for review and saved locally.");
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { error: saveError } = await supabase
        .from("document_analysis")
        .upsert(
          {
            document_id: extracted.documentId,
            shipment_id: shipment.id,
            user_id: user.id,
            product_description: extracted.productDescription,
            quantity: extracted.quantity,
            unit_price: extracted.unitPrice,
            currency: extracted.currency,
            invoice_value: extracted.invoiceValue,
            freight_cost: extracted.freightCost,
            insurance_cost: extracted.insuranceCost,
            hs_code: extracted.hsCode,
            origin: extracted.origin,
            destination: extracted.destination,
            confidence_notes: extracted.confidenceNotes,
            review_status: "reviewed",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "document_id" }
        );

      if (saveError) throw saveError;

      if (extracted.freightCost != null) setFreight(String(extracted.freightCost));
      if (extracted.insuranceCost != null) setInsurance(String(extracted.insuranceCost));

      setSaveMessage("Extracted values saved and applied for review.");
    } catch (err) {
      console.error("Save document analysis error:", err);
      setError(err instanceof Error ? err.message : "Unable to save extracted values.");
    } finally {
      setSavingExtraction(false);
    }
  }

  async function saveAnalysis() {
    setSaving(true);
    setSaveMessage("");
    setError("");

    try {
      if (isDevMode(shipment.id)) {
        window.localStorage.setItem(
          `trade-copilot-dev-analysis-${shipment.id}`,
          JSON.stringify({
            dutyRate,
            taxRate,
            freight,
            insurance,
            otherCosts,
          })
        );
        setSaveMessage("Analysis saved");
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { error: saveError } = await supabase
        .from("shipment_analysis")
        .upsert(
          {
            shipment_id: shipment.id,
            user_id: user.id,
            duty_rate: dutyRate === "" ? null : Math.max(0, Number(dutyRate)),
            tax_rate: taxRate === "" ? null : Math.max(0, Number(taxRate)),
            freight_cost: freight === "" ? null : Math.max(0, Number(freight)),
            insurance_cost: insurance === "" ? null : Math.max(0, Number(insurance)),
            other_cost: otherCosts === "" ? null : Math.max(0, Number(otherCosts)),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "shipment_id" }
        );

      if (saveError) throw saveError;

      setSaveMessage("Analysis saved");
    } catch (err) {
      console.error("Save shipment analysis error:", err);
      setError(err instanceof Error ? err.message : "Unable to save analysis.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.04] p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Trade analysis</p>
          <h2 className="mt-1 text-lg font-semibold">Estimate your landed cost</h2>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
        Enter the rates and costs you have. Trade Copilot only calculates from your inputs; it does not assume a customs duty or tax rate.
      </p>

      {error && (
        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          {error}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-emerald-500/10 bg-white/60 p-4 dark:bg-white/[0.03]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Document readiness
            </p>
            <p className="mt-1 text-sm font-semibold">
              {documents.length
                ? `${documents.length} document${documents.length === 1 ? "" : "s"} connected`
                : "No shipment documents connected"}
            </p>
          </div>
          <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {documents.length === 0 ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500 dark:bg-white/5 dark:text-slate-400">
              Upload an invoice or packing list to prepare for document analysis.
            </span>
          ) : (
            documents.map((document) => (
              <span
                key={document.id}
                className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"
              >
                {document.document_type}
              </span>
            ))
          )}
        </div>

        <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
          <DocumentSourceRow
            label="Declared value"
            source="Shipment record"
            ready={declaredValue > 0}
          />
          <DocumentSourceRow
            label="HS code"
            source="Shipment record"
            ready={Boolean(shipment.hs_code)}
          />
          <DocumentSourceRow
            label="Commercial invoice"
            source="Uploaded document"
            ready={documents.some((document) => document.document_type === "Commercial Invoice")}
          />
          <DocumentSourceRow
            label="Packing list"
            source="Uploaded document"
            ready={documents.some((document) => document.document_type === "Packing List")}
          />
        </div>

        <p className="mt-4 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
          Supported documents can be analyzed with AI. Extracted values stay as suggestions until you review and explicitly apply them.
        </p>
      </div>

      {documents.length > 0 && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Document analysis
              </p>
              <p className="mt-1 text-sm font-semibold">Review extracted shipment data</p>
            </div>
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="mt-4 space-y-2">
            {documents.map((document) => {
              const supported =
                document.mime_type === "application/pdf" ||
                Boolean(document.mime_type?.startsWith("image/"));

              return (
                <div
                  key={document.id}
                  className="flex flex-col gap-3 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center dark:bg-white/[0.03]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">{document.file_name}</p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {document.document_type} · {supported ? "AI-ready" : "PDF/image required"}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!supported || Boolean(analyzingDocumentId)}
                    onClick={() => analyzeDocument(document)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-[11px] font-semibold text-[#06100b] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {analyzingDocumentId === document.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        Analyze
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {extracted && (
        <div className="mt-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                Extraction result
              </p>
              <p className="mt-1 text-sm font-semibold">{extracted.fileName}</p>
            </div>
            <button
              type="button"
              onClick={() => setExtracted(null)}
              className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <ExtractionRow label="Product" value={extracted.productDescription} />
            <ExtractionRow label="Invoice value" value={extracted.invoiceValue != null ? `${extracted.currency || ""} ${extracted.invoiceValue}`.trim() : null} />
            <ExtractionRow label="Quantity" value={extracted.quantity != null ? String(extracted.quantity) : null} />
            <ExtractionRow label="Unit price" value={extracted.unitPrice != null ? `${extracted.currency || ""} ${extracted.unitPrice}`.trim() : null} />
            <ExtractionRow label="Freight" value={extracted.freightCost != null ? `${extracted.currency || ""} ${extracted.freightCost}`.trim() : null} />
            <ExtractionRow label="Insurance" value={extracted.insuranceCost != null ? `${extracted.currency || ""} ${extracted.insuranceCost}`.trim() : null} />
            <ExtractionRow label="HS code" value={extracted.hsCode} />
            <ExtractionRow label="Origin" value={extracted.origin} />
          </div>

          {extracted.confidenceNotes.length > 0 && (
            <div className="mt-4 rounded-xl bg-amber-500/10 p-3 text-[11px] leading-5 text-amber-700 dark:text-amber-400">
              <p className="font-semibold">Review notes</p>
              <ul className="mt-1 list-disc pl-4">
                {extracted.confidenceNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400">
              AI suggestions are not automatically trusted or saved. Review the extracted values first.
            </p>
            <button
              type="button"
              onClick={applyExtractedValues}
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400"
            >
              {savingExtraction ? "Saving..." : "Apply & save review"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <AnalysisInput label="Duty rate (%)" value={dutyRate} onChange={setDutyRate} placeholder="e.g. 10" disabled={loading || saving} />
        <AnalysisInput label="Import tax / VAT (%)" value={taxRate} onChange={setTaxRate} placeholder="e.g. 7.5" disabled={loading || saving} />
        <AnalysisInput label="Freight (USD)" value={freight} onChange={setFreight} placeholder="e.g. 1200" disabled={loading || saving} />
        <AnalysisInput label="Insurance (USD)" value={insurance} onChange={setInsurance} placeholder="e.g. 150" disabled={loading || saving} />
        <div className="sm:col-span-2">
          <AnalysisInput label="Other import costs (USD)" value={otherCosts} onChange={setOtherCosts} placeholder="e.g. 300" disabled={loading || saving} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {loading ? "Loading saved analysis..." : saveMessage || "Changes are calculated instantly. Save when ready."}
        </span>
        <button
          type="button"
          onClick={saveAnalysis}
          disabled={loading || saving}
          className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-[#06100b] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save analysis"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/10 bg-white/60 p-4 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Estimated landed cost</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{formatCurrency(landedCost)}</p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Inputs</p>
            <p className="mt-0.5 text-xs font-medium">{hasEstimateInputs ? "Using your data" : "Waiting for rates"}</p>
          </div>
        </div>

        <div className="mt-5 space-y-2 border-t border-slate-200/70 pt-4 text-xs dark:border-white/10">
          <AnalysisRow label="Declared value" value={formatCurrency(declaredValue)} />
          <AnalysisRow label="Estimated duty" value={formatCurrency(duty)} />
          <AnalysisRow label="Estimated import tax" value={formatCurrency(importTax)} />
          <AnalysisRow label="Logistics & other costs" value={formatCurrency(logistics)} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white/60 p-4 text-xs leading-5 text-slate-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-200">Planning estimate:</span>{" "}
        the tax base shown here is a simple estimate using declared value + estimated duty. Actual customs valuation, taxes, fees, and exemptions vary by jurisdiction and shipment.
      </div>
    </div>
  );
}

function AnalysisInput({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <input
        type="number"
        min="0"
        step="0.01"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#101c17] dark:text-white"
      />
    </label>
  );
}

function DocumentSourceRow({
  label,
  source,
  ready,
}: {
  label: string;
  source: string;
  ready: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-white/[0.03]">
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
        <p className="mt-0.5 text-[10px] text-slate-400">{source}</p>
      </div>
      <span
        className={
          ready
            ? "shrink-0 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400"
            : "shrink-0 rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-400"
        }
      >
        {ready ? "Available" : "Missing"}
      </span>
    </div>
  );
}

function ExtractionRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-white/[0.03]">
      <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-medium">{value || "Not found"}</p>
    </div>
  );
}

function AnalysisRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function RoutePoint({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
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
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
