-- Enable the pg_crypto extension for UUID generation
create extension if not exists "pgcrypto";

-- Create the stories table
create table public.stories (
  id uuid default gen_random_uuid() primary key,
  content text not null check (char_length(content) <= 100), -- 100-character limit constraint
  parent_id uuid references public.stories(id), -- Tree structure
  author_geo text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_hidden boolean default false -- For self-moderation (Veto system)
);

-- Enable Row Level Security (RLS)
alter table public.stories enable row level security;

-- Create a policy that allows anyone to read active stories
create policy "Allow public read access"
  on public.stories
  for select
  using (is_hidden = false);

-- Create a policy that allows anyone (anon) to insert stories
-- logic for cool-down (5 min) will be handled in the application layer or Edge Functions
create policy "Allow public insert access"
  on public.stories
  for insert
  with check (true);

-- Create an index on parent_id to optimize tree traversal
create index stories_parent_id_idx on public.stories(parent_id);

-- Create an index on created_at for sorting
create index stories_created_at_idx on public.stories(created_at);


-- [관리용] 데이터 전체 삭제 (초기화)
-- Supabase 대시보드 SQL Editor에서 아래 명령어를 실행하세요.
-- TRUNCATE TABLE public.stories;
