"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ShipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  return (
    <main className="min-h-screen p-10">
      <Link href="/dashboard">Back to dashboard</Link>
      <h1 className="mt-8 text-3xl font-semibold">Shipment details</h1>
      <p className="mt-2">Shipment ID: {params?.id}</p>
    </main>
  );
}
