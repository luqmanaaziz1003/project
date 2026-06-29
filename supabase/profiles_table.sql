-- Run this in the Supabase dashboard → SQL Editor.
-- public.profiles holds the user's details (collected on the register page).
-- One profile per account, keyed to auth.users. A row exists once the user has
-- completed registration — that's what the app uses to tell new vs returning.

create table if not exists public.profiles (
  id         uuid        primary key references auth.users (id) on delete cascade,
  full_name  text,
  username   text,
  age        integer,
  role       text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security: each user may only see/insert/update their own profile.
alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by their owner" on public.profiles;
drop policy if exists "Profiles are insertable by their owner" on public.profiles;
drop policy if exists "Profiles are updatable by their owner" on public.profiles;

create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are insertable by their owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Profiles are updatable by their owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
