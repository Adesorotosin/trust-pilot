import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type ExtractedData = {
  product_description: string | null;
  quantity: number | null;
  unit_price: number | null;
  currency: string | null;
  invoice_value: number | null;
  freight_cost: number | null;
  insurance_cost: number | null;
  hs_code: string | null;
  origin: string | null;
  destination: string | null;
  confidence_notes: string[];
};

function cleanJson(text: string): ExtractedData {
  const cleaned = text
    .replace(/^\s*```json\s*/i, "")
    .replace(/^\s*```\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return {
    product_description: parsed.product_description ?? null,
    quantity: typeof parsed.quantity === "number" ? parsed.quantity : null,
    unit_price: typeof parsed.unit_price === "number" ? parsed.unit_price : null,
    currency: parsed.currency ?? null,
    invoice_value: typeof parsed.invoice_value === "number" ? parsed.invoice_value : null,
    freight_cost: typeof parsed.freight_cost === "number" ? parsed.freight_cost : null,
    insurance_cost: typeof parsed.insurance_cost === "number" ? parsed.insurance_cost : null,
    hs_code: parsed.hs_code ?? null,
    origin: parsed.origin ?? null,
    destination: parsed.destination ?? null,
    confidence_notes: Array.isArray(parsed.confidence_notes)
      ? parsed.confidence_notes.filter((item: unknown): item is string => typeof item === "string")
      : [],
  };
}

export async function POST(request: Request) {
  try {
    const openAiKey = process.env.OPENAI_API_KEY;

    if (!openAiKey) {
      return NextResponse.json(
        { error: "AI document analysis is not configured. Add OPENAI_API_KEY to the server environment." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as { shipmentId?: string; documentId?: string };

    if (!body.shipmentId || !body.documentId) {
      return NextResponse.json(
        { error: "shipmentId and documentId are required." },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {}
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
    }

    const { data: document, error: documentError } = await supabase
      .from("documents")
      .select("id,shipment_id,user_id,document_type,file_name,storage_path,mime_type,file_size")
      .eq("id", body.documentId)
      .eq("shipment_id", body.shipmentId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (documentError || !document) {
      return NextResponse.json({ error: "Document not found." }, { status: 404 });
    }

    const mimeType = document.mime_type || "application/octet-stream";
    const supported =
      mimeType === "application/pdf" ||
      mimeType.startsWith("image/");

    if (!supported) {
      return NextResponse.json(
        { error: "For now, AI extraction supports PDF and image documents." },
        { status: 415 }
      );
    }

    const { data: signedData, error: signedError } = await supabase.storage
      .from("documents")
      .createSignedUrl(document.storage_path, 120);

    if (signedError || !signedData?.signedUrl) {
      return NextResponse.json(
        { error: "Unable to access the uploaded document." },
        { status: 500 }
      );
    }

    const fileResponse = await fetch(signedData.signedUrl);

    if (!fileResponse.ok) {
      return NextResponse.json(
        { error: "Unable to download the uploaded document for analysis." },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await fileResponse.arrayBuffer());
    const base64 = buffer.toString("base64");

    const inputContent =
      mimeType === "application/pdf"
        ? [
            {
              type: "input_text",
              text: "Analyze the attached trade document and extract the requested fields.",
            },
            {
              type: "input_file",
              filename: document.file_name,
              file_data: `data:application/pdf;base64,${base64}`,
            },
          ]
        : [
            {
              type: "input_text",
              text: "Analyze the attached trade document image and extract the requested fields.",
            },
            {
              type: "input_image",
              image_url: `data:${mimeType};base64,${base64}`,
              detail: "high",
            },
          ];

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        input: [
          {
            role: "system",
            content:
              "You extract structured facts from trade documents. Never invent missing values. Return ONLY valid JSON. Use null when a value is not present or cannot be read. Do not infer customs duty rates or taxes. HS codes must only be returned when explicitly visible in the document. confidence_notes should briefly identify ambiguity or missing information.",
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Document type: ${document.document_type}. Extract:
- product_description
- quantity
- unit_price
- currency
- invoice_value
- freight_cost
- insurance_cost
- hs_code
- origin
- destination
- confidence_notes (array of short strings)

Numeric fields must be numbers or null. Keep currency as a 3-letter code when clearly stated. Do not calculate or guess.`,
              },
              ...inputContent,
            ],
          },
        ],
      }),
    });

    const aiJson = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("OpenAI document analysis error:", aiJson);
      return NextResponse.json(
        { error: "The AI service could not analyze this document right now." },
        { status: 502 }
      );
    }

    const outputText = aiJson.output_text;

    if (typeof outputText !== "string" || !outputText.trim()) {
      return NextResponse.json(
        { error: "The AI returned no extractable document data." },
        { status: 502 }
      );
    }

    let extracted: ExtractedData;

    try {
      extracted = cleanJson(outputText);
    } catch {
      console.error("Invalid AI extraction JSON:", outputText);
      return NextResponse.json(
        { error: "The AI returned an unexpected document format. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      document: {
        id: document.id,
        file_name: document.file_name,
        document_type: document.document_type,
      },
      extracted,
    });
  } catch (error) {
    console.error("Document analysis route error:", error);
    return NextResponse.json(
      { error: "Unable to analyze this document right now." },
      { status: 500 }
    );
  }
}
