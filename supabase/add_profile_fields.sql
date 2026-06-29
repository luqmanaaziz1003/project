-- Run this in the Supabase dashboard → SQL Editor.
-- Adds the extra profile fields edited on the "Maklumat Saya" page.
-- Safe to run multiple times (each column is added only if missing).

alter table public.profiles add column if not exists ic_no     text;
alter table public.profiles add column if not exists phone     text;
alter table public.profiles add column if not exists job_title text;
alter table public.profiles add column if not exists company   text;
alter table public.profiles add column if not exists bio       text;
alter table public.profiles add column if not exists location  text;

-- Keep updated_at fresh on every change.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
