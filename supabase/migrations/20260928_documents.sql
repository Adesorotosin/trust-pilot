create extension if not exists pgcrypto;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.shipments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null,
  file_name text not null,
  storage_path text not null unique,
  mime_type text,
  file_size bigint,
  created_at timestamptz not null default now()
);

create index if not exists documents_shipment_id_idx on public.documents(shipment_id);
create index if not exists documents_user_id_idx on public.documents(user_id);

alter table public.documents enable row level security;

drop policy if exists "Users can view their shipment documents" on public.documents;
create policy "Users can view their shipment documents"
on public.documents for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their shipment documents" on public.documents;
create policy "Users can create their shipment documents"
on public.documents for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.shipments s
    where s.id = shipment_id
      and s.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete their shipment documents" on public.documents;
create policy "Users can delete their shipment documents"
on public.documents for delete
to authenticated
using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do update set public = false;

drop policy if exists "Users can upload shipment documents" on storage.objects;
create policy "Users can upload shipment documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can view shipment documents" on storage.objects;
create policy "Users can view shipment documents"
on storage.objects for select
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete shipment documents" on storage.objects;
create policy "Users can delete shipment documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);
