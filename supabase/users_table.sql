-- Run this in the Supabase dashboard → SQL Editor.
-- public.users is the account record: it links a Google login to its gmail and
-- tracks last_login. It is upserted on every login. The user's *details*
-- (name, age, role, …) live in public.profiles — see profiles_table.sql.

create table if not exists public.users (
  id         uuid        primary key references auth.users (id) on delete cascade,
  email      text        not null,
  created_at timestamptz not null default now(),
  last_login timestamptz not null default now()
);

-- The profile fields moved to public.profiles. Drop them here if an earlier
-- version of this file created them (safe to run when they don't exist).
alter table public.users drop column if exists full_name;
alter table public.users drop column if exists username;
alter table public.users drop column if exists role;

-- Row Level Security: each user may only see/insert/update their own row.
alter table public.users enable row level security;

drop policy if exists "Users can view their own row"   on public.users;
drop policy if exists "Users can insert their own row" on public.users;
drop policy if exists "Users can update their own row" on public.users;

create policy "Users can view their own row"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can insert their own row"
  on public.users for insert
  with check (auth.uid() = id);

create policy "Users can update their own row"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
