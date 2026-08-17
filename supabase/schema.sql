-- Agora database schema
-- Run this once in the Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  question text not null check (char_length(question) between 10 and 100),
  topic text not null,
  create_at timestamptz not null default now()
);

create index if not exists questions_topic_idx on public.questions (topic);
create index if not exists questions_create_at_idx on public.questions (create_at desc);

-- Lock the table down: no client (anon/public) reads or writes.
-- All access goes through the Next.js API routes using the service-role key,
-- which bypasses RLS. This guarantees the "no IP / name / identifying data
-- ever stored" promise, since the table has no such columns to begin with,
-- and guarantees the public can't read other people's questions directly.
alter table public.questions enable row level security;
-- (No policies are created — RLS with zero policies denies all anon/authenticated access.)
