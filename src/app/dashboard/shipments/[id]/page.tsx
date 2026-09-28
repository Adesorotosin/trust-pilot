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

          <div className="rounded-3xl border border-emerald-500/15 bg-emerald-500/[0.04] p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">Analysis</p>
            <h2 className="mt-2 text-lg font-semibold">Trade analysis comes after the inputs.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Once shipment and document data are available, this area will calculate useful trade context from the information you provide.
            </p>
            <div className="mt-6 rounded-2xl border border-emerald-500/10 bg-white/50 p-4 dark:bg-white/[0.03]">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Next</p>
              <p className="mt-2 text-sm font-medium">Declared value → duties & taxes → logistics → landed cost</p>
            </div>
          </div>
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
