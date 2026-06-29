-- Run this in the Supabase dashboard → SQL Editor.
-- public.leave_applications holds leave requests submitted from "Mohon Cuti".
-- One row per request, keyed to the requesting user.

create table if not exists public.leave_applications (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users (id) on delete cascade,
  start_date date        not null,
  end_date   date        not null,
  reason     text,
  days       integer,     -- deductible days for the range (Fridays excluded)
  status     text        not null default 'pending',  -- pending | approved | rejected
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leave_applications_user_id_idx
  on public.leave_applications (user_id);

-- Row Level Security: each user may only see/insert/update their own requests.
alter table public.leave_applications enable row level security;

drop policy if exists "Leave viewable by owner"  on public.leave_applications;
drop policy if exists "Leave insertable by owner" on public.leave_applications;
drop policy if exists "Leave updatable by owner"  on public.leave_applications;

create policy "Leave viewable by owner"
  on public.leave_applications for select
  using (auth.uid() = user_id);

create policy "Leave insertable by owner"
  on public.leave_applications for insert
  with check (auth.uid() = user_id);

create policy "Leave updatable by owner"
  on public.leave_applications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at fresh on every change.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leave_applications_set_updated_at on public.leave_applications;
create trigger leave_applications_set_updated_at
  before update on public.leave_applications
  for each row execute function public.set_updated_at();
