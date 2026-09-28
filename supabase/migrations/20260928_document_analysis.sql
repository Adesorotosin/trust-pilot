create extension if not exists pgcrypto;

create table if not exists public.document_analysis (
  id uuid primary key default gen_random_uuid(),
  document_id uuid unique not null references public.documents(id) on delete cascade,
  shipment_id uuid not null references public.shipments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_description text,
  quantity numeric,
  unit_price numeric,
  currency text,
  invoice_value numeric,
  freight_cost numeric,
  insurance_cost numeric,
  hs_code text,
  origin text,
  destination text,
  confidence_notes jsonb not null default '[]'::jsonb,
  review_status text not null default 'reviewed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists document_analysis_shipment_id_idx
  on public.document_analysis(shipment_id);

create index if not exists document_analysis_user_id_idx
  on public.document_analysis(user_id);

alter table public.document_analysis enable row level security;

drop policy if exists "Users can view their document analysis" on public.document_analysis;
create policy "Users can view their document analysis"
on public.document_analysis for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their document analysis" on public.document_analysis;
create policy "Users can create their document analysis"
on public.document_analysis for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.documents d
    where d.id = document_id
      and d.shipment_id = document_analysis.shipment_id
      and d.user_id = auth.uid()
  )
);

drop policy if exists "Users can update their document analysis" on public.document_analysis;
create policy "Users can update their document analysis"
on public.document_analysis for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.documents d
    where d.id = document_id
      and d.shipment_id = shipment_id
      and d.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete their document analysis" on public.document_analysis;
create policy "Users can delete their document analysis"
on public.document_analysis for delete
to authenticated
using (auth.uid() = user_id);