create extension if not exists pgcrypto;

create table if not exists public.shipment_analysis (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid unique not null references public.shipments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  duty_rate numeric,
  tax_rate numeric,
  freight_cost numeric,
  insurance_cost numeric,
  other_cost numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists shipment_analysis_user_id_idx
  on public.shipment_analysis(user_id);

alter table public.shipment_analysis enable row level security;

drop policy if exists "Users can view their shipment analysis" on public.shipment_analysis;
create policy "Users can view their shipment analysis"
on public.shipment_analysis for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their shipment analysis" on public.shipment_analysis;
create policy "Users can create their shipment analysis"
on public.shipment_analysis for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.shipments s
    where s.id = shipment_id
      and s.user_id = auth.uid()
  )
);

drop policy if exists "Users can update their shipment analysis" on public.shipment_analysis;
create policy "Users can update their shipment analysis"
on public.shipment_analysis for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.shipments s
    where s.id = shipment_id
      and s.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete their shipment analysis" on public.shipment_analysis;
create policy "Users can delete their shipment analysis"
on public.shipment_analysis for delete
to authenticated
using (auth.uid() = user_id);
